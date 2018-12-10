module.exports = {
    "extends": [
      "google",
      "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "plugins": ["react"],
    "settings": {
      "react": {
        "version": "16"
      }
    },
    "env": {
      "browser": true,
      "es6": true,
      "node": true
    },
    "parserOptions": {
      "ecmaVersion": 8,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true
      }
    },
    "rules": {
      "brace-style": ["error", "stroustrup"],
      "comma-dangle": ["warn", "never"],
      "curly": ["error", "all"],
      "indent": ["error", 2],
      "jsx-quotes": ["error", "prefer-double"],
      "linebreak-style": ["error", "unix"],
      "max-len": ["off"],
      "no-invalid-this": ["off"],
      "no-console": ["warn"],
      "object-curly-spacing": ["error", "always"],
      "quotes": ["error", "backtick"],
      "require-jsdoc": ["off"],
      "semi": ["error", "always"],
      "space-in-parens": ["error", "never"],

      "react/display-name": ["off"],

      // fix at some point
      "react/prop-types": ["off"],

      // "react/jsx-key": ["off"]
    }
};
