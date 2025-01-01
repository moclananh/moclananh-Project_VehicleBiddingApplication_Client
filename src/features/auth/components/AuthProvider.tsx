import { createContext, ReactNode, useCallback, useState } from "react";
import LocalStorageService from "../../../services/local-storage.service";
import { IUser } from "../types/auth.type";

interface AuthState {
  user: IUser | null;
  setUserState: (user: IUser) => void;
  removeUserState: () => void;
}
export const AuthContext = createContext<AuthState>({
  user: null,
  setUserState: () => {},
  removeUserState: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storedInfo = LocalStorageService.getItem<IUser>("user");
  const [user, setUser] = useState<IUser | null>(storedInfo);
  // Login function
  const setUserState = useCallback((user: IUser) => {
    setUser(user);
    LocalStorageService.setItem<IUser>("user", user);
  }, []);

  // Logout function
  const removeUserState = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  // Provide the user and auth functions
  const value = { user, setUserState, removeUserState };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
