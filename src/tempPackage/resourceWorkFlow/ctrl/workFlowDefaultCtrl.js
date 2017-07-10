
export default ['$scope', '$http', '$stateParams', 'APPBASE', 'workFlowServ','$state',
    function ($scope, $http, $stateParams, APPBASE, workFlowServ,$state) {
        var pageSize = 10, currentPage = 1;
        $scope.teamId = $scope.currentTeam.id;
        $scope.$on('myTeamDataList', function (event, data) {
            $scope.teamList = data;
        })
        $scope.$on('selTeamFun', function (event, data) {
            $scope.teamId = data.id;
            getFlowTeamDetail($scope.teamId);
        })
        ; (function () {
            workFlowServ.selectMessageInfo($http, APPBASE, currentPage, pageSize).then(function (res) {
                if (res.data.code === 0) {
                    $scope.messageInfoData = res.data.data;
                }
            })

        }());
        $scope.teamSet = function(){
            sessionStorage.teamId=$scope.teamId;
            $state.go('main.teamSet');
        }
        /**
         * 查询团队成员
         * @param {*} data 
         */
        function getFlowTeamDetail(data) {
            workFlowServ.getFlowTeamDetail($http, APPBASE, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.teamDetaillist = res.data.data;
                }
            })
        }

// =======

// import workJson from '../data/detailDate.json';
// export default ['$scope', '$http', '$stateParams', 'APPBASE', 'workFlowServ','$log','$state',
//     function ($scope, $http, $stateParams, APPBASE, workFlowServ,$log,$state ) {

//     $scope.teamId = $scope.currentTeam.id;

//     $scope.teamMemberList = [];  //团队成员列表对象

//     (function () {

//         getFlowTeamListAboutMe();

//         if(typeof($scope.teamId)!="undefined"){
//             getFlowTeamMember();
//         }
//     }());

//     //接收workFlowCtrl广播事件
//     $scope.$on('selTeamFun',function(event,data){
//         $scope.teamId = data.id;
//         getFlowTeamMember();
//     })

//     function getFlowTeamMember(){
//         let data = {
//             id : $scope.teamId
//         };
//         workFlowServ.getFlowTeamMember($http, APPBASE,data).then(function (res) {
//             if (res.data.code === 0) {
//                 $scope.teamMemberList = res.data.data;
//             }
//         })
//     }

//     function getFlowTeamListAboutMe(){
//         workFlowServ.getFlowTeamListAboutMe($http, APPBASE).then(function (res) {
//             if (res.data.code === 0) {
//                 $scope.teamList = res.data.data;
//             }
//         })
//     }


}]
