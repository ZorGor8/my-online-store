import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';


function CartPage() {
   
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  //  [Calculating total order price]
 const totalPrice = cartItems.reduce((sum, item) => {
  //  [Checking if price exists before calculating]
  const price = Number(item.price) || 0;
  const quantity = Number(item.quantity) || 0;
  return sum + (price * quantity);
}, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Твоя корзина пуста 🛒</h2>
        <Link to="/products" className="homepage-button">Перейти в каталог</Link>
       
      </div>
    );
  }

  return (
    
    <div className="cart-page">
      <h1>Ваша корзина</h1>
      <div className="cart-container">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>Цена: ${item.price}</p>
              <div className="quantity-controls">
                {/* [We will add + and - buttons here later] */}
                <span>Количество: {item.quantity}</span>
              </div>
            </div>
            <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Итого: ${totalPrice.toFixed(2)}</h2>
       <Link to="/checkout" className="checkout-button">
  Оформить заказ
</Link>
        <button onClick={clearCart} className="clear-cart">Очистить всё</button>
      </div>
    </div>
  );
}

export default CartPage;