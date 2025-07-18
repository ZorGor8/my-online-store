// src/components/ProductCard/ProductCard.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ProductCard from './ProductCard';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));


describe('ProductCard', () => {

  const testProduct = {
    id: 1,
    title: 'Смартфон Pro X',
    price: 799.99,
    category: 'Электроника',
    image: 'https://via.placeholder.com/150',
    description: 'Мощный и стильный смартфон с отличной камерой.',
  };

  test('should render product name', () => {
    render(
      <ProductCard
        product={testProduct}
        // isInitiallyFavorite по умолчанию false, если не указано
        onToggleFavorite={() => {}}
        onAddToCart={() => {}}
      />
    );
    const productNameElement = screen.getByText(/Смартфон Pro X/i);
    expect(productNameElement).toBeInTheDocument();
  });

  test('should render product price', () => {
    render(
      <ProductCard
        product={testProduct}
        // isInitiallyFavorite по умолчанию false, если не указано
        onToggleFavorite={() => {}}
        onAddToCart={() => {}}
      />
    );
    const productPriceElement = screen.getByText(/\$799.99/i);
    expect(productPriceElement).toBeInTheDocument();
  });

  test('should render "Add to Favorites" button', () => {
    render(
      <ProductCard
        product={testProduct}
        isInitiallyFavorite={false} // Явно указываем, что не избран
        onToggleFavorite={() => {}}
        onAddToCart={() => {}}
      />
    );
    const addToFavoritesButton = screen.getByRole('button', { name: /добавить в избранное/i });
    expect(addToFavoritesButton).toBeInTheDocument();
  });

  test('should render "Add to Cart" button', () => {
    render(
      <ProductCard
        product={testProduct}
        // isInitiallyFavorite по умолчанию false, если не указано
        onToggleFavorite={() => {}}
        onAddToCart={() => {}}
      />
    );
    const addToCartButton = screen.getByRole('button', { name: /добавить в корзину/i });
    expect(addToCartButton).toBeInTheDocument();
  });

  // ИСПРАВЛЕНО: Теперь ищется элемент с ролью 'link' (ссылка), а не 'button'
  test('should render "Details" button', () => {
    render(
      <ProductCard
        product={testProduct}
        // isInitiallyFavorite по умолчанию false, если не указано
        onToggleFavorite={() => {}}
        onAddToCart={() => {}}
      />
    );
    const detailsLink = screen.getByRole('link', { name: /подробнее/i });
    expect(detailsLink).toBeInTheDocument();
  });

  // ИСПРАВЛЕНО: Используем isInitiallyFavorite={true} и ищем текст кнопки '★ В избранном'
  test('should render "★ В избранном" button if product is favorited', () => {
    const favoritedProduct = { ...testProduct, id: 1 };
    render(
      <ProductCard
        product={favoritedProduct}
        isInitiallyFavorite={true} // <--- ИЗМЕНЕНО: теперь используем isInitiallyFavorite
        onToggleFavorite={() => {}}
        onAddToCart={() => {}}
      />
    );
    // ИЗМЕНЕНО: текст кнопки соответствует '★ В избранном' из ProductCard.jsx
    const inFavoritesButton = screen.getByRole('button', { name: /★ В избранном/i });
    expect(inFavoritesButton).toBeInTheDocument();
  });

});