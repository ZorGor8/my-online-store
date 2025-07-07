import React from 'react';
import { Link } from 'react-router-dom'; // Импорт Link
import './Header.css'; // Убедись, что стили Header импортируются

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Мой Магазин</Link> {/* Изменили <a> на <Link> */}
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/">Главная</Link></li> {/* Ссылка на главную */}
          <li><Link to="/catalog">Каталог</Link></li> {/* Ссылка на каталог */}
          {/* Пока не добавляем ссылку на страницу продукта, т.к. она динамическая */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;