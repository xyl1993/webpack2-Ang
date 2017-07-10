/*
* 监听file 输入框chang事件
*/
export default [function(){
    return {
        restrict: 'AE',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
}]