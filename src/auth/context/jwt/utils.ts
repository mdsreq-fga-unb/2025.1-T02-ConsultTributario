import Cookies from 'js-cookie';

import { AuthUserType } from '../../../types/auth';

// ----------------------------------------------------------------------

export const STORAGE_KEY = 'accessToken';

export function jwtDecode(token: string) {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));

    return decoded;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

export function isValidToken(accessToken: string) {
  if (!accessToken) return false;

  try {
    const decoded = jwtDecode(accessToken);
    if (!decoded) return false;

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
}

export function tokenExpired(exp: number) {
  const currentTime = Date.now() / 1000;
  return exp < currentTime;
}

export function setSession(accessToken: string | null, refreshToken?: string | null) {
  if (accessToken) {
    // Set in sessionStorage for client-side
    sessionStorage.setItem(STORAGE_KEY, accessToken);

    // Set in cookies for SSR
    Cookies.set('accessToken', accessToken, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    if (refreshToken) {
      sessionStorage.setItem('refreshToken', refreshToken);
      Cookies.set('refreshToken', refreshToken, {
        expires: 30, // 30 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }
  } else {
    // Clear session
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem('refreshToken');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  }
}

export function getSession() {
  let accessToken = null;

  if (typeof window !== 'undefined') {
    accessToken = sessionStorage.getItem(STORAGE_KEY) || Cookies.get('accessToken');
  }

  return accessToken;
}
