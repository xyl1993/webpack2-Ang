import template from './complaintDiglog.html'
export default [function(){
    return {
        restrict: 'E',
        replace: true,
        template: template,
        scope:{  
            complaintData:'=',  //form对象
            complaintSureClick: "&"    //确定按钮事件
        },  
        link:function(scope, element, attr){
            scope.closeDialog = function(){
                scope.complaintData.complaintStatus = false;
            }
        }
    };
}]