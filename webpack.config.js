const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const WATCH = !!process.env.watch;
const EXPLUGINS = process.env.compress ? [
    new DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }),
    new UglifyJsPlugin({compress:{warnings:false}})
] : [];


module.exports = {

    entry: './app.js',

    output: {
        path: './dist',
        filename: '[name].js',
        sourceMapFilename: '[name].map'
    },

    module: {
        loaders: [
			{
				test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=react,presets[]=es2015'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'containers/template.html'
        })
   ].concat(EXPLUGINS),

    devtool: 'source-map',

    watch: WATCH
}
