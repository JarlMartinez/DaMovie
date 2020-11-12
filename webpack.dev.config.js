const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
        // host: '10.0.0.4', //IP local
        port: 8242,
        open: false,
        hot: true,
        //super importante para ReactRouter, al igual que 'publicpath' de más abajo
        historyApiFallback: true
    },
    output: {
        filename: 'app.bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new FaviconsWebpackPlugin('./src/assets/icono-del-rollo-de-película.png')
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(s*)css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]                
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/'
                    }
                }
            }
        ]
    }
}
