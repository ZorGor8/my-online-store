// src/pages/FavoritesPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json'; // Импортируем данные о продуктах
import ProductCard from '../components/ProductCard'; // Импортируем ProductCard
import '../components/ProductList.css'; // Используем те же стили, так как ProductCard их использует

function FavoritesPage() {
  // Состояние для избранных продуктов, инициализируем из localStorage
  const [favoriteProductIds, setFavoriteProductIds] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteProducts');
    try {
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (e) {
      console.error("Ошибка при парсинге избранных из localStorage на FavoritesPage:", e);
      return [];
    }
  });

  // Эффект для обновления localStorage при изменении избранных (важно, если вы будете добавлять/удалять избранное прямо с этой страницы)
  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProductIds));
  }, [favoriteProductIds]);

  // Фильтруем все продукты, чтобы оставить только избранные
  const favoriteProducts = useMemo(() => {
    return productsData.filter(product => favoriteProductIds.includes(product.id));
  }, [favoriteProductIds]);

  // Функции для взаимодействия с ProductCard (аналогично ProductList.jsx)
  const handleToggleFavorite = (productId, isFavoriteStatus) => {
    setFavoriteProductIds(prevFavorites => {
      if (isFavoriteStatus) {
        return [...new Set([...prevFavorites, productId])];
      } else {
        return prevFavorites.filter(id => id !== productId);
      }
    });
  };

  // Здесь пока заглушка для корзины, т.к. корзина не является главной темой FavoritesPage
  const handleAddToCart = (productTitle) => {
    alert(`"${productTitle}" добавлен в корзину с FavoritesPage! (Эту логику нужно будет доработать позже)`);
    // В реальном приложении здесь будет логика добавления в глобальное состояние корзины
  };

  return (
    <div className="product-list-container"> {/* Используем тот же контейнер для стилей */}
      <h1>Ваши Избранные Продукты</h1>

      {favoriteProducts.length > 0 ? (
        <div className="product-grid"> {/* Используем ту же сетку для стилей */}
          {favoriteProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleFavorite={handleToggleFavorite}
              isInitiallyFavorite={favoriteProductIds.includes(product.id)}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="no-favorites-message">
          <p>У вас пока нет избранных товаров.</p>
          <Link to="/products" className="details-button">Перейти к каталогу</Link> {/* Используем btn-primary для стиля */}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;