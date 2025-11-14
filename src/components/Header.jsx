// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import styles from "../styles/Header.module.css";
import { AuthContext } from "../AuthContext";

export default function Header() {
  const { user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>
          <Link to="/" className={styles.gradient_text}>
            MultiBrand Store
          </Link>
        </h1>

        <nav className={styles.nav}>
          <Link to="/brands" className={styles.navLink}>Brands</Link>

          {user ? (
            <>
              <span className={styles.userGreeting}>
                <span className={styles.greetingWord}>Привет</span>,{" "}
                <span>{user.displayName || user.name || "Пользователь"}</span>
              </span>

              {/* Ссылка на Кабинет только для покупателя */}
              {role === "покупатель" && (
                <Link to="/UserCabinet" className={styles.navLink}>
                  Мой кабинет
                </Link>
              )}

              {/* Ссылка на Админку только для админа */}
              {role === "admin" && (
                <Link to="/admin" className={styles.navLink}>
                  Админка
                </Link>
              )}

              <button onClick={handleLogout} className={styles.logoutBtn}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link style={{ marginLeft: 15 }} to="/login">
                Войти
              </Link>
              <Link style={{ marginLeft: 10 }} to="/register">
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
