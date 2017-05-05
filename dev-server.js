/**
 * Created by xyl on 2017/5/2.
 */
var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

config.entry.build.unshift("webpack-dev-server/client?http://localhost:3000/","webpack/hot/dev-server");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    hot:true,
  	host: 'localhost',
    stats: {
        colors: true,
        chunks: false
    }
});
server.listen(3000);