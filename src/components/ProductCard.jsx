import React from 'react';
import styles from '../styles/ProductCard.module.css';

export default function ProductCard({ product }) {
  const title = product.title || product.name || product.productName || 'No name';
  const image = product.thumbnail || product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/400x300';
  const priceNow = product.price || product.priceNow || (product.price && product.price.current && product.price.current.value) || 0;
  const priceOld = product.oldPrice || product.previousPrice || (product.price && product.price.previous && product.price.previous.value) || null;

  const discount = priceOld ? Math.round(((priceOld - priceNow) / priceOld) * 100) : 0;
  const isTop = priceNow > 200;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />

        {discount > 0 ? (
          <span className={styles.saleBadge}>SALE</span>
        ) : isTop ? (
          <span className={styles.topBadge}>TOP</span>
        ) : (
          <span className={styles.newBadge}>NEW</span>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{title}</h3>
        <div className={styles.prices}>
          <span className={styles.current}>${priceNow}</span>
          {priceOld && <span className={styles.old}>${priceOld}</span>}
        </div>
        {discount > 0 && <span className={styles.discount}>-{discount}%</span>}
      </div>
    </div>
  );
}
