// src/components/ProductList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json'; // Убедитесь, что путь к products.json правильный
import './ProductList.css';
import Modal from './Modal'; // Убедитесь, что путь к Modal.jsx правильный
import ProductCard from './ProductCard'; // Импортируем компонент ProductCard

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Состояние для модального окна (для корзины)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Состояние для избранных продуктов
  // Инициализируем из localStorage при загрузке компонента
  const [favoriteProductIds, setFavoriteProductIds] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteProducts');
    try {
      // Проверяем, что savedFavorites не null/undefined и является валидным JSON
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (e) {
      console.error("Ошибка при парсинге избранных из localStorage:", e);
      return []; // Возвращаем пустой массив в случае ошибки парсинга
    }
  });

  // Эффект для сохранения избранных продуктов в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProductIds));
  }, [favoriteProductIds]);

  const currentCategory = searchParams.get('category') || '';
  const currentSearchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    let tempProducts = productsData;

    if (currentCategory && currentCategory !== 'Все') {
      tempProducts = tempProducts.filter(product =>
        product.category.toLowerCase() === currentCategory.toLowerCase()
      );
    }

    if (currentSearchQuery) {
      tempProducts = tempProducts.filter(product =>
        product.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) || // Используйте product.title, если в JSON это поле
        product.category.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(currentSearchQuery.toLowerCase())
      );
    }

    return tempProducts;
  }, [currentCategory, currentSearchQuery]);

  // Генерируем категории из данных продуктов, фильтруем пустые значения
  const categories = ['Все', ...new Set(productsData.map(product => product.category).filter(Boolean))];

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

  // Функция для обработки добавления в корзину (передается в ProductCard)
  const handleAddToCart = (productTitle) => {
    setModalMessage(`"${productTitle}" добавлен в корзину!`);
    setIsModalOpen(true);
  };

  // Функция для обработки переключения избранного из ProductCard
  const handleToggleFavorite = (productId, isFavoriteStatus) => {
    setFavoriteProductIds(prevFavorites => {
      if (isFavoriteStatus) {
        // Добавляем ID продукта, если его нет в списке избранных
        return [...new Set([...prevFavorites, productId])]; // Используем Set для гарантии уникальности
      } else {
        // Удаляем ID продукта из списка избранных
        return prevFavorites.filter(id => id !== productId);
      }
    });
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
            <ProductCard
              key={product.id}
              product={product}
              onToggleFavorite={handleToggleFavorite} // Передаем функцию для обновления избранного
              isInitiallyFavorite={favoriteProductIds.includes(product.id)} // Передаем начальное состояние избранного
              onAddToCart={handleAddToCart} // Передаем функцию добавления в корзину
            />
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