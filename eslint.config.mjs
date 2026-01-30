export default [
    {
        extends: [
            '@nuxt/eslint'
        ],
        rules: {
            'no-console': 'off',
            'vue/multi-word-component-names': 'off',
        }
    },
    {
        files: ['**/*.ts', '**/*.vue'],
        rules: {
            'prettier/prettier': 'error',
        },
        plugins: {
            prettier: (await import('eslint-plugin-prettier')).default,
        },
    },
    (await import('eslint-config-prettier')).default,
]
