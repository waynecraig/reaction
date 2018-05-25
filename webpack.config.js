const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    mode: 'none',

    entry: './app.js',

    output: {
        path: __dirname + '/dist',
        filename: 'main.js',
        sourceMapFilename: 'main.map'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        }
      ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'containers/template.html',
            filename: "./index.html"
        })
   ],

    devtool: 'source-map',

}
