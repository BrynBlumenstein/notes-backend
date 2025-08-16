import globals from 'globals';
import js from '@eslint/js';

export default [
	js.configs.recommended,
	{
		files: ['**/*.js'],
		languageOptions: {
			sourceType: 'commonjs',
			globals: { ...globals.node },
			ecmaVersion: 'latest'
		},
		rules: {
			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			eqeqeq: 'error',
			'no-trailing-spaces': 'error',
			'object-curly-spacing': ['error', 'always'],
			'arrow-spacing': ['error', { before: true, after: true }],
			'no-console': 'off',
			'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]
		}
	},
	{
		ignorePatterns: ['dist/**']
	}
];
