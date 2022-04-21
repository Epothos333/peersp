module.exports = {
  'env': {
    'react-native/react-native': true,
  },
  'extends': '@react-native-community',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  'plugins': ['react', 'react-native'],
  'rules': {
    'no-trailing-spaces': 'warn',
    'object-curly-newline': 'warn',
    'prettier/prettier': 0,
    'react-native/no-inline-styles': 'off',
    'quotes': ['error', 'single'],
  },
};
