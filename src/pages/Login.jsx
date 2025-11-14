// src/pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useTranslation } from "react-i18next";
import styles from "../styles/form.module.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loggedUser = await login(form.email, form.password, navigate);

      if (loggedUser.role === "admin") {
        navigate("/admin");
      } else if (loggedUser.role === "покупатель") {
        navigate("/UserCabinet");
      } else {
        setError(t("login.errors.unknownRole"));
      }
    } catch (err) {
      setError(t("login.errors.loginError"));
    }
  };

  const quickLoginUser = async () => {
    setError("");
    try {
      const loggedUser = await login(form.email, form.password);
      if (loggedUser.role === "покупатель") {
        navigate("/UserCabinet");
      } else {
        setError(t("login.errors.onlyUserBtn"));
      }
    } catch (err) {
      setError(t("login.errors.loginError"));
    }
  };

  const quickLoginAdmin = async () => {
    setError("");
    try {
      const loggedUser = await login(form.email, form.password);
      if (loggedUser.role === "admin") {
        navigate("/admin");
      } else {
        setError(t("login.errors.onlyAdminBtn"));
      }
    } catch (err) {
      setError(t("login.errors.loginError"));
    }
  };

  return (
    <div className={`${styles.wrapper} ${darkMode ? styles.dark : ""}`}>
      {/* 🔘 Переключатель темы */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "15px",
        }}
      >
        <button onClick={() => setDarkMode(!darkMode)} className={styles.toggle}>
          {darkMode ? t("lightMode") : t("darkMode")}
        </button>
      </div>

      <h2>{t("Title")}</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder={t("Email")}
          value={form.email}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder={t("Password")}
          value={form.password}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {t("Enter")}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <p>{t("NoAccount")}</p>
        <Link to="/register">
          <button className={styles.button}>{t("Register")}</button>
        </Link>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p>{t("QuickLogin")}</p>
        <button
          onClick={quickLoginAdmin}
          className={`${styles.quickBtn} ${styles.quickBtnAdmin}`}
        >
          {t("QuickAdmin")}
        </button>
        <button
          onClick={quickLoginUser}
          className={`${styles.quickBtn} ${styles.quickBtnUser}`}
        >
          {t("QuickUser")}
        </button>
      </div>
    </div>
  );
}
