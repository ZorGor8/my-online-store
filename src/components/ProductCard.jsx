
// src/components/ProductCard.jsx
import React from 'react';
import './ProductCard.css'; // <--- Добавь эту строку
// ... остальной код



function ProductCard() {
  return (
    <div className="product-card">
      <img src="https://via.placeholder.com/150" alt="Product Image" className="product-image" />
      <h3 className="product-title">Название товара</h3>
      <p className="product-price">$XX.XX</p>
      <button className="add-to-cart-button">Добавить в корзину</button>
    </div>
  );
}

export default ProductCard;