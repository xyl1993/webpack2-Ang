import template from './template.html';
export default ['$state',function($state){
    return {
        restrict: 'AE',
        template : template,
        replace: true,
        link:function(scope,element,iAttrs){
            let current;
            scope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState) {
                    current = $state.current.url;
                    scope.navText = {
                        '/flowGzhbList':'工作汇报',
                        '/flowApproval':'事物审批',
                        '/flowWjxxqf':'文件消息签发',
                        '/flowLeave':'请假',
                        '/flowBx':'报销',
                        '/flowCc':'出差',
                        '/flowYy':'用印',
                        '/flowBgyply':'办公用品领用',
                        '/flowCgsq':'采购申请',
                        '/flowZjsq':'资金申请',
                        '/flowZsjy':'证书借用',
                        '/data':'工作审批',
                        '/meeting':'微会议',
                        '/meetingEdit/:meetingId':'微会议',
                        '/meetingStatistics/:meetingId':'微会议'
                    }[current]||false;
                })
            scope.toDefault = function(){
                if(current !== '/default'){
                    $('.workFlow_menu ul li.active').removeClass('active');
                    $state.go('main.workFlow.default');
                }
            }
        }
    };
}]