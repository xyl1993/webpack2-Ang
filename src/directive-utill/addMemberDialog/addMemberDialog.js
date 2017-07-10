/*
* 添加团队成员组件
*/
import template from './addMemberDialog.html'

export default [function(){
    return {
        restrict: 'E',
        replace: true,
        template: template,
        scope:{  
            formData:'=',  //form对象
            formClick: "&"    //确定按钮事件
        },  
        link:function(scope, element, attr){
            scope.closeDialog = function(){
                scope.formData.teamMemberStatus = false;
            }
        }
    };
}]