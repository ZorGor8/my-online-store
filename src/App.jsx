// src/App.jsx
import { useState } from 'react'; // Оставим useState на всякий случай, он пока не нужен
import ProductList from './components/ProductList'; // <--- Добавь эту строку
import './App.css'; // Оставим импорт стилей

// 'BrowserRouter as Router' позволяет нам использовать более короткое имя 'Router'
import Header from './components/Header'; // Убедись, что эти импорты есть
import './App.css'; // Убедись, что этот импорт есть


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Добавляем Routes, Route
import HomePage from './pages/Homepage'; // Импорт HomePage
import CatalogPage from './pages/Catalogpage'; // Импорт CatalogPage
import ProductPage from './pages/ProductPage'; // Импорт ProductPage



function App() {

  return (
    <Router> {/* Оборачиваем все наше приложение в Router */}
      <div className="App">
        <Header />
        <main>
          <Routes> {/* Контейнер для всех наших маршрутов */}
            <Route path="/" element={<HomePage />} /> {/* Маршрут для главной страницы */}
            <Route path="/catalog" element={<CatalogPage />} /> {/* Маршрут для страницы каталога */}
            {/* Маршрут для страницы продукта. :id - это параметр, который будет меняться */}
            <Route path="/product/:id" element={<ProductPage />} />
            {/* Можно добавить маршрут для 404 страницы, если путь не найден */}
            <Route path="*" element={<div>404 Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router> // Закрывающий тег Router
  );
}

export default App;