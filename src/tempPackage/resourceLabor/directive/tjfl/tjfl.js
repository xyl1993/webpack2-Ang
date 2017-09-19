/*
* 添加福利组件
*/
import template from './tjfl.html'

export default [function(){
    return {
        restrict: 'E',
        replace: true,
        template: template,
        scope:{  
            tjflData:'=',  //福利对象
            tjflSureClick: "&",    //确定事件
            tjflCancelClick: "&", //取消事件
            selectSrbq:"&" //选择私人标签
        },  
        link:function(scope, element, attr){
            scope.closeDialog = function(){
                scope.tjflData.tjflStatus = false;                
            }
        }
    };
}]