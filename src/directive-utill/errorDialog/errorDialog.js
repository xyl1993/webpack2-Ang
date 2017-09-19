import template from './errorDialog.html'

export default [function(){
    return {
        restrict: 'AE',
        template: template,
        scope:{  
            errInfoData:'='
        },  
        link:function(scope, element, attr){
            scope.dialogReturnClick = function(){
                scope.errInfoData.status = false;
            }    
        }
    };
}]
