module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "plugin:vue/recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    "indent": ["error", 2],
    "comma-dangle": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "key-spacing": ["error", {
      "beforeColon": false,
      "afterColon": true
    }]
  }
};