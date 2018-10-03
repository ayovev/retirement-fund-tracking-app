module.exports = {
    "extends": [
      "google",
      "plugin:react/recommended"
    ],
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
      "max-len": ["warn"],
      "no-console": ["warn"],
      "object-curly-spacing": ["error", "always"],
      "quotes": ["error", "backtick"],
      "require-jsdoc": ["off"],
      "semi": ["error", "always"],
      "space-in-parens": ["error", "never"],

      "react/display-name": ["off"]
    }
};
