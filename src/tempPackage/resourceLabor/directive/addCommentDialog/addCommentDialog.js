import template from './addCommentDialog.html'
export default [function () {
    return {
        restrict: 'E',
        replace: true,
        template: template,
        scope: {
            addCommentData: '=',  //form对象
            addCommentSureClick: "&"    //确定按钮事件
        },
        link: function (scope, element, attr) {
            scope.closeDialog = function () {
                scope.addCommentData.addCommentStatus = false;
            }
            scope.updateStar = function (starId) {
                scope.type=starId;
                scope.addCommentData.score=starId;
            }
        }
    };
}]