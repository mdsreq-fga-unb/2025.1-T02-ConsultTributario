export interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  isEmailVerified: boolean;
}

export interface IAuthState {
  user: IUser | null;
  loading: boolean;
  authenticated: boolean;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken?: string;
}

export interface IAuthContextValue extends IAuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: IRegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthenticated: () => Promise<void>;
}

export type AuthUserType = IUser | null;

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};
