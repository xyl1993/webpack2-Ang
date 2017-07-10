/*
* 抄送人选择组件
*/
import template from './cc.html'

export default [function(){
    return {
        restrict: 'E',
        replace: true,
        template: template,
        scope:{  
            ccData:'=',  //审批人对象
            ccSureClick: "&"    //列表选择事件
        },  
        link:function(scope, element, attr){
            scope.closeDialog = function(){
                for(var i = 0 ;i < scope.ccData.ccList.length ;i++)
                     scope.ccData.ccList[i].selStatus = false;
                scope.ccData.ccStatus = false;
            }
        }
    };
}]