/*
* 自定义下拉框
*/
require('./chosen.scss');
import template from './chosen.html'

export default [function(){
    return {
        restrict: 'E',
        replace: true,
        template: template,
        scope:{  
            typeList:'=',  //类型集合  
            selName:'=',   //选中的类型的值
            emptyObj:'=',  //默认的空对象
            typeSureClick: "&"    //列表选择事件
        },  
        link:function(scope, element, attr){
            scope.activeStatus=false;
            $('body').bind('click',function(){
                scope.$apply(function(){
                    scope.activeStatus=false;
                })
            })
            $(element).bind('click',function(e){
                stopPropagation(e);
                scope.$apply(function(){
                    scope.activeStatus=!scope.activeStatus;
                })
            });
            function stopPropagation(e) {
                if (e.stopPropagation) 
                    e.stopPropagation();
                else 
                    e.cancelBubble = true;
            }
        }
    };
}]

