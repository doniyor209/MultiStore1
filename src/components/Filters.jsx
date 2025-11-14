import React, { useState } from 'react';
import styles from '../styles/Filters.module.css';

export default function Filters({ onFilter }) {
  const [query, setQuery] = useState('');
  const [price, setPrice] = useState('all');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('none');

  const apply = () => onFilter({ query, price, category, sort });

  return (
    <div className={styles.filters}>
      <input className={styles.search} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Поиск..." />
      <select className={styles.select} value={price} onChange={e=>setPrice(e.target.value)}>
        <option value="all">Все цены</option>
        <option value="low">До 50$</option>
        <option value="mid">50$ - 150$</option>
        <option value="high">150$+</option>
      </select>
      <select className={styles.select} value={category} onChange={e=>setCategory(e.target.value)}>
        <option value="all">Все категории</option>
        <option value="dress">Платья</option>
        <option value="shoes">Обувь</option>
        <option value="jackets">Куртки</option>
      </select>
      <select className={styles.select} value={sort} onChange={e=>setSort(e.target.value)}>
        <option value="none">Нет сортировки</option>
        <option value="asc">Цена ↑</option>
        <option value="desc">Цена ↓</option>
        <option value="discount">Скидка %</option>
      </select>
      <button className={styles.button} onClick={apply}>Применить</button>
    </div>
  );
}
