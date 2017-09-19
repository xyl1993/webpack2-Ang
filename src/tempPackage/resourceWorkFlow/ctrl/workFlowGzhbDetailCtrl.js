
import workJson from '../data/detailDate.json';
export default ['$scope', '$http', '$stateParams', 'APPBASE', 'workFlowServ','$log','$state',
    function ($scope, $http, $stateParams, APPBASE, workFlowServ,$log,$state ) {
        
        (function() {
            selectFlowNormalDetail($stateParams.id);
        }());

        
        function selectFlowNormalDetail(id) {

            let data = {
                id: id
            }
            workFlowServ.selectFlowNormalDetail($http, APPBASE, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.infoData = res.data.data.formInfo;
                    gzhbDetail();
                }     
            })
        }

        function gzhbDetail() {
            $scope.detailType = workJson.gzhb;
            $scope.detailType[0].value = $scope.infoData.startTime
            $scope.detailType[1].value = $scope.infoData.endTime
            $scope.detailType[2].value = $scope.infoData.workComplete
            $scope.detailType[3].value = $scope.infoData.workUncomplete
            $scope.detailType[4].value = $scope.infoData.workPlane
            $scope.detailType[5].value = $scope.infoData.remark
            $scope.detailType[6].value = $scope.infoData.fileUrlOne
            $scope.detailType[7].value = $scope.infoData.fileUrlTwo
            $scope.detailType[8].value = $scope.infoData.fileUrlThree
        }

      $scope.toList = function(){
          $state.go('main.workFlow.gzhbList');
      }
       
    }]