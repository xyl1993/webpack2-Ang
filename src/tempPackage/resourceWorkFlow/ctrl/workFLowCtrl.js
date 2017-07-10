require('../style/workFLow.scss');
require('../style/workFLow_form.scss');
export default ['$scope', '$http', 'APPBASE', 'workFlowServ','accountServ',
      function ($scope, $http, APPBASE, workFlowServ,accountServ) {
      
      var selindex = 0;
      $scope.currentTeam = {};  //当前团队对象

      ; (function () {
            workFlowServ.getFlowTeamListAboutMe($http, APPBASE).then(function (res) {
                  if (res.data.code === 0) {
                      $scope.myTeamDataList = res.data.data;
                      console.log( $scope.myTeamDataList)
                      $scope.$broadcast("myTeamDataList",$scope.myTeamDataList);
                      if($scope.myTeamDataList.length>0){
                        $scope.myTeamDataList[selindex].select = true;
                        let currentTeam = $scope.myTeamDataList[selindex];
                        $scope.currentTeam = {
                            id:currentTeam.id,
                            name:currentTeam.name
                        }
                        //向下广播选择团队事件
                        $scope.$broadcast("selTeamFun",$scope.currentTeam);
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
                name:currentTeam.name
            }
            $scope.$broadcast("selTeamFun",$scope.currentTeam);
      }
}]