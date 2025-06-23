export interface IUser {
  id: string;
  email: string;
  role: string;
}

// Definir tipos de roles disponíveis
export type UserRole = 'admin' | 'user';

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
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IAuthResponse {
  access_token: string;
  refresh_token?: string;
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
