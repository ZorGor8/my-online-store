import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import './CheckoutPage.css';

function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Извлекаем данные из формы для проверки [Extracting data for validation]
    const name = formData.get('name') || "";
    const phone = formData.get('phone') || "";
    const address = formData.get('address') || "";

    let newErrors = {};

    // Валидация [Validation logic]
    if (name.trim().length < 2) {
      newErrors.name = "Имя слишком короткое";
    }

    const phoneRegex = /^\+?(\d[\s-]?){10,12}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      newErrors.phone = "Введите корректный номер (минимум 10 цифр)";
    }

    if (address.trim().length < 10) {
      newErrors.address = "Напишите более подробный адрес (минимум 10 символов)";
    }

    // Если есть ошибки — показываем их и прерываем отправку [If errors, show them and stop]
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Если всё хорошо — имитируем отправку [If all good - simulate success]
    console.log("Заказ успешно сформирован для:", name);
    setErrors({});
    setIsOrderPlaced(true);
    clearCart();
  };

  if (isOrderPlaced) {
    return (
      <div className="checkout-container">
        <div className="success-message">
          <h2>🎉 Спасибо за заказ!</h2>
          <p>Ваша заявка принята. Мы свяжемся с вами в ближайшее время.</p>
          <button onClick={() => window.location.href = '/'} className="back-home-button">
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Ваша корзина пуста 🛒</h2>
        <p>Добавьте товары в каталоге, чтобы оформить заказ.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Оформление заказа</h1>
      <div className="checkout-content">
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label>Имя</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Введите ваше имя" 
              className={errors.name ? 'input-error' : ''} 
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Телефон</label>
            <input 
              type="tel" 
              name="phone" 
              placeholder="+380..." 
              className={errors.phone ? 'input-error' : ''} 
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Адрес доставки</label>
            <textarea 
              name="address" 
              placeholder="Город, улица, дом..." 
              className={errors.address ? 'input-error' : ''} 
            ></textarea>
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          <button type="submit" className="place-order-button">
            Подтвердить заказ на ${totalPrice.toFixed(2)}
          </button>
        </form>

        <div className="order-summary">
          <h3>Ваш заказ:</h3>
          <div className="summary-list">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-info">
                  <span className="summary-item-title">{item.title}</span>
                  <span className="summary-item-qty">x {item.quantity}</span>
                </div>
                <span className="summary-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <hr />
          <div className="summary-total">
            <span>Итого к оплате:</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;