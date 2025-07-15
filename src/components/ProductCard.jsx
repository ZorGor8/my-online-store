// src/components/ProductCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Если у вас есть отдельный CSS для ProductCard.jsx, можете его импортировать здесь:
// import './ProductCard.css'; // Если нет, эту строку можно удалить.

// Принимаем onAddToCart в пропсах для кнопки корзины
function ProductCard({ product, onToggleFavorite, isInitiallyFavorite, onAddToCart }) {
  // Инициализируем состояние isFavorite на основе пропса isInitiallyFavorite
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);

  // Обновляем isFavorite, если isInitiallyFavorite меняется (например, при фильтрации или первом рендере)
  useEffect(() => {
    setIsFavorite(isInitiallyFavorite);
  }, [isInitiallyFavorite]);

  const handleToggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus); // Обновляем локальное состояние
    onToggleFavorite(product.id, newFavoriteStatus); // Сообщаем родительскому компоненту об изменении
  };

  return (
    <div className="product-card">
      <img src={product.image || 'https://via.placeholder.com/150'} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <p className="product-category">Категория: {product.category}</p>

      {/* Кнопка/иконка для добавления в избранное */}
      <button
        className={`favorite-button ${isFavorite ? 'favorite-active' : ''}`}
        onClick={handleToggleFavorite}
      >
        {isFavorite ? '★ В избранном' : '☆ Добавить в избранное'}
      </button>

      <div className="product-card-buttons">
        <Link to={`/products/${product.id}`} className="details-button">
          Подробнее
        </Link>
        {/* Кнопка "Добавить в корзину" с вызовом переданной функции onAddToCart */}
        <button
          className="add-to-cart-button"
          onClick={() => onAddToCart(product.title)} // Вызываем переданную функцию
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}

export default ProductCard;