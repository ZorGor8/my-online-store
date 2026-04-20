
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [email, setEmail] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 

   
    if (!email) {
      setSubmissionMessage('Пожалуйста, введите ваш Email.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setSubmissionMessage('Пожалуйста, введите корректный Email.');
      return;
    }

  
    console.log('Подписка на Email:', email);
    setSubmissionMessage(`Спасибо за подписку, ${email}!`);
    setEmail(''); 
  };

  return (
    <div className="home-page-container">
      <h1 className="homepage-title">Добро пожаловать в наш Магазин!</h1>
      <p className="homepage-description">Откройте для себя новейшие гаджеты и электронику.</p>

      <Link to="/products" className="homepage-button">
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
           
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите ваш Email"
              className="newsletter-input"
              required
            
              aria-label="Ваш адрес электронной почты для подписки"
              aria-required="true" 
              aria-describedby="email-help-text" 
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
            role="alert" 
            aria-live="polite" 
          >
            {submissionMessage}
          </p>
        )}
      </section>
    </div>
  );
}

export default HomePage;