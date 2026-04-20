import { renderHook, act } from '@testing-library/react';
import { useContext } from 'react';
import { CartProvider, CartContext } from './CartContext';
import { expect, test } from 'vitest';

test('должен правильно добавлять товар в корзину', () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
  const { result } = renderHook(() => useContext(CartContext), { wrapper });

  act(() => {
    result.current.addToCart({ id: 1, price: 100, title: 'Гитара' });
  });

  //  [Check that there's 1 item in the cart]
  expect(result.current.cartItems.length).toBe(1);
  expect(result.current.cartItems[0].quantity).toBe(1);
});