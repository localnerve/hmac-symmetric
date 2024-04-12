import js from '@eslint/js';
import globals from 'globals';
import jest from 'eslint-plugin-jest';

export default [{
  ignores: [
    'cjs/**',
    'coverage/**',
    'node_modules/**',
    '**/tmp/**'
  ]
}, {
  files: [
    'lib/**',
    '__test_package__/*.mjs'
  ],
  ...js.configs.recommended,
  languageOptions: {
    globals: {
      ...globals.node
    }
  }
}, {
  files: [
    '__test_package__/*.{js,cjs}'
  ],
  ...js.configs.recommended,
  languageOptions: {
    sourceType: 'commonjs',
    globals: {
      ...globals.node
    }
  }
}, {
  files: [
    '__tests__/**'
  ],
  ...jest.configs['flat/recommended']
}]