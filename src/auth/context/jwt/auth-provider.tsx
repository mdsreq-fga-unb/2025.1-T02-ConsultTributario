'use client';

import Cookies from 'js-cookie';
import { useCallback, useEffect, useMemo, useReducer } from 'react';

import { IAuthResponse, ILoginRequest, IRegisterRequest, IUser } from '../../../types/auth';
import axios, { endpoints } from '../../../utils/axios';

import { AuthContext } from './auth-context';
import { isValidToken, setSession, getUserFromToken } from './utils';

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: IUser | null;
  };
  [Types.LOGIN]: {
    user: IUser;
  };
  [Types.REGISTER]: {
    user: IUser;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = {
  [K in keyof Payload]: {
    type: K;
    payload: Payload[K];
  };
}[keyof Payload];

// ----------------------------------------------------------------------

const initialState = {
  user: null as IUser | null,
  loading: true,
  authenticated: false,
};

const reducer = (state: typeof initialState, action: ActionsType) => {
  switch (action.type) {
    case Types.INITIAL:
      return {
        loading: false,
        authenticated: !!action.payload.user,
        user: action.payload.user,
      };
    case Types.LOGIN:
      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
      };
    case Types.REGISTER:
      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
      };
    case Types.LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const checkAuthenticated = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem('accessToken') || Cookies.get('accessToken');

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // Tentar extrair dados do usuário do token primeiro
        const userFromToken = getUserFromToken(accessToken);

        if (userFromToken) {
          dispatch({
            type: Types.INITIAL,
            payload: {
              user: userFromToken,
            },
          });
        } else {
          // Se não conseguir extrair do token, fazer chamada para API
          const response = await axios.get<IUser>(endpoints.auth.me);

          dispatch({
            type: Types.INITIAL,
            payload: {
              user: response.data,
            },
          });
        }
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error('Error during authentication check:', error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    checkAuthenticated();
  }, [checkAuthenticated]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data: ILoginRequest = {
      email,
      password,
    };

    const response = await axios.post<IAuthResponse>(endpoints.auth.login, data);

    const { access_token, refresh_token } = response.data;

    setSession(access_token, refresh_token);

    // Extrair dados do usuário do token
    const userFromToken = getUserFromToken(access_token);

    if (userFromToken) {
      dispatch({
        type: Types.LOGIN,
        payload: {
          user: userFromToken,
        },
      });
    } else {
      // Fallback: buscar dados do usuário da API
      const userResponse = await axios.get<IUser>(endpoints.auth.me);

      dispatch({
        type: Types.LOGIN,
        payload: {
          user: userResponse.data,
        },
      });
    }
  }, []);

  // REGISTER
  const register = useCallback(async (registerData: IRegisterRequest) => {
    const response = await axios.post<IAuthResponse>(endpoints.auth.register, registerData);

    const { access_token, refresh_token } = response.data;

    setSession(access_token, refresh_token);

    // Extrair dados do usuário do token
    const userFromToken = getUserFromToken(access_token);

    if (userFromToken) {
      dispatch({
        type: Types.REGISTER,
        payload: {
          user: userFromToken,
        },
      });
    } else {
      // Fallback: buscar dados do usuário da API
      const userResponse = await axios.get<IUser>(endpoints.auth.me);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: userResponse.data,
        },
      });
    }
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      // await axios.post(endpoints.auth.logout);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setSession(null);
      dispatch({
        type: Types.LOGOUT,
        payload: undefined,
      });
    }
  }, []);

  // ----------------------------------------------------------------------

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: state.loading,
      authenticated: state.authenticated,
      login,
      register,
      logout,
      checkAuthenticated,
    }),
    [state.user, state.loading, state.authenticated, login, register, logout, checkAuthenticated]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};
