import React from 'react';
import { useParams } from 'react-router-dom'; // Импорт useParams

function ProductPage() {
  const { id } = useParams(); // Получаем параметр 'id' из URL

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Детали Продукта</h1>
      <p>
        Здесь будет отображаться информация о продукте с ID: <strong>{id}</strong>.
        <br />
        (Пока это просто заглушка, позже мы загрузим реальные данные)
      </p>
    </div>
  );
}

export default ProductPage;