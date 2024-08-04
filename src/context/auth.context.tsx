'use client';

import { createClient } from '@/supabase/client';
import { User } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type UserData = {
  nickname: string | null;
  profile_image: string | null;
  info: string | null;
  github_url: string | null;
};

type AuthContextValue = {
  isInitialized: boolean;
  isLoggedIn: boolean;
  me: User | null;
  userData: UserData | null;
  logIn: (email: string, password: string) => Promise<{ status: number; message?: string }>;
  logOut: () => Promise<{ status: number; message?: string }>;
  signUp: (
    email: string,
    password: string,
    nickname: string,
    recaptchaToken: string | null
  ) => Promise<{ status: number; message?: string }>;
  updateUserData: (updates: Partial<UserData>) => void;
  setUser: (user: User | null) => void;
};

const initialValue: AuthContextValue = {
  isInitialized: false,
  isLoggedIn: false,
  me: null,
  userData: null,
  logIn: async () => ({ status: 0 }),
  logOut: async () => ({ status: 0 }),
  signUp: async () => ({ status: 0 }),
  updateUserData: () => {},
  setUser: () => {}
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isInitialized, setIsInitialized] = useState<AuthContextValue['isInitialized']>(false);
  const [me, setMe] = useState<AuthContextValue['me']>(null);
  const [userData, setUserData] = useState<AuthContextValue['userData']>(null);
  const isLoggedIn = !!me;
  const supabase = createClient();

  const fetchUserData = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('nickname,profile_image,info,github_url')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user data:', error);
      return;
    }

    if (data) {
      setUserData(data as UserData);
    } else {
      setUserData(null);
    }
  };
  // 유저 정보 업데이트 함수
  const updateUserData: AuthContextValue['updateUserData'] = (updates) => {
    setUserData((prevData) => {
      if (prevData === null) {
        return { ...updates } as UserData;
      }
      return { ...prevData, ...updates };
    });
  };
  // 로그인 함수
  const logIn: AuthContextValue['logIn'] = async (email, password) => {
    if (!email || !password) {
      return { status: 401, message: '이메일, 비밀번호 모두 채워 주세요!' };
    }
    const data = { email, password };
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (response.status === 401) {
      return { status: 401, message: '로그인에 실패했습니다.' };
    }

    const { user } = result;
    setMe(user);
    await fetchUserData(user.id);

    return { status: 200 };
  };

  // 회원가입 함수
  const signUp: AuthContextValue['signUp'] = async (email, password, nickname, recaptchaToken) => {
    if (!email || !password) {
      return { status: 401, message: '이메일, 비밀번호 모두 채워 주세요!' };
    }
    const data = { email, password, nickname, recaptchaToken };
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (response.status === 401) {
      return { status: 401, message: '회원가입에 실패했습니다.' };
    }

    // 회원가입 후 로그인 처리
    const loginResponse = await logIn(email, password);
    if (loginResponse.status !== 200) {
      return { status: loginResponse.status, message: '회원가입은 되었지만 로그인에 실패했습니다.' };
    }

    return { status: 200 };
  };

  // 로그아웃 함수
  const logOut: AuthContextValue['logOut'] = async () => {
    if (!me) return { status: 401, message: '로그인하고 눌러주세요.' };
    await fetch('/api/auth/logout', {
      method: 'DELETE'
    });
    setMe(null);
    setUserData(null);
    return { status: 200 };
  };

  const setUser = (user: User | null) => {
    setMe(user);
    if (user) {
      fetchUserData(user.id);
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('initializeAuth');
      try {
        const response = await fetch('/api/auth/me');
        if (response.status === 200) {
          const user = await response.json();
          if (!user) return;

          setMe(user);
          await fetchUserData(user.id);
        }
      } catch (error) {
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
      setIsInitialized(true);
    };
    checkSession();
  }, []);

  const value: AuthContextValue = {
    isInitialized,
    isLoggedIn,
    me,
    userData,
    logIn,
    logOut,
    signUp,
    updateUserData,
    setUser
  };

  if (!isInitialized) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
