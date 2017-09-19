
export default ['$scope', '$http', '$stateParams', 'APPBASE', 'workFlowServ','$state','teamServ','accountServ',
    function ($scope, $http, $stateParams, APPBASE, workFlowServ,$state,teamServ,accountServ) {
        var pageSize = 10, currentPage = 1,memberPage = 1;
        $scope.teamId = $scope.currentTeam.id;
        var memberSize = 8;       //一次显示10条
        var memberStart = 0;      //团队成员显示第一页,一页10条.对应的索引是9
        var memberEnd = memberSize;
        $scope.$on('myTeamDataList', function (event, data) {
            $scope.teamList = data;
        })
        $scope.$on('selTeamFun', function (event, data) {
            $scope.teamId = data.id;
            memberPage = 1;
            memberSize = 8;
            memberStart = 0;
            getFlowTeamDetail($scope.teamId);
        })
        ; (function () {
            let token = sessionStorage.getItem('token');
            if(token){
                accountServ.findUserByTokenResource($http,APPBASE).then(function(res){
                    if(res.data.code === 0){
                        $scope.userData = res.data.data;
                    }
                })
            }
            workFlowServ.selectMessageInfo($http, APPBASE, currentPage, pageSize).then(function (res) {
                if (res.data.code === 0) {
                    $scope.messageInfoData = res.data.data;
                   
                }
            })
            if($scope.teamId){
                workFlowServ.getFlowTeamListAboutMeWeb($http, APPBASE).then(function (res) {
                    if (res.data.code === 0) {
                        $scope.teamList = res.data.data;
                    }
                })
                getFlowTeamDetail($scope.teamId);
            }
        }());
        /**
         * 团队设置
         */
        $scope.teamSet = function(){
            sessionStorage.teamId=$scope.teamId;
            $state.go('main.teamSet');
        }
        /**
         * 删除团队成员(退出团队)
         */
        $scope.delFlowTeamMember = function(userId,tel){
             $scope.infoData = {
                infoText:"是否确定退出团队",
                sureText:"确&nbsp;&nbsp;定",
                status : true
            }

            $scope.infoSureClick = function(){
                let data = {
                    workflowTeamId:$scope.teamId,
                    userId:userId,
                    memberTelphone:tel
                }
                teamServ.delFlowTeamMember($http,APPBASE,data).then(function(res){
                    if(res.data.code === 0){
                        $scope.infoData.status = false;
                        $state.reload('main.workFlow');
                    }
                })
            }
        }
        $scope.turnFun = function(position){
            if(position === 'left'){
                if(memberPage>1){
                    memberPage--;
                    memberStart = memberStart -memberSize;
                    memberEnd = memberEnd -memberSize;
                    $scope.memberList = $scope.teamDetaillist.flowTeamMemberList.slice(memberStart,memberEnd)
                }
            }else{
                if(memberPage<$scope.memberAllCount){
                    memberPage++;
                    memberStart = memberStart +memberSize;
                    memberEnd = memberEnd +memberSize;
                    $scope.memberList = $scope.teamDetaillist.flowTeamMemberList.slice(memberStart,memberEnd)
                }
            }
        }
        /**
         * 查询团队成员
         * @param {*} data 
         */
        function getFlowTeamDetail(teamId) {
            workFlowServ.getFlowTeamDetail($http, APPBASE, teamId).then(function (res) {
                if (res.data.code === 0) {
                    $scope.teamDetaillist = res.data.data;
                    $scope.memberAllCount =  Math.ceil($scope.teamDetaillist.flowTeamMemberList.length/memberSize);
                    $scope.memberList = $scope.teamDetaillist.flowTeamMemberList.slice(0,memberSize)
                }
            })
        }

}]
