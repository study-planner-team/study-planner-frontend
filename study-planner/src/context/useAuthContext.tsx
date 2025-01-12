import { createContext, useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import React from "react";


export interface User {
  id: number;
  username: string;
  email: string;
  isPublic: boolean;
}

type AuthContextType = {
  user: User | null;
  registerUser: (username: string, password: string, email: string) => Promise<boolean>;
  loginUser: (username: string, password: string) => Promise<boolean>;
  loginWithGoogle: (jwtToken: string) => Promise<boolean>;
  updateUser: (userId: number, updatedData: any) => Promise<boolean>;
  deleteUser: (userId: number) => Promise<boolean>;
  logout: () => Promise<boolean>;
  isLoggedIn: () => boolean;
  changePassword: (userId: number, oldPassword: string, newPassword: string) => Promise<boolean>;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }
    setIsReady(true);
  }, []);

  const loginWithGoogle = async (jwtToken: string): Promise<boolean> => {
    const user = await AuthService.exchangeGoogleCode(jwtToken); // Send the JWT token to the backend for verification

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return true;
    }
    return false;
  };

  const registerUser = async (username: string, password: string, email: string): Promise<boolean> => {
    const response = await AuthService.register(username, password, email);
    
    if (response) {
      const userObj = {
        id: response.userId,
        username: response.username,
        email: response.email,
        isPublic: response.IsPublic,
      };

      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj);
      return true;
    }
    return false;
  };

  const loginUser = async (username: string, password: string): Promise<boolean> => {
    const response = await AuthService.login(username, password);

    if (response) {
      const userObj = {
        id: response.userId,
        username: response.username,
        email: response.email,
        isPublic: response.IsPublic,
      };

      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj);
      return true;
    }
    return false;
  };

  const updateUser = async (userId: number, updatedData: any): Promise<boolean> => {
    const response = await AuthService.updateUser(userId, updatedData);

    if (response) {
      const userObj = {
        id: response.userId,
        username: response.username,
        email: response.email,
        isPublic: response.isPublic,
      };

      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj);
      return true;
    }
    return false;
  };

  const deleteUser = async (userId: number): Promise<boolean> => {
    const response = await AuthService.deleteUser(userId);

    if (response) {
      localStorage.removeItem("user");
      setUser(null);
      return true;
    }
    return false;
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = async (): Promise<boolean> => {
    const response = await AuthService.logout();

    if (response) {
      localStorage.removeItem("user");
      setUser(null);
      return true;
    }
    return false;
  };

  const changePassword = async (userId: number, oldPassword: string, newPassword: string): Promise<boolean> => {
    const response = await AuthService.changePassword(userId, oldPassword, newPassword);

    if (response) {
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, loginWithGoogle, logout, isLoggedIn, registerUser, updateUser, deleteUser, changePassword}}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);