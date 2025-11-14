import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/Brands.module.css";

const brands = [
  { key: "zara", name: "Zara", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg", color1: "#ff6a00", color2: "#ee0979" },
  { key: "nike", name: "Nike", logo: "https://www.esko.com/static/uploads/2024/02/nike-logo-1536x864.png", color1: "#06c", color2: "#0ff" },
  { key: "adidas", name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg", color1: "#00f", color2: "#0ff" },
  { key: "massimo", name: "Massimo Dutti", logo: "https://upload.wikimedia.org/wikipedia/commons/7/74/Massimo_Dutti.png", color1: "#aa8800", color2: "#ffcc33" },
  { key: "mango", name: "Mango", logo: "/images/a.png", color1: "#ff8c00", color2: "#ffd700" },
  { key: "club", name: "Club", logo: "https://hilltownkucukyali.com/storage/hilltownkucukyali/store/June2024/beymen-club.png", color1: "#964B00", color2: "#d2691e" },
  { key: "hm", name: "H&M", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg", color1: "#c00", color2: "#ff4500" },
  { key: "zarahome", name: "Zara Home", logo: "https://www.tcmall.uz/_next/image?url=https%3A%2F%2Ftcmall.uz%2Fstrapi%2Fuploads%2FZara_Home_Logo_removebg_preview_25e43e6114.png&w=1920&q=75", color1: "#666", color2: "#999" },
  { key: "lacoste", name: "Lacoste", logo: "https://files.sikayetvar.com/lg/cmp/28/285450.svg?1691998772", color1: "#009600", color2: "#00ff00" },
  { key: "victorias", name: "Victoria's Secret", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Victoria%E2%80%99s_Secret_%28logo%2C_2021%29.svg/2560px-Victoria%E2%80%99s_Secret_%28logo%2C_2021%29.svg.png", color1: "#ff69b4", color2: "#ff1493" },
  { key: "oysho", name: "Oysho", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Oysho_logo.png/330px-Oysho_logo.png", color1: "#ffb6c1", color2: "#ff69b4" },
  { key: "machka", name: "Machka", logo: "https://files.sikayetvar.com/lg/cmp/29/2902.svg?1522650125", color1: "#a0522d", color2: "#d2691e" },
  { key: "gucci", name: "Gucci", logo: "https://toppng.com/uploads/preview/gucci-logo-png-file-11659952829iga3ljb6ic.png", color1: "#000", color2: "#555" },
  { key: "louisvuitton", name: "Louis Vuitton", logo: "/images/b.png", color1: "#8b4513", color2: "#d2b48c" },
  { key: "calvinklein", name: "Calvin Klein Jeans", logo: "https://cdn.freebiesupply.com/logos/thumbs/2x/calvin-klein-logo.png", color1: "#464646", color2: "#888" },
  { key: "ipekyol", name: "Ipekyol", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ipekyol-logo.svg", color1: "#800080", color2: "#da70d6" },
  { key: "crocs", name: "Crocs", logo: "https://static.cdnlogo.com/logos/c/79/crocs-wordmark.svg", color1: "#008000", color2: "#00ff00" },
  { key: "tommy", name: "Tommy Hilfiger", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Tommy_Hilfiger_Logo.png/2560px-Tommy_Hilfiger_Logo.png", color1: "#00008b", color2: "#4169e1" },
  { key: "uspolo", name: "U.S. Polo Assn.", logo: "https://vectorseek.com/wp-content/uploads/2023/07/U.S.-Polo-Assn.-Logo-Vector.svg--300x180.png", color1: "#8b0000", color2: "#ff0000" }
];

export default function Brands() {
  const [theme, setTheme] = useState("light");
  const { t, i18n } = useTranslation();

  return (
    <div className={`${styles.wrap} ${styles[theme]}`}>
      <button
        className={styles.themeToggle}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? t("home.dark") : t("home.light")}
      </button>

      {/* <select
        className={styles.langSelect}
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option value="ru">🇷🇺 RU</option>
        <option value="en">🇬🇧 EN</option>
        <option value="uz">🇺🇿 UZ</option>
      </select> */}

      <h2>{t("brandsTitle")}</h2>

      <div className={styles.cards}>
        {brands.map((b, index) => (
          <div
            key={b.key}
            className={styles.card}
            style={{
              "--color1": b.color1,
              "--color2": b.color2,
            }}
          >
            <div className={styles.cardInner}>
              <div className={styles.logoWrap}>
                <img src={b.logo} alt={b.name} className={styles.logo} />
              </div>
              <h3>{b.name}</h3>
              <p>{t(`brands.${b.key}.desc`)}</p> {/* desc из i18n */}
              <Link
                to={`/brands/${encodeURIComponent(b.key)}`}
                style={{
                  animationDuration: `10s, 6s, ${4 + (index % 6) * 0.5}s`,
                }}
              >
                {t("goTo")}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
