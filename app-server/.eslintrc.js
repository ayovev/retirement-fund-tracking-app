module.exports = {
  "extends": [
    "google"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
  },
  "rules": {
    "brace-style": ["error", "stroustrup"],
    "comma-dangle": ["warn", "never"],
    "curly": ["error", "all"],
    "indent": ["error", 2],
    "jsx-quotes": ["error", "prefer-double"],
    "linebreak-style": ["error", "unix"],
    "max-len": ["warn"],
    "no-console": ["off"],
    "object-curly-spacing": ["error", "always"],
    "prefer-const": ["warn"],
    "quotes": ["error", "backtick"],
    "require-jsdoc": ["off"],
    "semi": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "new-cap": ["off"]
  }
};
