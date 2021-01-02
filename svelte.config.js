const sveltePreprocess = require('svelte-preprocess')
const postcss = require('./postcss.config')

const defaults = {
    style: 'postcss',
}

module.exports = {
    preprocess: [sveltePreprocess({ defaults, postcss })],
}