import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  registerUser: (username: string, password: string, email: string) => void;
  loginUser: (username: string, password: string) => void;
  updateUser: (userId: number, updatedData: any) => void;
  deleteUser: (userId: number) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    username: string,
    password: string,
    email: string
  ) => {
    try {
      const response = await AuthService.register(username, password, email);
      if (response) {
        navigate("/");
      }
    } catch (error: any) {
      throw error;
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await AuthService.login(username, password);
      if (response) {
        const userObj = {
          id: response.data.userId,
          username: response.data.username,
          email: response.data.email,
          isPublic: response.data.IsPublic
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);
        navigate("/");
      }
    } catch (error: any) {
      throw error;
    }
  };

  const updateUser = async (userId: number, updatedData: any) => {
    try {
      const response = await AuthService.updateUser(userId, updatedData);
      const userObj = {
        id: response.userId,
        username: response.username,
        email: response.email,
        isPublic: response.isPublic, 
      };
      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj); // Update context state with new user data
    } catch (error: any) {
      throw error;
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await AuthService.deleteUser(userId);
      localStorage.removeItem("user");
      setUser(null); // Clear user state
      navigate("/"); // Redirect to home or login page
    } catch (error: any) {
      throw error;
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ loginUser, user, logout, isLoggedIn, registerUser, updateUser, deleteUser }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
