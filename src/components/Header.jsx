import React, { useContext } from 'react'; // Добавили useContext [Added useContext]
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Импорт контекста [Context import]
import './Header.css';
import PixelPulseLogo from '../assets/pixelpulse-logo.svg';

function Header() {
  // Подключаемся к "мозгу" корзины [Connecting to the cart "brain"]
  const { cartItems } = useContext(CartContext);

  // Считаем общее количество товаров [Calculating total number of items]
  // Метод reduce — это база для Middle-разработчика [Reduce method is a Middle dev essential]
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header-container">
      <Link to="/" className="header-brand">
        <img src={PixelPulseLogo} alt="PixelPulse Logo" className="header-logo" />
        <h1 className="header-title">PixelPulse</h1>
      </Link>
      
      <nav className="header-nav">
        <ul>
          <li><NavLink to="/" end>Главная</NavLink></li>
          <li><NavLink to="/products">Каталог</NavLink></li>
          
          {/* Добавляем ссылку на корзину со счетчиком [Adding cart link with counter] */}
          <li>
            <NavLink to="/cart" className="cart-link">
              🛒 Корзина {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;