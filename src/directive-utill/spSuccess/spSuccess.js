/*
* 审核通过组件
*/
import template from './spSuccess.html'

export default [function(){
    return {
        restrict: 'E',
        replace: true,
        template: template,
        scope:{  
            spSuccessData:'=',  //审批人对象
            spSuccessSureClick: "&"    //列表选择事件
        },  
        link:function(scope, element, attr){
            scope.closeDialog = function(){
                scope.spSuccessData.spSuccessStatus = false;                
            }
        }
    };
}]