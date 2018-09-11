module.exports = {
    "extends": [
      "google",
      "plugin:react/recommended"
    ],
    "plugins": ["react"],
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
      "comma-dangle": [1],
      "indent": [2,2],
      "linebreak-style": [2, "unix"],
      "quotes": [2, "backtick"],
      "semi": [2, "always"],
      "require-jsdoc": [0],
      "max-len": [1],
      "jsx-quotes": [2, "prefer-double"],
      "brace-style": [2, "stroustrup"],
      "no-console": [1],
      "curly": [2, "all"],
      "space-in-parens": [2, "never"],
      "object-curly-spacing": [2, "always"],

      "react/prop-types": [0],
      "react/display-name": [0]
    },
    "globals": {
      "react/props-types/history": false
    }

};
