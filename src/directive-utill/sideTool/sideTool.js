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
            $(window).scroll(function(){
                if($(window).scrollTop()>600){
                    scope.$apply(function(){
                        scope.ifSide = true;
                    })
                }else{
                    scope.$apply(function(){
                        scope.ifSide = false;
                    })
                }
                let range = 50;             //距下边界长度/单位px 
                let elemt = 500;           //插入元素高度/单位px  
                let maxnum = 2;            //设置加载最多次数  
                let totalheight = 0;
                let srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
                totalheight = parseFloat($(window).height()) + parseFloat(srollPos);  
                if(($(document).height()-range) <= totalheight){
                    scope.$apply(attr.loadMoreDynmic);
                }
            });
        }
    };
}]
