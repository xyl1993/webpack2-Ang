/*
* 审批人选择组件
*/
import template from './approval.html'

export default [function(){
    return {
        restrict: 'E',
        replace: true,
        template: template,
        scope:{  
            approvalData:'=',  //审批人对象
            approvalSureClick: "&"    //确定事件
        },  
        link:function(scope, element, attr){
            scope.closeDialog = function(){
                scope.approvalData.approvalStatus = false;
            }
        }
    };
}]

