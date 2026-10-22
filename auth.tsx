import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  signedIn: false,
  setSignedIn: (_signedIn: boolean) => {},
});

export const useAuth = () => useContext(AuthContext);
