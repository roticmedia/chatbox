const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin')
const zlib = require('zlib')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'chatbox.js',
    },
    mode: 'production',
    plugins: [
        new CompressionPlugin({
            filename: "chatbox.br",
            algorithm: "brotliCompress",
            test: /\.(js|css|html|svg)$/,
            compressionOptions: {
                params: {
                    [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                },
            },
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false,
        }),
    ],
};