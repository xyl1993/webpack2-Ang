require('./sideTool.scss');

import template from './sideTool.html'

export default ['$timeout',function($timeout){
    return {
        restrict: 'AE',
        template: template,
        link:function(scope, element, attr){
            $(element).click(function(){
                $('html,body').animate({scrollTop:0}, 700);//定位到该位置
            });
            scope.ifSide = false;
            //开启tooltip控件
            $timeout.cancel(startTooltip);
            var startTooltip = $timeout(function () {
                $("[data-toggle='tooltip']").tooltip();
            }, 500)
            $(window).unbind('scroll').scroll(function(){
                if($(window).scrollTop()>600){
                    scope.$apply(function(){
                        scope.ifSide = true;
                    })
                }else{
                    scope.$apply(function(){
                        scope.ifSide = false;
                    })
                }
            });
        }
    };
}]
