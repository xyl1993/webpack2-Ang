import template from './index.html';
export default ['$state',function($state){
    return {
        restrict: 'AE',
        template : template,
        replace: true,
        link:function(scope,element,iAttrs){
            let current;
            let serState = /\/laborMaybeLike|\/laborFindPeople|\/laborFindJob|\/myFabu|\/myShouCang/;
            scope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState) {
                    current = $state.current.url;
                    scope.navText = {
                        '/flowGzhbList':'工作汇报',
                        '/laborGffb':'供方发布',
                        '/laborYgfb':'发布用工',
                        '/laborFbzxq':'发布者详情',
                        '/laborfbxq/:id':'发布详情',
                        // '/info':false,
                        '/auther':'资质认证',
                        '/info':'消息通知'
                        // '/laborMaybeLike':false,
                        // '/laborFindPeople':false,
                        // '/laborFindJob':false
                    }[current]||false;
                });
            scope.toDefault = function(){
                if(!serState.test(current)){
                    $state.go('main.labor.index.laborMaybeLike');
                }
            }
        }
    };
}]