import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../CartContext";
import { toast } from "react-toastify"; // ✅ Импортируем toast
import styles from "../styles/ProductPage.module.css";

export default function ProductPage() {
  const { brandName, productId } = useParams();
  const location = useLocation();
  const backState = location.state || {};

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    let url = "";
    switch (brandName.toLowerCase()) {
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
        const list = data.products || data;
        const item = list.find(p => String(p.id) === String(productId));
        setProduct(item || null);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [brandName, productId]);

  if (loading) return <p>Загрузка...</p>;
  if (!product) return <p>Товар не найден</p>;

  const handleAddToCart = (p) => {
    addToCart(p);
    toast.success(`${p.title || p.name} добавлен в корзину!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/brands/${brandName}`}
        state={backState}
        className={styles.backBtn}
      >
        ← Назад
      </Link>

      <div className={styles.productContainer}>
        <img
          src={product.image || product.photo}
          alt={product.title || product.name}
          className={styles.productImage}
          loading="lazy"
        />
        <div className={styles.productInfo}>
          <h2>{product.title || product.name}</h2>
          <p className={styles.price}>{product.price}$</p>
          <p className={styles.description}>{product.description || "Описание отсутствует"}</p>
          <button
            className={styles.addBtn}
            onClick={() => handleAddToCart(product)}
          >
            В корзину
          </button>
        </div>
      </div>
    </motion.div>
  );
}
