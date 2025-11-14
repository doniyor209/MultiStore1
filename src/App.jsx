// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import BrandPage from "./pages/BrandPage";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserCabinet from "./pages/UserCabinet"; 
import PrivateRoute from "./components/PrivateRoute";

import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import "./styles/global.css";

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />
          <AnimatedRoutes />
          <ToastContainer position="top-right" autoClose={3000} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Отдельный компонент для AnimatePresence и анимации переходов
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Публичные страницы */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Главная и брендовые страницы (только авторизованные пользователи) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/brands"
          element={
            <PrivateRoute>
              <Brands />
            </PrivateRoute>
          }
        />
        <Route
          path="/brands/:brandName"
          element={
            <PrivateRoute>
              <BrandPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/brands/:brandName/product/:productId"
          element={
            <PrivateRoute>
              <ProductPage />
            </PrivateRoute>
          }
        />

        {/* Кабинет пользователя (только покупатель) */}
        <Route
          path="/UserCabinet"
          element={
            <PrivateRoute role="покупатель">
              <UserCabinet />
            </PrivateRoute>
          }
        />

        {/* Админ-панель (только админ) */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Любой несуществующий путь редиректит на главную */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}
