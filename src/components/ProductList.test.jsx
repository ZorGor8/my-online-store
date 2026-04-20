import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductList from './ProductList';
import { expect, test, vi } from 'vitest';

// Создаем "фейковый" контекст [Creating a "fake" context]
const mockCartContext = {
  addToCart: vi.fn(), // Используем vi.fn() для Vite [Use vi.fn() for Vite]
  removeFromCart: vi.fn(),
  cartItems: []
};

test('при нажатии на кнопку "В корзину" открывается модальное окно', async () => {
  render(
    <BrowserRouter>
      <CartContext.Provider value={mockCartContext}>
        <ProductList />
      </CartContext.Provider>
    </BrowserRouter>
  );

  // Ждем появления кнопок после скелетонов [Wait for buttons to appear after skeletons]
  await waitFor(() => {
    const buttons = screen.getAllByText(/В корзину/i);
    expect(buttons.length).toBeGreaterThan(0);
  }, { timeout: 3000 });

  const buyButton = screen.getAllByText(/В корзину/i)[0];
  fireEvent.click(buyButton);
  
  // Проверяем текст уведомления [Check notification text]
  expect(screen.getByText(/добавлен в корзину/i)).toBeInTheDocument();
});