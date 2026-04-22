import js from '@eslint/js';
import globals from 'globals';
import nodePlugin from 'eslint-plugin-n';

const nodeRules = nodePlugin.configs['flat/recommended'].rules;

export default [{
  ignores: [
    'cjs/**',
    'coverage/**',
    'node_modules/**',
    '**/tmp/**'
  ]
}, {
  plugins: { n: nodePlugin },
  files: [
    'lib/**',
    '__test_package__/*.mjs'
  ],
  languageOptions: {
    globals: {
      ...globals.node
    }
  },
  rules: {
    ...js.configs.recommended.rules,
    ...nodeRules
  }
}, {
  plugins: { n: nodePlugin },
  files: [
    '__test_package__/*.{js,cjs}'
  ],
  ...js.configs.recommended,
  languageOptions: {
    sourceType: 'commonjs',
    globals: {
      ...globals.node
    }
  },
  rules: {
    ...js.configs.recommended.rules,
    ...nodeRules
  }
}, {
  plugins: { n: nodePlugin },
  files: [
    '__tests__/**'
  ],
  languageOptions: {
    globals: {
      ...globals.node
    }
  },
  rules: {
    ...js.configs.recommended.rules,
    ...nodeRules
  }
}]