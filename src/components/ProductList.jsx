import React, { useState } from 'react'; // Добавили useState
import ProductCard from './ProductCard';
import productsData from '../data/products.json';
import '../components/ProductList.css';

function ProductList() {
  // 1. Создаем состояние для текущей выбранной категории.
  // По умолчанию, 'Все' означает, что фильтр не применен.
  const [selectedCategory, setSelectedCategory] = useState('Все');

  // 2. Получаем все уникальные категории из наших данных.
  // Используем Set для уникальности, затем преобразуем в массив.
  const categories = ['Все', ...new Set(productsData.map(product => product.category))];

  // 3. Фильтруем продукты на основе выбранной категории.
  const filteredProducts = selectedCategory === 'Все'
    ? productsData // Если выбрано 'Все', показываем все продукты
    : productsData.filter(product => product.category === selectedCategory); // Иначе фильтруем по категории

  return (
    <div className="product-list-container">
      {/* Добавляем элементы управления фильтрацией */}
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)} // При клике обновляем состояние категории
            className={selectedCategory === category ? 'active' : ''} // Добавляем класс 'active' для выбранной кнопки
          >
            {category}
          </button>
        ))}
      </div>

      {/* Отображаем отфильтрованные продукты */}
      <div className="product-grid"> {/* Добавим новый div для сетки продуктов */}
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;