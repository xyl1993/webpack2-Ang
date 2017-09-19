require('./codeDialog.scss');
import template from './codeDialog.html'
export default [function () {
    return {
        restrict: 'AE',
        template: template,
        scope: {
        },
        link: function (scope, element, attr) {
            scope.downloadFont = "客户端"
            scope.downloadIcon = true;
            scope.download = function (data) {
                if (data == 0) {
                    scope.downloadStatus = false;
                    scope.downloadIcon = true;
                    scope.downloadFont = "客户端"
                } else if (data == 1) {
                    scope.downloadStatus = true;
                    scope.downloadIcon = false;
                    scope.downloadFont = "下载"
                } else {
                    window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.jsruyun.yunzhujia")
                }
            }
            scope.weixin = function (data) {
                if (data == 0) {
                    scope.weixinStatus = false;
                } else {
                    scope.weixinStatus = true;
                }
            }
            // $(window).scroll(function () {
            //     if ($(window).scrollTop() >= 400) {
            //         $(".code_dialog").stop().animate({ bottom: "350px" },"100");
            //         $(".phone_app").css("bottom", "350px");
            //         $(".code_div").css("bottom", "292px");
            //     }
            //     else {
            //         $(".code_dialog").stop().animate({ bottom: "100px" },"100");
            //         $(".phone_app").css("bottom", "100px");
            //         $(".code_div").css("bottom", "40px");
            //     }
            // });
            scope.toGame = function(){
                location.href="http://www.yunzhujia.cn/game/index.html"
            }

        }
    };
}]