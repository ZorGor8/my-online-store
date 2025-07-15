// src/pages/HomePage.jsx
import React, { useState } from 'react'; // Добавили useState
import { Link } from 'react-router-dom';
import './HomePage.css'; // Убедитесь, что у вас есть этот файл стилей

function HomePage() {
  const [email, setEmail] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState(''); // Для сообщений после отправки

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)

    // Простая валидация
    if (!email) {
      setSubmissionMessage('Пожалуйста, введите ваш Email.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setSubmissionMessage('Пожалуйста, введите корректный Email.');
      return;
    }

    // Здесь можно было бы отправить данные на сервер
    console.log('Подписка на Email:', email);
    setSubmissionMessage(`Спасибо за подписку, ${email}!`);
    setEmail(''); // Очищаем поле ввода
  };

  return (
    <div className="home-page-container">
      <h1>Добро пожаловать в наш Магазин!</h1>
      <p>Откройте для себя новейшие гаджеты и электронику.</p>

      <Link to="/catalog" className="cta-button">
        Перейти в Каталог
      </Link>

      <section className="newsletter-signup">
        <h2>Подпишитесь на нашу рассылку!</h2>
        <p>Получайте эксклюзивные предложения и последние новости.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email-signup">Ваш Email:</label>
            <input
              type="email"
              id="email-signup"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите ваш Email"
              required
              // Атрибуты доступности (ARIA)
              aria-label="Ваш адрес электронной почты для подписки"
              aria-required="true" // Указывает, что поле обязательно для заполнения
              aria-describedby="email-help-text" // Связывает поле с описательным текстом
            />
            <small id="email-help-text" className="help-text">
              Мы никогда не передадим ваш Email третьим лицам.
            </small>
          </div>
          <button type="submit" className="submit-button">Подписаться</button>
        </form>
        {submissionMessage && (
          <p
            className={`submission-message ${submissionMessage.includes('Спасибо') ? 'success' : 'error'}`}
            role="alert" // Роль alert сообщает скринридерам о важном сообщении
            aria-live="polite" // Указывает, что содержимое этого элемента может изменяться и должно быть объявлено скринридерами
          >
            {submissionMessage}
          </p>
        )}
      </section>
    </div>
  );
}

export default HomePage;