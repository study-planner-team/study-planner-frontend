import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import React from "react";

export interface User {
    id: number
    username: string;
    email: string;
  }

type AuthContextType = {
    user: User| null;
    registerUser: (username: string, password: string, email: string) => void;
    loginUser: (username: string, password:string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

type Props = { children: React.ReactNode};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children}: Props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(()=> {
        const user = localStorage.getItem("user");

        if(user){
            setUser(JSON.parse(user));
        }
        setIsReady(true);
    }, [])

    const registerUser = async (username: string, password: string, email: string) => {
        try {
          const response = await AuthService.register(username, password, email);
          if (response) {
            const userObj = {
              id: response.data.userId,
              username: response.data.username,
              email: response.data.email
            };
            localStorage.setItem("user", JSON.stringify(userObj));
            setUser(userObj);
            navigate("/");
          }
        } catch (error: any) {
            throw error
        }
      }

    const loginUser = async (username: string, password: string) => {
        try {
          const response = await AuthService.login(username, password);
          if (response) {
            const userObj = {
              id: response.data.userId,
              username: response.data.username,
              email: response.data.email
            };
            localStorage.setItem("user", JSON.stringify(userObj));
            setUser(userObj);
            navigate("/");
          }
        } catch (error: any) {
          throw error
        }
      };

    const isLoggedIn = () => {
        return !!user;
    }

    const logout = async () => {
        try {
          await AuthService.logout();
          localStorage.removeItem("user");
          setUser(null);
          navigate("/")
        } catch (error: any) {
          throw error
      }
    }

    return (
        <AuthContext.Provider value ={{ loginUser, user, logout, isLoggedIn, registerUser }}>
            {isReady ? children : null}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => React.useContext(AuthContext);