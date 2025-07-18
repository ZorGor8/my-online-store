// src/pages/Homepage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link для навигации

function Homepage() {
  return (
    <div className="homepage-container">
      <section className="hero-section">
        <h1>Добро пожаловать в PixelPulse!</h1> {/* Более яркий заголовок */}
        <p className="hero-tagline">
          Откройте для себя новейшие гаджеты, электронику и многое другое
          по лучшим ценам.
        </p>
        <Link to="/products" className="button primary-button">
          Перейти в Каталог
        </Link>
      </section>

      {/* Секция для рассылки, если она нужна, можно стилизовать её отдельно */}
      <section className="newsletter-section">
        <h2>Подпишитесь на нашу рассылку!</h2>
        <p>Получайте эксклюзивные предложения и последние новости прямо на почту.</p>
        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Ваш Email"
            className="newsletter-input"
          />
          <button type="submit" className="button secondary-button">
            Подписаться
          </button>
          <p className="newsletter-privacy">Мы никогда не передадим ваш Email третьим лицам.</p>
        </form>
      </section>

      {/* Здесь можно добавить другие секции: популярные товары, преимущества и т.д. */}
    </div>
  );
}

export default Homepage;