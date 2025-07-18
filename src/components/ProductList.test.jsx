// src/components/ProductList.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, useSearchParams } from 'react-router-dom';

// Импортируем компонент, который будем тестировать
import ProductList from './ProductList';

// Мокаем products.json
jest.mock('../data/products.json', () => [
  { id: 1, title: 'Смартфон X', price: 500, category: 'Электроника', image: 'img1.jpg', description: 'desc1' },
  { id: 2, title: 'Ноутбук Pro', price: 1200, category: 'Электроника', image: 'img2.jpg', description: 'desc2' },
  { id: 3, title: 'Наушники TWS', price: 100, category: 'Аудио', image: 'img3.jpg', description: 'desc3' },
  { id: 4, title: 'Клавиатура Механическая', price: 150, category: 'Компьютеры', image: 'img4.jpg', description: 'desc4' },
  { id: 5, title: 'Игровая мышь', price: 70, category: 'Компьютеры', image: 'img5.jpg', description: 'desc5' },
]);

// Мокаем Link из react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useSearchParams: jest.fn(), // Оставляем это как jest.fn(), будем мокать в beforeEach
}));

// Мокаем ProductCard
jest.mock('./ProductCard', () => {
  return jest.fn(({ product, onToggleFavorite, isInitiallyFavorite, onAddToCart }) => (
    <div data-testid={`product-card-${product.id}`}>
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <button onClick={() => onToggleFavorite(product.id, !isInitiallyFavorite)}>
        {isInitiallyFavorite ? `★ В избранном ${product.id}` : `☆ Добавить в избранное ${product.id}`}
      </button>
      <button onClick={() => onAddToCart(product.title)}>
        Добавить в корзину {product.title}
      </button>
      <a href={`/products/${product.id}`}>Подробнее</a>
    </div>
  ));
});

// Мокаем Modal
jest.mock('./Modal', () => {
  return jest.fn(({ isOpen, onClose, title, children }) =>
    isOpen ? (
      <div data-testid="modal">
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>Закрыть модальное окно</button>
      </div>
    ) : null
  );
});


describe('ProductList', () => {
  let mockSetSearchParams = jest.fn();

  beforeEach(() => {
    mockSetSearchParams = jest.fn();
    // Мокаем useSearchParams, чтобы он возвращал реальный URLSearchParams
    // для queryParams и наш мок для setSearchParams.
    // Это позволяет компоненту использовать методы URLSearchParams (get, set и т.д.)
    // и при этом контролировать вызовы setSearchParams.
    jest.spyOn(require('react-router-dom'), 'useSearchParams').mockImplementation(() => {
      // Создаем новый URLSearchParams для каждого теста, чтобы он был чистым
      return [new URLSearchParams(), mockSetSearchParams];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should render the main heading', () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: /наш каталог продуктов/i })).toBeInTheDocument();
  });

  test('should render all products by default', () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-4')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-5')).toBeInTheDocument();
  });

  test('should render category buttons', () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /все/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /электроника/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /аудио/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /компьютеры/i })).toBeInTheDocument();
  });

  test('should render search input', () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/поиск по названию или категории.../i)).toBeInTheDocument();
  });

  test('should render reset filters button', () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /сбросить фильтры/i })).toBeInTheDocument();
  });

  test('should call setSearchParams with correct category when a category button is clicked', async () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    const electronicsButton = screen.getByRole('button', { name: /электроника/i });
    fireEvent.click(electronicsButton);

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
      const searchParamsArg = mockSetSearchParams.mock.calls[0][0];
      // Проверяем, что аргумент является экземпляром URLSearchParams
      // и что он содержит параметр 'category' со значением 'Электроника'
      expect(searchParamsArg).toBeInstanceOf(URLSearchParams);
      expect(searchParamsArg.get('category')).toBe('Электроника');
    });
  });

  test('should display only products of the selected category when category param is present in URL', () => {
    const initialSearchParams = new URLSearchParams();
    initialSearchParams.set('category', 'Электроника');

    jest.spyOn(require('react-router-dom'), 'useSearchParams').mockImplementation(() => {
      return [initialSearchParams, mockSetSearchParams];
    });

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();

    expect(screen.queryByTestId('product-card-3')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-card-4')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-card-5')).not.toBeInTheDocument();
  });

  // ИСПРАВЛЕННЫЙ ТЕСТ: Проверка сброса фильтров
  test('should reset filters and show all products when "Сбросить фильтры" button is clicked', async () => {
    const initialSearchParams = new URLSearchParams();
    initialSearchParams.set('category', 'Электроника');
    initialSearchParams.set('search', 'Pro');

    jest.spyOn(require('react-router-dom'), 'useSearchParams').mockImplementation(() => {
      return [initialSearchParams, mockSetSearchParams];
    });

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('product-card-3')).not.toBeInTheDocument();

    const resetButton = screen.getByRole('button', { name: /сбросить фильтры/i });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
      const calledWithParams = mockSetSearchParams.mock.calls[0][0];

      // *** Ключевое изменение здесь: ***
      // Вместо проверки Array.from(calledWithParams.entries()),
      // мы проверяем, что аргумент является пустым объектом.
      // Это потому, что react-router-dom ожидает пустой объект для сброса.
      expect(calledWithParams).toEqual({}); // Ожидаем, что setSearchParams был вызван с пустым объектом
    });
  });

  test('should show all products when no category or search params are present in URL after reset', () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-4')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-5')).toBeInTheDocument();
  });
});