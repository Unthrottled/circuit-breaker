var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
        'app': './angular4/main.ts',
        'vendor': './angular4/vendor.ts',
        'polyfills': './angular4/polyfills.ts'

    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {configFileName: path.resolve(__dirname, 'angular4', 'tsconfig.json')}
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: [/node_modules/, /build/, /dist/, /angular-project/, /src/, /gradle/]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]',
                exclude: [/node_modules/, /build/, /dist/, /angular-project/, /src/, /gradle/]
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/, /build/, /dist/, /angular-project/, /src/, /gradle/],
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })

            }
        ]
    },
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            mangle: {
                keep_fnames: true
            }
        }),

        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.resolve(__dirname, 'angular4'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'angular4/index.html',
            inject: 'head'
        }),
        new CleanWebpackPlugin(['dist', 'build'], {
            root: path.resolve(__dirname),
            verbose: true,
            dry: false,
            exclude: ['shared.js']
        }),
        new ExtractTextPlugin('styles.css'),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./dist directory is being served
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] }
        })

    ]
};