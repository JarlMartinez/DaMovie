const path = require('path')
const webpack = require('webpack')
const ImageMinPlugin = require('imagemin-webpack-plugin').default
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAsswtsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const WebpackPWAManifestPlugin = require('webpack-pwa-manifest')

module.exports = {
    mode: 'production',
    entry: {
        app: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAsswtsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, 'src'),
            manifest: require('./src/modules-manifest.json')
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist/']
        }),
        new HtmlWebpackPlugin({
            template:  path.resolve(__dirname, 'src/index.html')
        }),
        new MiniCSSExtractPlugin({
            filename: 'styles/[name].[hash].css'
        }),
        new WebpackPWAManifestPlugin({
            name: 'DaMovie || ¿Qué película verás?.',
            shortname: 'DaMovie',
            description: 'DaMovie sirve de referencia para elegir peliculas. DaMovie es impulsada por The Movie DB.',
            background_color: '#343434',
            theme_color: '#343434',
            icons : [
                {
                    src: path.resolve('src/assets/icono-del-rollo-de-película.png'),
                    sizes: [96, 128, 192, 256, 384, 512]                    
                }
            ]
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            runtimeCaching: [
                {
                    urlPattern: new RegExp('https://damovie.jarlmartinez.now.sh'),
                    handler: 'NetworkFirst',
                    options: {
                        cacheName:'api'
                    }
                }
            ]
        }),
        // Nota que imageMin plugin debe estar dsps de todos los plugins que trabajen con imagenes, yo lo pongo al final por combeniencia
        new ImageMinPlugin({
            pngquant: {
                quality: '95-100'
            }
        })
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
                    {
                        loader: MiniCSSExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        // si el archivo es mas pesado, va a llamar a file-loader como fallback
                        name: '[name].[hash].[ext]',
                        outputPath: 'assets/images'
                    }
                }
            }
        ]
    }
}
