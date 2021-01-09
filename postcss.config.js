const cssnano = require('cssnano')({
    preset: ['default', { discardComments: { removeAll: true } }],
})

const mode = process.env.NODE_ENV
const dev = mode === 'development'

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('postcss-preset-env'),
        ...(!dev ? [cssnano] : []),
    ],
}
