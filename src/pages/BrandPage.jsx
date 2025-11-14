// src/pages/BrandPage.jsx
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../CartContext"; 
import styles from '../styles/BrandPage.module.css';

export default function BrandPage() {
  const { t, i18n } = useTranslation();
  const { brandName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(location.state?.filters || {});
  const [scrollY, setScrollY] = useState(location.state?.scrollY || 0);

  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const [cartOpen, setCartOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const brandKey = decodeURIComponent(brandName).toLowerCase();
  const brandLogos = {
    zara: "../e.png",
    nike: "https://www.esko.com/static/uploads/2024/02/nike-logo-1536x864.png",
    adidas: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    "massimo dutti": "https://upload.wikimedia.org/wikipedia/commons/7/74/Massimo_Dutti.png",
    mango: "/images/a.png",
    lacoste: "https://files.sikayetvar.com/lg/cmp/28/285450.svg?1691998772",
  };
  const bannerStyles = {
    zara: styles.zara,
    nike: styles.nike,
    adidas: styles.adidas,
    "massimo dutti": styles.massimo,
    mango: styles.mango,
    lacoste: styles.lacoste,
  };

  useEffect(() => {
    setLoading(true);
    let url = "";
    switch (brandKey) {
      case "zara": url = "https://68288b7c6075e87073a41bab.mockapi.io/ZaraStore"; break;
      case "nike": url = "https://68c8141e5d8d9f5147343917.mockapi.io/NikeStore"; break;
      case "adidas": url = "https://68288b7c6075e87073a41bab.mockapi.io/AdidasStore"; break;
      case "mango": url = "https://68d116b3e6c0cbeb39a37b44.mockapi.io/Mango"; break;
      case "lacoste": url = "https://68d116b3e6c0cbeb39a37b44.mockapi.io/Lacoste"; break;
      default: url = "https://fakestoreapi.com/products"; break;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const list = data.products || data || [];
        setProducts(list);
        if (Object.keys(filters).length > 0) handleFilter(filters, list);
        else setFiltered(list);
        setLoading(false);
        window.scrollTo(0, scrollY);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [brandKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilter = (newFilters, dataSource) => {
    const data = dataSource || [...products];
    let filteredData = [...data];

    if (newFilters.query)
      filteredData = filteredData.filter((p) =>
        (p.title || p.name || "").toLowerCase().includes(newFilters.query.toLowerCase())
      );
    if (newFilters.price === "low") filteredData = filteredData.filter((p) => p.price < 50);
    if (newFilters.price === "mid") filteredData = filteredData.filter((p) => p.price >= 50 && p.price <= 150);
    if (newFilters.price === "high") filteredData = filteredData.filter((p) => p.price > 150);
    if (newFilters.category && newFilters.category !== "all")
      filteredData = filteredData.filter((p) =>
        (p.title || p.name || "").toLowerCase().includes(newFilters.category.toLowerCase())
      );
    if (newFilters.sort === "asc") filteredData.sort((a, b) => a.price - b.price);
    if (newFilters.sort === "desc") filteredData.sort((a, b) => b.price - a.price);

    setFilters(newFilters);
    setFiltered(filteredData);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const handleProductClick = (product) => {
    navigate(`/brands/${brandKey}/product/${product.id}`, {
      state: { filters, scrollY: window.scrollY }
    });
  };

  return (
    <motion.div
      className={`${styles.page} ${darkMode ? styles.dark : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* DARK MODE BUTTON */}
      <button 
        className={styles.darkModeBtn} 
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? t("home.light") : t("home.dark")}
      </button>

      {/* SELECT LANGUAGE */}
 {/* СЕЛЕКТ ЯЗЫКА */}
<select
  className={`${styles.langSelect} ${darkMode ? styles.langSelectDark : ""}`}
  onChange={(e) => i18n.changeLanguage(e.target.value)}
  value={i18n.language}
>
  <option value="ru">🇷🇺 RU</option>
  <option value="en">🇬🇧 EN</option>
  <option value="uz">🇺🇿 UZ</option>
</select>


      {/* BANNER */}
      <div className={`${styles.banner} ${bannerStyles[brandKey] || ""}`}>
        <img src={brandLogos[brandKey]} alt={brandKey} className={styles.logo} loading="lazy"/>
        <button className={styles.cartBtn} onClick={() => setCartOpen(true)}>
          🛒 {cart.length}
        </button>
      </div>

      {/* CART PANEL */}
      {cartOpen && (
        <div className={styles.cartOverlay} onClick={() => setCartOpen(false)}>
          <div className={styles.cartPanel} onClick={e => e.stopPropagation()}>
            <h3>🛒 {t("cart.title")}</h3>
            {cart.length === 0 
              ? <p>{t("cart.empty")}</p>
              : <ul className={styles.cartList}>
                  {cart.map((item,i)=>(
                    <li key={i} className={styles.cartItem}>
                      <span>{item.title || item.name}</span>
                      <span>{item.price}$</span>
                      <div className={styles.cartBtns}>
                        <button onClick={()=>removeFromCart(i)}>✖</button>
                      </div>
                    </li>
                  ))}
                </ul>
            }
            <div className={styles.cartFooter}>
              <p><b>{t("cart.total")}: {totalPrice}$</b></p>
              <button className={styles.checkoutBtn}>{t("cart.checkout")}</button>
              {cart.length>0 && <button onClick={clearCart} className={styles.clearBtn}>{t("cart.clear")}</button>}
            </div>
          </div>
        </div>
      )}

      {/* FILTERS */}
      <div className={styles.filters}>
        <Filters onFilter={(f)=>handleFilter(f)}/>
      </div>

      {/* PRODUCTS */}
      {loading ? <p>{t("loading")}</p> :
        <div className={styles.grid}>
          {filtered.map((p,i)=>(
            <div key={p.id||i} className={styles.productWrapper}>
              <div onClick={()=>handleProductClick(p)}>
                <ProductCard product={{...p, description: t(`brands.${brandKey}.desc`)}} />
              </div>
              <button className={styles.addBtn} onClick={()=>addToCart(p)}>
                {t("addToCart")}
              </button>
            </div>
          ))}
        </div>
      }
    </motion.div>
  );
}
