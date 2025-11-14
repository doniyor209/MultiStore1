import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
