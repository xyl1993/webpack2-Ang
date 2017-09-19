import template from './alert.html'

export default [function(){
    return {
        restrict: 'E',
        replace: true,
        template: template,
        scope:{  
            infoData:'='  //消息内容
        },  
        link:function(scope, element, attr){
            scope.closeDialog = function(){
                scope.infoData.status = false;
            }
        }
    };
}]

