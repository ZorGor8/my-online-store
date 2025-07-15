// src/components/ProductList.jsx
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import './ProductList.css'; // <-- УБЕДИТЕСЬ, ЧТО ЭТА СТРОКА НА МЕСТЕ И ПРАВИЛЬНАЯ!
import Modal from './Modal';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const currentCategory = searchParams.get('category') || '';
  const currentSearchQuery = searchParams.get('search') || '';

  const filteredProducts = React.useMemo(() => {
    let tempProducts = productsData;

    if (currentCategory && currentCategory !== 'Все') {
      tempProducts = tempProducts.filter(product =>
        product.category.toLowerCase() === currentCategory.toLowerCase()
      );
    }

    if (currentSearchQuery) {
      tempProducts = tempProducts.filter(product =>
        product.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(currentSearchQuery.toLowerCase())
      );
    }

    return tempProducts;
  }, [currentCategory, currentSearchQuery]);

  const categories = ['Все', ...new Set(productsData.map(product => product.category))];

  const handleCategoryChange = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category && category !== 'Все') {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  const handleAddToCart = (productTitle) => {
    setModalMessage(`"${productTitle}" добавлен в корзину!`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  return (
    <div className="product-list-container">
      <h1>Наш Каталог Продуктов</h1>

      <div className="search-and-reset-container">
        <input
          type="text"
          placeholder="Поиск по названию или категории..."
          className="search-input"
          value={currentSearchQuery}
          onChange={handleSearchChange}
        />
        <button
          className="reset-button"
          onClick={handleResetFilters}
        >
          Сбросить фильтры
        </button>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={currentCategory === category || (!currentCategory && category === 'Все') ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              {product.image && <img src={product.image} alt={product.title} className="product-image" />}
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <p className="product-category">Категория: {product.category}</p>

              <div className="product-card-buttons">
                <Link to={`/products/${product.id}`} className="details-button">
                  Подробнее
                </Link>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product.title)}
                >
                  Добавить в корзину
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>По вашему запросу товаров не найдено.</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Уведомление">
        <p>{modalMessage}</p>
        <button onClick={handleCloseModal}>ОК</button>
      </Modal>
    </div>
  );
}

export default ProductList;