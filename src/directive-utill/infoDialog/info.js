/*
* 审批人选择组件
*/
import template from './info.html'

export default [function(){
    return {
        restrict: 'E',
        replace: true,
        template: template,
        scope:{  
            infoData:'=',  //消息内容
            infoSureClick: "&"    //确定事件
        },  
        link:function(scope, element, attr){
            scope.closeDialog = function(){
                scope.infoData.status = false;
            }
        }
    };
}]

