require('../style/workFLow.scss');
require('../style/workFLow_form.scss');
export default ['$scope', '$http', 'APPBASE', 'workFlowServ','accountServ','$state',
      function ($scope, $http, APPBASE, workFlowServ,accountServ,$state) {
      
      var selindex = 0;
      $scope.currentTeam = {};  //当前团队对象

      ; (function () {
            workFlowServ.getFlowTeamListAboutMeWeb($http, APPBASE).then(function (res) {
                  if (res.data.code === 0) {
                      $scope.myTeamDataList = res.data.data;
                      $scope.$broadcast("myTeamDataList",$scope.myTeamDataList);
                      if($scope.myTeamDataList.length>0){
                        $scope.myTeamDataList[selindex].select = true;
                        let currentTeam = $scope.myTeamDataList[selindex];
                        $scope.currentTeam = {
                            id:currentTeam.id,
                            name:currentTeam.name,
                            unMessageStatus : (currentTeam.shenPiCount>0||currentTeam.shenQingAgreeCount>0
                                ||currentTeam.shenQingNoagreeCount>0||currentTeam.writeCount>0)?true:false,
                            shenPiCount : currentTeam.shenPiCount,
                            shenQingAgreeCount : currentTeam.shenQingAgreeCount,
                            shenQingNoagreeCount : currentTeam.shenQingNoagreeCount,
                            writeCount : currentTeam.writeCount
                        }
                        //向下广播选择团队事件
                        $scope.$broadcast("selTeamFun",$scope.currentTeam);
                      }else{
                          $state.go('main.workFlow_noTeam');
                      } 
                  }
            })
            let token = sessionStorage.getItem('token');
            if(token){
                accountServ.findUserByTokenResource($http,APPBASE).then(function(res){
                    if(res.data.code === 0){
                        $scope.userData = res.data.data;
                    }
                })
            }
      }());
      /**
       * 切换团队
       */
      $scope.selMyTeam = function(index,selData){
            if (selData.select) return;
            let currentTeam = $scope.myTeamDataList[index];
            $scope.myTeamDataList[selindex].select = false;
            $scope.myTeamDataList[index].select = true;
            selindex = index;
            $scope.currentTeam = {
                id:currentTeam.id,
                name:currentTeam.name,
                unMessageStatus : (currentTeam.shenPiCount>0||currentTeam.shenQingAgreeCount>0
                                ||currentTeam.shenQingNoagreeCount>0||currentTeam.writeCount>0)?true:false,
                shenPiCount : currentTeam.shenPiCount,
                shenQingAgreeCount : currentTeam.shenQingAgreeCount,
                shenQingNoagreeCount : currentTeam.shenQingNoagreeCount,
                writeCount : currentTeam.writeCount
            }
            $scope.$broadcast("selTeamFun",$scope.currentTeam);
      }
}]