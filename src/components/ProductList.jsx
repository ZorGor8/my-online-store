import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ProductList.css'; 
import Modal from './Modal';
import SkeletonCard from './SkeletonCard';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, removeFromCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [lastAddedId, setLastAddedId] = useState(null);
  
  // Состояния для загрузки [Loading states]
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentCategory = searchParams.get('category') || '';
  const currentSearchQuery = searchParams.get('search') || '';

  // Эффект имитации загрузки [Simulation of loading effect]
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productsData); 
      setIsLoading(false);      
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  // Фильтрация теперь работает с загруженным стейтом [Filtering now works with the loaded state]
  const filteredProducts = useMemo(() => {
    let tempProducts = products; 

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
  }, [currentCategory, currentSearchQuery, products]);

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

  const handleAddToCart = (product) => {
    addToCart(product);
    setLastAddedId(product.id); 
    setModalMessage(`"${product.title}" добавлен в корзину!`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (lastAddedId) {
      removeFromCart(lastAddedId); 
      setLastAddedId(null); 
    }
    setIsModalOpen(false);
    setModalMessage('');
  };

  const handleConfirmOrder = () => {
    setLastAddedId(null); 
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
        {isLoading ? (
          // Показываем 6 скелетонов во время загрузки [Show 6 skeletons during loading]
          [...Array(6)].map((_, index) => <SkeletonCard key={index} />)
        ) : filteredProducts.length > 0 ? (
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
                  onClick={() => handleAddToCart(product)} 
                >
                  В корзину
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>По вашему запросу товаров не найдено.</p>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title="Уведомление"
      >
        <div className="modal-actions-custom">
          <p>{modalMessage}</p>
          <button className="confirm-button" onClick={handleConfirmOrder}>
            Оставить в корзине
          </button>
          <button className="cancel-button" onClick={handleCloseModal}>
            Удалить / Отмена
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ProductList;