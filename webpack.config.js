const path = require('path');

module.exports = {

    entry: './src/app.js',
    
    output: {
        path: path.resolve(__dirname),
        filename: 'main.js'
    },

    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' }
        ]
    },

    mode: 'development'

}