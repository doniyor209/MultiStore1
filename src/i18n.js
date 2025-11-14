// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      home: {
        title: "Добро пожаловать в MultiBrand Store",
        subtitle: "Откройте для себя лучшие бренды и коллекции и выберите любой из них",
        slides: {
          new: "Новые коллекции",
          shoes: "Популярные кроссовки",
          popular: "Популярные товары",
        },
        go: "Перейти",
        brands: "Популярные бренды",
        dark: "🌙 Тёмная тема",
        light: "☀️ Светлая тема",
        moreBtn: "Подробнее",
      },

      // 🔹 описания брендов
      brands: {
        zara: { desc: "Zara — современная одежда и аксессуары." },
        nike: { desc: "Nike — спортивная обувь, одежда и аксессуары." },
        adidas: { desc: "Adidas — легендарный спортивный бренд." },
        "massimo dutti": { desc: "Massimo Dutti — премиальная одежда и аксессуары." },
        mango: { desc: "Mango — стильная одежда для повседневной жизни." },
        lacoste: { desc: "Lacoste — бренд с легендарным крокодилом." },
      },

      login: {
        title: "Вход",
        email: "Email",
        password: "Пароль",
        enter: "Войти",
        register: "Зарегистрироваться",
        noAccount: "Нет аккаунта?",
        quickLogin: "Быстрый вход",
        quickAdmin: "🛡️ Войти как Админ",
        quickUser: "🛍️ Войти как Покупатель",
        errors: {
          unknownRole: "Неизвестная роль пользователя",
          loginError: "Неверный email или пароль",
          onlyUserBtn: "Ошибка: эта кнопка только для покупателей!",
          onlyAdminBtn: "Ошибка: эта кнопка только для админов!",
        },
      },

      registration: {
        title: "Регистрация",
        name: "Имя",
        surname: "Фамилия",
        phone: "Телефон",
        address: "Адрес",
        passwordAgain: "Повторите пароль",
        signUpAsUser: "🛍️ Зарегистрироваться как покупатель",
        alreadyAccount: "Уже есть аккаунт?",
      },

      admin: {
        panel: "Админ-панель",
        welcome: "Добро пожаловать",
        logout: "🚪 Выйти",
        stats: "📊 Статистика",
        users: "👤 Пользователи",
        products: "🛒 Товары",
        orders: "📦 Заказы",
        revenue: "💰 Выручка",
        id: "ID",
        role: "Роль",
        actions: "Действия",
        changeRole: "🔄 Сменить роль",
        delete: "❌ Удалить",
        light: "☀️ Светлая",
        dark: "🌙 Тёмная",
      },

      brandsTitle: "Бренды",
      goTo: "Перейти",

      cart: {
        title: "Ваша корзина",
        empty: "Корзина пустая",
        total: "Итого",
        checkout: "Оформить заказ",
        clear: "Очистить",
      },

      loading: "Загрузка...",
      addToCart: "В корзину",
    },
  },

  en: {
    translation: {
      home: {
        title: "Welcome to MultiBrand Store",
        subtitle: "Discover the best brands and collections and choose any of them",
        slides: {
          new: "New Collections",
          shoes: "Popular Sneakers",
          popular: "Popular Products",
        },
        go: "Go to",
        brands: "Popular Brands",
        dark: "🌙 Dark Theme",
        light: "☀️ Light Theme",
        moreBtn: "More",
      },

      // 🔹 brands descriptions
      brands: {
        zara: { desc: "Zara — modern clothing and accessories." },
        nike: { desc: "Nike — sports shoes, clothes and accessories." },
        adidas: { desc: "Adidas — legendary sports brand." },
        "massimo dutti": { desc: "Massimo Dutti — premium clothing and accessories." },
        mango: { desc: "Mango — stylish everyday clothing." },
        lacoste: { desc: "Lacoste — brand with the iconic crocodile." },
      },

      login: {
        title: "Login",
        email: "Email",
        password: "Password",
        enter: "Sign In",
        register: "Register",
        noAccount: "No account?",
        quickLogin: "Quick login",
        quickAdmin: "🛡️ Login as Admin",
        quickUser: "🛍️ Login as User",
        errors: {
          unknownRole: "Unknown user role",
          loginError: "Invalid email or password",
          onlyUserBtn: "Error: this button is only for users!",
          onlyAdminBtn: "Error: this button is only for admins!",
        },
      },

      registration: {
        title: "Registration",
        name: "First Name",
        surname: "Last Name",
        phone: "Phone",
        address: "Address",
        passwordAgain: "Repeat Password",
        signUpAsUser: "🛍️ Sign up as User",
        alreadyAccount: "Already have an account?",
      },

      admin: {
        panel: "Admin Panel",
        welcome: "Welcome",
        logout: "🚪 Logout",
        stats: "📊 Stats",
        users: "👤 Users",
        products: "🛒 Products",
        orders: "📦 Orders",
        revenue: "💰 Revenue",
        id: "ID",
        role: "Role",
        actions: "Actions",
        changeRole: "🔄 Change role",
        delete: "❌ Delete",
        light: "☀️ Light",
        dark: "🌙 Dark",
      },

      brandsTitle: "Brands",
      goTo: "Go to",

      cart: {
        title: "Your cart",
        empty: "Cart is empty",
        total: "Total",
        checkout: "Checkout",
        clear: "Clear",
      },

      loading: "Loading...",
      addToCart: "Add to Cart",
    },
  },

  uz: {
    translation: {
      home: {
        title: "MultiBrand Store ga xush kelibsiz",
        subtitle: "Eng yaxshi brendlar va kolleksiyalarni kashf eting va ularning har qandayini tanlashingiz mumkin",
        slides: {
          new: "Yangi kolleksiyalar",
          shoes: "Mashhur krossovkalar",
          popular: "Mashhur mahsulotlar",
        },
        go: "O‘tish",
        brands: "Mashhur brendlar",
        dark: "🌙 Qorong‘i mavzu",
        light: "☀️ Yorug‘ mavzu",
        moreBtn: "Batafsil",
      },

      // 🔹 brendlar tavsifi
      brands: {
        zara: { desc: "Zara — zamonaviy kiyimlar va aksessuarlar." },
        nike: { desc: "Nike — sport poyabzali, kiyim va aksessuarlar." },
        adidas: { desc: "Adidas — afsonaviy sport brendi." },
        "massimo dutti": { desc: "Massimo Dutti — premium kiyim va aksessuarlar." },
        mango: { desc: "Mango — kundalik hayot uchun zamonaviy kiyimlar." },
        lacoste: { desc: "Lacoste — mashhur timsoh logotipli brend." },
      },

      login: {
        title: "Kirish",
        email: "Email",
        password: "Parol",
        enter: "Kirish",
        register: "Ro‘yxatdan o‘tish",
        noAccount: "Hisobingiz yo‘qmi?",
        quickLogin: "Tez kirish",
        quickAdmin: "🛡️ Admin sifatida kirish",
        quickUser: "🛍️ Xaridor sifatida kirish",
        errors: {
          unknownRole: "Noma’lum foydalanuvchi roli",
          loginError: "Noto‘g‘ri email yoki parol",
          onlyUserBtn: "Xatolik: bu tugma faqat xaridorlar uchun!",
          onlyAdminBtn: "Xatolik: bu tugma faqat adminlar uchun!",
        },
      },

      registration: {
        title: "Ro‘yxatdan o‘tish",
        name: "Ism",
        surname: "Familiya",
        phone: "Telefon",
        address: "Manzil",
        passwordAgain: "Parolni qayta kiriting",
        signUpAsUser: "🛍️ Xaridor sifatida ro‘yxatdan o‘tish",
        alreadyAccount: "Hisobingiz bormi?",
      },

      admin: {
        panel: "Admin Paneli",
        welcome: "Xush kelibsiz",
        logout: "🚪 Chiqish",
        stats: "📊 Statistika",
        users: "👤 Foydalanuvchilar",
        products: "🛒 Mahsulotlar",
        orders: "📦 Buyurtmalar",
        revenue: "💰 Daromad",
        id: "ID",
        role: "Rol",
        actions: "Amallar",
        changeRole: "🔄 Rolni o‘zgartirish",
        delete: "❌ O‘chirish",
        light: "☀️ Yorug‘",
        dark: "🌙 Qorong‘i",
      },

      brandsTitle: "Brendlar",
      goTo: "O‘tish",

      cart: {
        title: "Savatcha",
        empty: "Savatcha bo‘sh",
        total: "Jami",
        checkout: "Buyurtma berish",
        clear: "Tozalash",
      },

      loading: "Yuklanmoqda...",
      addToCart: "Savatchaga qo‘shish",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru", // язык по умолчанию
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
