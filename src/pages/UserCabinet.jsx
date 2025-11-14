import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { CartContext } from "../CartContext";
import styles from "../styles/UserCabinet.module.css";

export default function UserCabinet() {
  const { user, setUser, logout } = useContext(AuthContext);
  const { cart = [], setCart } = useContext(CartContext);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "https://via.placeholder.com/100",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "https://via.placeholder.com/100",
      });
    }
  }, [user]);

  const handleSaveProfile = () => {
    setUser(form);
    localStorage.setItem("user", JSON.stringify(form));
    setEditMode(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setForm(parsed);
    }
  }, [setUser]);

  const changeQty = (id, delta) => {
    setCart((prev = []) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max((item.qty || 1) + delta, 1) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev = []) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    alert("Заказ успешно оформлен!");
    setCart([]);
  };

  const totalPrice = (cart || []).reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  const [supportMessage, setSupportMessage] = useState("");
  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    alert("Сообщение отправлено администратору: " + supportMessage);
    setSupportMessage("");
  };

  const [newPassword, setNewPassword] = useState("");
  const handleChangePassword = () => {
    if (newPassword.length < 5) {
      alert("Пароль должен быть минимум 5 символов");
      return;
    }
    alert("Пароль успешно изменён!");
    setNewPassword("");
  };

  if (!user) {
    return <p className={styles.loading}>Загрузка профиля...</p>;
  }

  return (
    <div className={styles.cabinet}>
      <h1>Личный кабинет</h1>

      <div className={styles.userInfo}>
        <h2>Информация о пользователе</h2>
        {editMode ? (
          <div>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Имя"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="text"
              value={form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              placeholder="Ссылка на аватар"
            />
            <button onClick={handleSaveProfile}>Сохранить</button>
          </div>
        ) : (
          <div>
            <img
              src={form.avatar}
              alt="Аватар"
              width="100"
              height="100"
              style={{ borderRadius: "50%" }}
            />
            <p>
              <strong>Имя:</strong> {form.name}
            </p>
            <p>
              <strong>Email:</strong> {form.email}
            </p>
            <button onClick={() => setEditMode(true)}>Редактировать</button>
          </div>
        )}
      </div>

      {/* Корзина */}
      <div className={styles.cart}>
        <h2>Моя корзина</h2>
        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} — {item.price}$ × {item.qty || 1}
                <div>
                  <button onClick={() => changeQty(item.id, -1)}>-</button>
                  <button onClick={() => changeQty(item.id, 1)}>+</button>
                  <button onClick={() => removeFromCart(item.id)}>❌</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <h3>Итого: {totalPrice}$</h3>
        {cart.length > 0 && (
          <button onClick={handleCheckout}>Оформить заказ</button>
        )}
      </div>

      <div className={styles.support}>
        <h2>Поддержка</h2>
        <form onSubmit={handleSupportSubmit}>
          <textarea
            value={supportMessage}
            onChange={(e) => setSupportMessage(e.target.value)}
            placeholder="Опишите проблему или задайте вопрос"
          />
          <button type="submit">Отправить</button>
        </form>
      </div>

      <div className={styles.settings}>
        <h2>Настройки</h2>
        <div>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Новый пароль"
          />
          <button onClick={handleChangePassword}>Сменить пароль</button>
        </div>
        <button onClick={logout}>Выйти из аккаунта</button>
      </div>
    </div>
  );
}
