// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './pages/Homepage'; // <-- Убедитесь, что этот файл существует
import ProductList from './components/ProductList'; // <-- Убедитесь, что этот файл существует
// ProductDetails, AboutPage, ContactPage, NotFoundPage - пока не импортируем, т.к. их нет

import FavoritesPage from './pages/FavoritesPage'; // <-- Должен существовать, мы его создали!

import './App.css';
import './components/ProductList.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <nav className="main-nav">
          <Link to="/" className="nav-logo">PixelPulse</Link> {/* <-- Измените текст здесь */}
            <ul className="nav-links">
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/products">Каталог</Link></li>
              <li><Link to="/favorites">Избранное</Link></li>
              {/* Остальные ссылки (О нас, Контакты) пока не добавляем, т.к. нет страниц */}
            </ul>
          </nav>
        </header>

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            {/* Маршруты для ProductDetails, About, Contact, NotFound пока не добавляем */}
            {/* Если какой-либо из этих файлов все же есть и вы хотите его добавить, сообщите мне */}
            {/* Например, если у вас есть NotFoundPage, вы можете его добавить: */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2025 MyStore. Все права защищены.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;