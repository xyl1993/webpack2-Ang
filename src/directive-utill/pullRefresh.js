/*
* 滚动条事件
*/
export default [function(){
    return {
        link:function(scope, element, attr){
            var raw = element[0];  
            element.bind('scroll', function() {  
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {  
                    scope.$apply(attr.whenScrolled);  
                }  
            });  
        }
    }
}]

