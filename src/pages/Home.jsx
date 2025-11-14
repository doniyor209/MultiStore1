// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { t, i18n } = useTranslation();

  // Dark Mode
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Слайды
  const slides = [
    {
      id: 1,
      image: "https://source.unsplash.com/1200x400/?fashion",
      title: t("home.slides.new"),
      link: "/brands",
    },
    {
      id: 2,
      image: "https://source.unsplash.com/1200x400/?shoes",
      title: t("home.slides.shoes"),
      link: "/brands",
    },
    {
      id: 3,
      image: "https://source.unsplash.com/1200x400/?store",
      title: t("home.slides.popular"),
      link: "/brands",
    },
  ];

  // Бренды
  const brands = [
    { name: "Zara", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg" },
    { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "Massimo Dutti", logo: "https://upload.wikimedia.org/wikipedia/commons/7/74/Massimo_Dutti.png" },
  ];

  // Слайдер
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Смена языка
  const handleLanguageChange = (e) => i18n.changeLanguage(e.target.value);

  return (
    <div
      className={`${styles.home} ${darkMode ? styles.dark : ""}`}
      style={{ transition: "all 0.5s ease" }}
    >
      {/* Верхняя панель: Dark Mode + Выбор языка */}
      <div className={styles.topControls}>
        <button className={styles.darkBtn} onClick={toggleDarkMode}>
          {darkMode ? t("home.light") : t("home.dark")}
        </button>

        {/* <select
          value={i18n.language}
          onChange={handleLanguageChange}
          className={styles.languageSelect}
        >
          <option value="uz">UZ</option>
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select> */}
      </div>

      {/* Вступительный блок */}
      <section className={styles.introSection}>
        <div className={styles.introduction}>
          <h1 className={styles.gradientText}>{t("home.title")}</h1>
          <h3 className={styles.gradientParagraph}>{t("home.subtitle")}</h3>
        </div>
      </section>

      {/* Слайдер */}
      <section className={styles.sliderSection}>
        <div className={styles.slider}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${styles.slide} ${index === current ? styles.active : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={styles.slideContent}>
                <h2>{slide.title}</h2>
                <Link to={slide.link} className={styles.slideBtn}>
                  {t("home.go")}
                </Link>
              </div>
            </div>
          ))}

          {/* Точки навигации */}
          <div className={styles.dots}>
            {slides.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${index === current ? styles.activeDot : ""}`}
                onClick={() => setCurrent(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные бренды */}
      <section className={styles.brands}>
        <h2>{t("home.brands")}</h2>
        <div className={styles.brandsGrid}>
          {brands.map((b, i) => (
            <div key={b.name} className={`${styles.brandCard} ${styles["brand" + i]}`}>
              <img src={b.logo} alt={b.name} />
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
