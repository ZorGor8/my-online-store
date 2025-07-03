// src/components/ProductList.jsx
import React from 'react'; // <--- Оставь ТОЛЬКО эту строку
import ProductCard from './ProductCard'; // Импортируем ProductCard
import './ProductList.css'; // <--- Добавь эту строку (если еще не добавил)
function ProductList() {
  // Пока что просто отобразим несколько ProductCard, чтобы увидеть их
  return (
    <div className="product-list">
      <h2>Наш каталог товаров</h2>
      <div className="product-grid">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />

        {/* Можешь добавить больше ProductCard, чтобы увидеть, как они располагаются */}
      </div>
    </div>
  );
}

export default ProductList;