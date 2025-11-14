// src/AuthContext.jsx
import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);
  
  const login = async (email, password, navigate) => {
   
    try {
      const res = await axios.get(
        "https://68c8141e5d8d9f5147343917.mockapi.io/RegisterUsersInMySite"
      );
      
      const foundUser = res.data.find(
        (u) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        setUser(foundUser);
        setRole(foundUser.role || "user");
        
        localStorage.setItem("user", JSON.stringify(foundUser));
        localStorage.setItem("role", foundUser.role || "user");
        
        toast.success(`Добро пожаловать, ${foundUser.name}!`);

        if (foundUser.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/cabinet"); 
        }
      } else {
        toast.error("Неверный email или пароль");
      }
    } catch (err) {
      console.error("Ошибка входа:", err);
      toast.error("Ошибка входа, попробуйте снова");
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);

    localStorage.removeItem("user");
    localStorage.removeItem("role");

    toast.info("Вы вышли из аккаунта");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, role, setRole, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
