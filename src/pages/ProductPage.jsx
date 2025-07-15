// src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import './ProductPage.css'; // <-- Убедитесь, что этот импорт присутствует и корректен
import Modal from '../components/Modal';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    setLoading(false);
  }, [id]);

  const handleAddToCart = (productTitle) => {
    setModalMessage(`"${productTitle}" добавлен в корзину!`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  if (loading) {
    return <div className="loading-message">Загрузка...</div>;
  }

  if (!product) {
    return (
      <div className="not-found-message">
        <h1>Продукт не найден</h1>
        <p>К сожалению, товар с ID: {id} не существует.</p>
        <Link to="/catalog" className="details-button">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="product-page-container">
      <div className="product-detail-card">
        {product.image && (
          <img src={product.image} alt={product.title} className="product-detail-image" />
        )}
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-category">Категория: {product.category}</p>
          <p className="product-detail-description">{product.description}</p>
          <button className="add-to-cart-button" onClick={() => handleAddToCart(product.title)}>
            Добавить в корзину
          </button>
          <Link to="/catalog" className="back-to-catalog-button">
            Вернуться в каталог
          </Link>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Уведомление">
        <p>{modalMessage}</p>
        <button onClick={handleCloseModal}>ОК</button>
      </Modal>
    </div>
  );
}

export default ProductPage;