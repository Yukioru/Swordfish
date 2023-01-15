const tailwindPlugin = require('prettier-plugin-tailwindcss');

module.exports = {
  plugins: [tailwindPlugin],
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  tabWidth: 2,
  trailingComma: 'es5',
};
