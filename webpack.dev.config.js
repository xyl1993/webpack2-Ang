var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var publicPath = 'http://localhost:3000/';
module.exports = {
    entry: {
        vendor: [
            './bower_components/angular/angular.min.js',
            './bower_components/angular-sanitize/angular-sanitize.min.js',
            './bower_components/angular-resource/angular-resource.min.js',
            './bower_components/angular-animate/angular-animate.min.js',
            './bower_components/angular-ui-router/angular-ui-router.min.js'
        ],
        build: ['./src/app.js'],
    },
    output: {
        path: path.resolve(ROOT_PATH, './dist'),
        publicPath: publicPath,
        filename: '[name].js',
        pathinfo:true        //开发环境
    },
    devServer: {
        historyApiFallback: true, //不跳转
        port: 3000,
        inline: true, //实时刷新
        stats: {
            // colors: true,
            chunks: false
        }
    },
    module: {
        rules: [
            //解析.css文件
            {
                test: /\.css$/, 
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader?sourceMap"         //加入sourceMap  开发模式用
                })
            },
            {
                test: /\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                    "css-loader?sourceMap",           //开发模式
                    "sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
                ]  
                })
            },
            //babel编译过程很耗时，好在babel-loader提供缓存编译结果选项，在重启webpack时不需要创新编译而是复用缓存结果减少编译流程。babel-loader缓存机制默认是关闭的，打开的配置如下：
            {
                test: /\.js$/,
                use:"babel-loader?cacheDirectory",
                exclude:path.resolve(__dirname, "node_modules"),
                include: path.resolve(__dirname, 'src')
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
                use:["html-withimg-loader"]
            }
        ]
    },
    // 开启source-map，webpack有多种source-map，在官网文档可以查到//cheap-module-eval-source-map
    devtool: 'eval',       //开发环境cheap-module-eval-source-map
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js', '.css'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {}
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
              context:__dirname,
              postcss: function () {
                return [autoprefixer, cssnext, precss, cssnano];
              },
              noParse: /node_modules\/(jquey|moment|chart\.js)/
            }
        }),
        new ExtractTextPlugin({
            filename:"style.css",
            disable:false,
            allChunks:true
        }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
        new webpack.optimize.CommonsChunkPlugin({name: 'mainifest', chunks: ['vendor']}),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'vendor',
        //     chunks:['vendor.js']
        // }),
        new webpack.optimize.UglifyJsPlugin({
            //这意味着如果你在压缩代码时启用了 source map，或者想要让 uglifyjs 的警告能够对应到正确的代码行，你需要将 UglifyJsPlugin 的 sourceMap 设为 true。
            compress: {
                warnings: false  //默认false
            },
            sourceMap:true
        }),
        new HtmlWebpackPlugin({
            template: 'html-withimg-loader!' + path.resolve(ROOT_PATH, 'index.html'),
            filename: 'index.html'
        })
    ]
}
