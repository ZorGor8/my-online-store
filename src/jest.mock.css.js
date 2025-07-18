// jest.mock.css.js
// Это более общий мок для CSS Modules, но для обычного CSS тоже подходит
module.exports = new Proxy(
  {},
  {
    get: function getter(target, key) {
      if (key === '__esModule') {
        return true;
      }
      return key;
    },
  }
);
