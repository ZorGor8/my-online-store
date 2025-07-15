import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Используем NavLink для активных состояний
import './Header.css'; // Импорт стилей для шапки
import PixelPulseLogo from '../assets/pixelpulse-logo.svg'; // Импорт SVG-файла логотипа

function Header() {
  return (
    <header className="header-container"> {/* Используем header-container для стилей */}
      <Link to="/" className="header-brand"> {/* Обернем логотип и название в Link для кликабельности */}
        <img src={PixelPulseLogo} alt="PixelPulse Logo" className="header-logo" /> {/* Изображение логотипа */}
        <h1 className="header-title">PixelPulse</h1> {/* Название магазина */}
      </Link>
      <nav className="header-nav"> {/* Навигационное меню */}
        <ul>
          <li><NavLink to="/" end>Главная</NavLink></li> {/* NavLink для главной страницы */}
          <li><NavLink to="/products">Каталог</NavLink></li> {/* NavLink для страницы каталога */}
          {/* Если у вас есть другие страницы, добавьте их здесь с NavLink */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;