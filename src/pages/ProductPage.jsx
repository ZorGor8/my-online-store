import React, { useState, useEffect } from 'react'; // Импортируем React (по умолчанию), а также useState и useEffect (именованные)
import { useParams } from 'react-router-dom';
import productsData from '../data/products.json';
import './ProductPage.css';
function ProductPage() {
  const { productId } = useParams();

  // --- НОВЫЕ СОСТОЯНИЯ ---
  const [product, setProduct] = useState(null);    // Состояние для хранения найденного продукта (изначально null)
  const [loading, setLoading] = useState(true);    // Состояние для индикатора загрузки (изначально true)
  const [error, setError] = useState(false);      // Состояние для обработки ошибок (изначально false)
  // --- КОНЕЦ НОВЫХ СОСТОЯНИЙ ---

  // --- ХУК useEffect ---
  useEffect(() => {
    setLoading(true); // Начинаем загрузку, устанавливаем loading в true
    setError(false);  // Сбрасываем любые предыдущие ошибки

    // Имитация задержки запроса к API (в реальном приложении здесь был бы fetch или axios)
    const timer = setTimeout(() => {
      const foundProduct = productsData.find(p => p.id === productId); // Ищем продукт

      if (foundProduct) {
        setProduct(foundProduct); // Если продукт найден, обновляем состояние product
      } else {
        setError(true); // Если продукт не найден, устанавливаем состояние ошибки
      }
      setLoading(false); // Загрузка завершена, устанавливаем loading в false
    }, 800); // Имитация задержки в 800 миллисекунд (0.8 секунды)

    // Функция очистки (cleanup function): выполняется при "размонтировании" компонента
    // или перед следующим запуском эффекта. Важно для очистки таймеров, подписок и т.д.
    return () => clearTimeout(timer); // Очищаем таймер, чтобы избежать проблем
  }, [productId]); // Массив зависимостей: эффект запускается при первом рендере и при изменении productId

  // --- ОБРАБОТКА СОСТОЯНИЙ (loading, error, product) ---
  if (loading) {
    return (
      <div className="not-found-message"> {/* Используем тот же класс для центрирования текста */}
        <h2>Загрузка товара...</h2>
      </div>
    );
  }

  if (error || !product) { // Если была ошибка или продукт не найден (после загрузки)
    return (
      <div className="not-found-message">
        <h1>Товар не найден</h1>
        <p>Извините, мы не смогли найти товар с таким ID.</p>
      </div>
    );
  }

  // --- ЕСЛИ ВСЁ ОК, ТО РЕНДЕРИМ ДЕТАЛИ ПРОДУКТА ---
  return (
    <div className="product-detail-container">
      <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p><strong>Категория:</strong> {product.category}</p>
        <p>{product.description}</p>
        <button className="add-to-cart-button">Добавить в корзину</button>
      </div>
    </div>
  );
}

export default ProductPage;