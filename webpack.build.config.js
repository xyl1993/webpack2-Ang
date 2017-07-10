var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);

var publicPath = './';
module.exports = {
    entry: {
        vendor: [
            './bower_components/angular/angular.min.js',
            './bower_components/angular-sanitize/angular-sanitize.min.js',
            './bower_components/angular-resource/angular-resource.min.js',
            './bower_components/angular-animate/angular-animate.min.js',
            './bower_components/angular-ui-router/angular-ui-router.min.js',
            './bower_components/w5c-validator/w5cValidator.js',
            './bower_components/angular-image-404/dist/angular-image-404.min.js',
            './bower_components/angular-md5/angular-md5.js',
            './bower_components/angular-cookies/angular-cookies.js'
        ],
        build: ['./src/app.js'],
    },
    output: {
        path: path.resolve(ROOT_PATH, './dist'),
        publicPath:publicPath,                        //用于单独打包放到第三方平台时用
        filename: '[name]_[chunkhash].js'
    },
    module: {
        rules: [
            //解析.css文件
            {
                test: /\.css$/, 
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader?minimize"         
                })
            },
            {
                test: /\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        "css-loader?minimize",           
                        "sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
                    ]   
                })
            },
            {
                test: /\.js$/,
                use:["babel-loader"],
                exclude:path.resolve(__dirname, "node_modules")
            },
            {   
                test: /\.(png|jpg|gif)$/,
                use:["url-loader?limit=8192&name=images/[hash:8].[name].[ext]"]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                use:["url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]"]
            },
            {
                test: /\.html$/,
                use:["html-withimg-loader?minimize"]
            }
        ]
    },
    // 开启source-map，webpack有多种source-map，在官网文档可以查到//cheap-module-source-map
    devtool: 'cheap-module-source-map',      
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js', '.css'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {}
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
        new webpack.optimize.CommonsChunkPlugin({name: 'mainifest', chunks: ['vendor']}),
        new ExtractTextPlugin({
            filename:"[name]_[chunkhash].css",
            disable:false,
            allChunks:true
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false  //默认false
        //     }
        // }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
              // 在UglifyJs删除没有用到的代码时不输出警告  
              warnings: false,
              // 删除所有的 `console` 语句
              // 还可以兼容ie浏览器
              drop_console: true,
              // 内嵌定义了但是只用到一次的变量
              collapse_vars: true,
              // 提取出出现多次但是没有定义成变量去引用的静态值
              reduce_vars: true,
            }
        }),
        new HtmlWebpackPlugin({
            template: 'html-withimg-loader!' + path.resolve(ROOT_PATH, 'index.html'),
            filename: 'index.html'
        })
    ]
}
