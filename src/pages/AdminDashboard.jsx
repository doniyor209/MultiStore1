import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AdminDashboard.module.css";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const { user, role, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("stats");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Проверка роли и загрузка данных
  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    } else {
      fetchUsers();
      fetchProducts();
      fetchOrders();
    }
  }, [role, navigate]);

  // Загрузка пользователей
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://68c8141e5d8d9f5147343917.mockapi.io/RegisterUsersInMySite"
      );
      setUsers(res.data || []);
    } catch (err) {
      console.error("Ошибка загрузки пользователей", err);
    }
  };

  // Загрузка товаров
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://68c8141e5d8d9f5147343917.mockapi.io/Products"
      );
      setProducts(res.data || []);
    } catch (err) {
      console.error("Ошибка загрузки товаров", err);
    }
  };

  // Загрузка заказов
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://68c8141e5d8d9f5147343917.mockapi.io/Orders"
      );
      setOrders(res.data || []);
    } catch (err) {
      console.error("Ошибка загрузки заказов", err);
    }
  };

  // Удаление пользователя
  const deleteUser = async (id) => {
    await axios.delete(
      `https://68c8141e5d8d9f5147343917.mockapi.io/RegisterUsersInMySite/${id}`
    );
    fetchUsers();
  };

  // Смена роли пользователя
  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    await axios.put(
      `https://68c8141e5d8d9f5147343917.mockapi.io/RegisterUsersInMySite/${id}`,
      { role: newRole }
    );
    fetchUsers();
  };

  // Удаление продукта
  const deleteProduct = async (id) => {
    await axios.delete(
      `https://68c8141e5d8d9f5147343917.mockapi.io/Products/${id}`
    );
    fetchProducts();
  };

  // Статистика
  const stats = {
    users: users.length,
    products: products.length,
    orders: orders.length,
    revenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
  };

  // Переключение темы
  const toggleTheme = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  // Смена языка
  const changeLang = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <div className={`${styles.dashboard} ${darkMode ? styles.dark : ""}`}>
      {/* Заголовок и управление */}
      <div className={styles.header}>
        <h1>{t("adminPanel")}</h1>
        <div className={styles.controls}>
          <button onClick={toggleTheme} className={styles.themeBtn}>
            {darkMode ? t("light") : t("dark")}
          </button>
         
        </div>
      </div>

      {/* Приветствие */}
      <p>
        {t("welcome")}, {user?.displayName || user?.email || "Admin"} 👑
      </p>

      <button onClick={logout} className={styles.logoutBtn}>
        {t("logout")}
      </button>

      {/* Табуляция */}
      <div className={styles.tabs}>
        {["stats", "users", "products", "orders"].map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${
              activeTab === tab ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {t(tab)}
          </button>
        ))}
      </div>

      {/* Вкладка статистики */}
      {activeTab === "stats" && (
        <div className={styles.stats}>
          <div className={styles.card}>{t("users")}: {stats.users}</div>
          <div className={styles.card}>{t("products")}: {stats.products}</div>
          <div className={styles.card}>{t("orders")}: {stats.orders}</div>
          <div className={styles.card}>{t("revenue")}: {stats.revenue} $</div>
        </div>
      )}

      {/* Вкладка пользователи */}
      {activeTab === "users" && (
        <div>
          <h2>{t("users")}</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t("id")}</th>
                <th>{t("name")}</th>
                <th>{t("email")}</th>
                <th>{t("password")}</th>
                <th>{t("role")}</th>
                <th>{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{`${u.name || ""} ${u.surname || ""}`}</td>
                  <td>{u.email || ""}</td>
                  <td>{u.role === "admin" ? "Скрыт" : u.password || ""}</td>
                  <td>{u.role || "user"}</td>
                  <td>
                    {u.role !== "admin" && (
                      <>
                        <button
                          className={styles.btnBlue}
                          onClick={() => toggleRole(u.id, u.role)}
                        >
                          {t("changeRole")}
                        </button>
                        <button
                          className={styles.btnRed}
                          onClick={() => deleteUser(u.id)}
                        >
                          {t("delete")}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Вкладка продукты */}
      {activeTab === "products" && (
        <div>
          <h2>{t("products")}</h2>
          <ul>
            {products.map((p) => (
              <li key={p.id} className={styles.listItem}>
                {p.title || "Без названия"} - {p.price || 0} $
                <button
                  className={styles.btnRed}
                  onClick={() => deleteProduct(p.id)}
                >
                  {t("delete")}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Вкладка заказы */}
      {activeTab === "orders" && (
        <div>
          <h2>{t("orders")}</h2>
          <ul>
            {orders.map((o) => (
              <li key={o.id} className={styles.listItem}>
                <b>{o.userEmail || "—"}</b> | {t("revenue")}: {o.total || 0} $ | 
                Статус: {o.status || "Не указан"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
