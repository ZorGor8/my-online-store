// src/setupTests.js
// Этот файл автоматически загружается Jest перед каждым тестовым файлом.
// Здесь настраивается глобальная тестовая среда.

// 1. Импорт для @testing-library/jest-dom
// Предоставляет расширенные матчеры для Jest, которые позволяют делать утверждения о DOM.
// Например, expect(element).toBeInTheDocument();
import '@testing-library/jest-dom';


// 2. Полифиллы для TextEncoder и TextDecoder
// Jest запускается в среде Node.js, где глобальные объекты TextEncoder и TextDecoder
// могут отсутствовать по умолчанию, но они часто требуются современными
// JavaScript-библиотеками, включая некоторые части React, Webpack или
// react-router-dom при работе с определенными API.
// Модуль 'util' в Node.js предоставляет эти классы.
import { TextEncoder, TextDecoder } from 'util';

// Проверяем, существуют ли TextEncoder/TextDecoder в глобальной области видимости,
// и если нет, добавляем их. Это предотвращает перезапись, если они уже есть
// (например, в более новых версиях Node.js или с другими полифиллами).
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}


// 3. Моки для специфичных для браузера API (потенциальные проблемы)
// Jest — это среда Node.js, у которой нет всех браузерных API.
// Некоторые библиотеки могут попытаться использовать их, что приведет к ошибкам.
// Моки позволяют "заглушить" эти вызовы.

// Если вы столкнетесь с ошибками, связанными с "URL.createObjectURL is not a function",
// или "URL.revokeObjectURL is not a function", раскомментируйте следующие строки.
// Эти API используются, например, для работы с файлами, Blob, MediaSource.
// global.URL.createObjectURL = jest.fn(() => 'mock-object-url');
// global.URL.revokeObjectURL = jest.fn();

// Если вы используете что-то вроде window.matchMedia (для responsive design, CSS media queries),
// Jest будет ругаться. Этот мок решает проблему.
// const mockMatchMedia = (query) => ({
//   matches: false, // Измените на true, если вам нужно имитировать совпадение
//   media: query,
//   onchange: null,
//   addListener: jest.fn(), // deprecated
//   removeListener: jest.fn(), // deprecated
//   addEventListener: jest.fn(),
//   removeEventListener: jest.fn(),
//   dispatchEvent: jest.fn(),
// });
// global.matchMedia = global.matchMedia || mockMatchMedia;

// Мок для IntersectionObserver, часто используемого для lazy loading или отслеживания видимости элементов.
// Если в вашем проекте есть IntersectionObserver (например, из библиотеки или напрямую),
// раскомментируйте этот мок.
// global.IntersectionObserver = jest.fn(() => ({
//   observe: jest.fn(),
//   unobserve: jest.fn(),
//   disconnect: jest.fn(),
// }));

// Мок для requestAnimationFrame/cancelAnimationFrame
// Используется для анимаций. Jest может выдать предупреждения или ошибки, если они не заmocked.
// global.requestAnimationFrame = jest.fn(callback => setTimeout(callback, 0));
// global.cancelAnimationFrame = jest.fn(id => clearTimeout(id));

// 4. Очистка после каждого теста (опционально, но хорошая практика)
// Хотя @testing-library/react обычно очищает DOM автоматически,
// можно явно убедиться, что DOM очищается после каждого теста,
// если вы делаете что-то вне @testing-library/react.
// Например, если вы вручную добавляете элементы в document.body.
// import { cleanup } from '@testing-library/react';
// afterEach(() => {
//   cleanup();
// });