// src/components/Modal.jsx
import React, { useEffect, useRef, useCallback } from 'react'; // Добавили useRef, useCallback
import './Modal.css';

function Modal({ isOpen, onClose, children, title }) {
  const modalContentRef = useRef(null); // Ссылка на div с содержимым модалки
  const previouslyFocusedElement = useRef(null); // Для хранения элемента, который был в фокусе до открытия модалки

  // Эффект для управления фокусом при открытии/закрытии модалки
  useEffect(() => {
    if (isOpen) {
      // Сохраняем элемент, который был в фокусе, чтобы вернуть фокус после закрытия
      previouslyFocusedElement.current = document.activeElement;

      // Устанавливаем фокус на сам контент модалки или на первый интерактивный элемент
      // setTimeout нужен, чтобы убедиться, что модалка полностью отрендерилась
      setTimeout(() => {
        if (modalContentRef.current) {
          // Ищем первый фокусируемый элемент внутри модалки
          const focusableElements = modalContentRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            focusableElements[0].focus(); // Фокусируемся на первом найденном элементе
          } else {
            // Если нет фокусируемых элементов, фокусируемся на самой модалке
            modalContentRef.current.focus();
          }
        }
      }, 0); // Небольшая задержка, чтобы гарантировать, что элемент существует в DOM
      document.body.style.overflow = 'hidden'; // Запрещаем прокрутку основного контента
    } else {
      // При закрытии модалки возвращаем фокус на ранее сфокусированный элемент
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
      document.body.style.overflow = ''; // Восстанавливаем прокрутку
    }

    // Очистка при размонтировании компонента или изменении isOpen
    return () => {
      document.body.style.overflow = ''; // Гарантируем восстановление прокрутки
    };
  }, [isOpen]); // Зависимости: эффект запускается при изменении isOpen

  // Эффект для обработки закрытия по клавише Escape и ловушки фокуса
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose(); // Закрываем модалку при нажатии Esc
    } else if (event.key === 'Tab' && isOpen && modalContentRef.current) {
      // Логика "ловушки фокуса"
      const focusableElements = modalContentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) { // Shift + Tab (движение назад)
        if (document.activeElement === firstElement || document.activeElement === modalContentRef.current) {
          lastElement.focus();
          event.preventDefault(); // Предотвращаем выход фокуса
        }
      } else { // Tab (движение вперед)
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault(); // Предотвращаем выход фокуса
        }
      }
    }
  }, [isOpen, onClose]); // Зависимости для useCallback

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]); // Зависимости для useEffect

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog" // ARIA роль для модального окна
      aria-modal="true" // Указывает, что модалка блокирует основной контент
      aria-labelledby="modal-title" // Связываем с заголовком модалки (если есть)
      aria-describedby="modal-description" // Связываем с основным контентом модалки (если есть)
    >
      <div
        className="modal-content"
        ref={modalContentRef} // Устанавливаем ссылку на этот div
        tabIndex="-1" // Делаем сам div фокусируемым программно (но не через Tab в обычном потоке)
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          {title && <h2 id="modal-title" className="modal-title">{title}</h2>} {/* Добавили id="modal-title" */}
          <button className="modal-close-button" onClick={onClose} aria-label="Закрыть модальное окно"> {/* ARIA-метка */}
            &times;
          </button>
        </div>
        <div id="modal-description" className="modal-body"> {/* Добавили id="modal-description" */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;