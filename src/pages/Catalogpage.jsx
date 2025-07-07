import React from 'react';
import ProductList from '../components/ProductList'; // Импортируем ProductList

function CatalogPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Наш Каталог Продуктов</h1>
      {/* Здесь будет список товаров, который мы уже создали */}
      <ProductList />
    </div>
  );
}

export default CatalogPage;













