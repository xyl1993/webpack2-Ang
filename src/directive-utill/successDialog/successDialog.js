import template from './successDialog.html'

export default [function(){
    return {
        restrict: 'AE',
        template: template,
        scope:{  
            infoText:'=',  
            btnText:'=',
            dialogSureClick: "&"
        },  
        link:function(scope, element, attr){
            
        }
    };
}]
