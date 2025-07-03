// src/App.jsx
import { useState } from 'react'; // Оставим useState на всякий случай, он пока не нужен
import ProductList from './components/ProductList'; // <--- Добавь эту строку

import './App.css'; // Оставим импорт стилей

function App() {

  return (
    <>
      {/* <App.css> и прочие элементы из шаблона можно удалить, если они есть */}
      {/* Мы просто отобразим ProductList */}
      <ProductList /> {/* <--- Добавь эту строку */}
    </>
  );
}

export default App;