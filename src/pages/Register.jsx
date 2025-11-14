import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "../styles/form.module.css";

export default function Register() {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await updateProfile(userCred.user, {
        displayName: `${form.name} ${form.surname}`,
      });

      await axios.post(
        "https://68c8141e5d8d9f5147343917.mockapi.io/RegisterUsersInMySite",
        {
          name: form.name,
          surname: form.surname,
          phone: form.phone,
          address: form.address,
          email: form.email,
          password: form.password,
          role: "user",
        }
      );

      toast.success(t("registration") + " ✔");
      navigate("/login");
    } catch (err) {
      toast.error("❌ " + err.message);
    }
  };

  return (
    <div className={`${styles.wrapper} ${darkMode ? styles.dark : ""}`}>
      {/* 🔘 Переключатели */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={styles.toggle}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* <select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          value={i18n.language}
          className={styles.select}
        >
          <option value="uz">Uz</option>
          <option value="ru">Ru</option>
          <option value="en">En</option>
        </select> */}
      </div>

      <h2>{t("registration")}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder={t("name")}
          value={form.name}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="surname"
          placeholder={t("surname")}
          value={form.surname}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="phone"
          placeholder={t("phone")}
          value={form.phone}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="address"
          placeholder={t("address")}
          value={form.address}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder={t("email")}
          value={form.email}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder={t("password")}
          value={form.password}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
           {t("signUpAsUser")}
        </button>
      </form>
      <p>
        {t("alreadyAccount")} <Link to="/login">{t("login")}</Link>
      </p>
    </div>
  );
}
