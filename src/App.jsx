import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductList from './components/ProductList'; // <-- ИМПОРТ ProductList
import ProductPage from './pages/ProductPage';
// import CatalogPage from './pages/CatalogPage'; // <-- ЗАКОММЕНТИРУЙТЕ ИЛИ УДАЛИТЕ ПОСЛЕ УСПЕХА
// import Footer from './components/Footer';

import './App.css';
import './index.css'; // Если index.css импортируется здесь, а не в main.jsx

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} /> {/* <-- ИСПОЛЬЗУЙТЕ ProductList ЗДЕСЬ */}
            <Route path="/products/:id" element={<ProductPage />} />
            {/* ...другие маршруты */}
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;