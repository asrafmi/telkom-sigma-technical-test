'use client';

import { User } from '@/types/user';
import { userStorageKey, userTokenStorageKey } from '@/constants/auth';
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ContextType = {
  user: User | null;
  token: string | null;
  setUser: (...args: any) => void;
  setToken: (...args: any) => void;
};

const userData = () => {
  if (typeof window !== 'undefined') {
    // console.log('masokkk user', localStorage.getItem(userStorageKey));

    return localStorage.getItem(userStorageKey)
      ? JSON.parse(localStorage.getItem(userStorageKey) as string)
      : null;
  }
  return null;
};

const userToken = () => {
  if (typeof window !== 'undefined') {
    // console.log('masokkk token', localStorage.getItem(userTokenStorageKey));
    return localStorage.getItem(userTokenStorageKey);
  }
  console.log('gamasok');
  
  return null;
};

export const AuthContext = createContext<ContextType>({
  user: userData(),
  token: userToken(),
  setUser: () => null,
  setToken: () => null,
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [internalUser, setInternalUser] = useState<any | null>(null);
  const [internalToken, setInternalToken] = useState<string | null>(null);

  const setToken = useCallback((token: string | null) => {
    if (token === null) {
      localStorage.removeItem(userTokenStorageKey);
      setInternalToken(null);
    } else if (token) {
      localStorage.setItem(userTokenStorageKey, token);
      setInternalToken(token);
    }
  }, []);

  const setUser = useCallback((user: User | null) => {
    if (user === null) {
      localStorage.removeItem(userStorageKey);
      setInternalUser(null);
    } else if (user) {
      localStorage.setItem(userStorageKey, JSON.stringify(user));
      setInternalUser(user);
    }
  }, []);

  useEffect(() => {
    setInterval(() => {
      const ut = userToken();
      const ud = userData();
      if (ut) {
        setToken(userToken());
      }
      if (ud) {
        setUser(ud);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          user: internalUser,
          token: internalToken,
          setUser,
          setToken,
        }),
        [internalUser, internalToken, setUser, setToken]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};
