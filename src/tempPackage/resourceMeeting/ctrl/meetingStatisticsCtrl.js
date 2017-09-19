 require('../style/statistics.scss');
 export default ['$scope', '$state', '$http', 'APPBASE', '$compile','$stateParams','meetingServ',
    function ($scope, $state, $http, APPBASE, $compile,$stateParams,meetingServ) {
    
    var hyId = $stateParams.meetingId;

    $scope.menuStatus = 'sign';
    $scope.menuClick = function(value){
        $scope.menuStatus = value;
    }

    if(hyId){
        mmSIPagin();
        onWallList();
        awardList();
        questionList();
    }
    
    /**
     * 获取签到用户
     */
    function mmSIPagin(){
		$scope.sGzxscrollFlag =false;
		let sGpageSize = 4;
		let sGcurrentPage = 0;
		$scope.dataHySignIn = [];
        let pushContent = function(){
            let data = {
                meeting : hyId
            };
            sGcurrentPage++;
            meetingServ.mmSIPagin($http,APPBASE,sGcurrentPage,sGpageSize,data).then(function(res){
                if(res.data.code === 0){
                    //计算总共多少页
                    let sGAllpageCount = res.data.data.pageCount;//总共的页数
                    let list = res.data.data.list;
                    for(var index in list){ 
                        $scope.dataHySignIn.push(list[index]);
                    }
                    
                    $scope.sGzxscrollFlag = (sGAllpageCount == sGcurrentPage || sGAllpageCount === 0)?false:true;
                }
            })
        }
        pushContent();
		$scope.addMoreSignGuest = function(){
            pushContent();
		}
    }
    /**
     * 获取上墙信息
     */
    function onWallList(){
		$scope.oWzxscrollFlag =false;
		let pageSize = 10;
		let currentPage = 0;
		$scope.dataHyOnWall = [];
        let pushContent = function(){
            let data = {
                meeting : hyId,
                type : 0
            };
            currentPage++;
            meetingServ.mmOnWallPagin($http,APPBASE,currentPage,pageSize,data).then(function(res){
                if(res.data.code === 0){
                    //计算总共多少页
                    let allpageCount = res.data.data.pageCount;//总共的页数
                    let list = res.data.data.list;
                    for(var index in list){ 
                        $scope.dataHyOnWall.push(list[index]);
                    }
                    $scope.sGzxscrollFlag = allpageCount == currentPage?false:true;
                }
            })
        }
        pushContent();
		$scope.addMoreOnWall = function(){
            pushContent();
		}
    }
    /**
     * 获取中奖信息
     */
    function awardList(){
		$scope.aWzxscrollFlag =false;
		let pageSize = 10;
		let currentPage = 0;
		$scope.dataHyAWard = [];
        let pushContent = function(){
            let data = {
                meeting : hyId
            };
            currentPage++;
            meetingServ.mmTrPagin($http,APPBASE,currentPage,pageSize,data).then(function(res){
                if(res.data.code === 0){
                    //计算总共多少页
                    let allpageCount = res.data.data.pageCount;//总共的页数
                    let list = res.data.data.list;
                    for(var index in list){ 
                        $scope.dataHyAWard.push(list[index]);
                    }
                    $scope.aWzxscrollFlag = (allpageCount == currentPage || allpageCount == 0)?false:true;
                }
            })
        }
        pushContent();
		$scope.addMoreAward = function(){
            pushContent();
		}
    }

    /**
     * 问题列表查询
     */
    function questionList(){
		$scope.qLzxscrollFlag =false;
		let pageSize = 10;
		let currentPage = 0;
		$scope.dataHyQuestion = [];
        let pushContent = function(){
            let data = {
                meeting : hyId,
                type : 1
            };
            currentPage++;
            meetingServ.mmOnWallPagin($http,APPBASE,currentPage,pageSize,data).then(function(res){
                if(res.data.code === 0){
                    //计算总共多少页
                    let allpageCount = res.data.data.pageCount;//总共的页数
                    let list = res.data.data.list;
                    for(var index in list){ 
                        $scope.dataHyQuestion.push(list[index]);
                    }
                    $scope.qLzxscrollFlag = allpageCount == currentPage?false:true;
                }
            })
        }
        pushContent();
		$scope.addMoreAward = function(){
            pushContent();
		}
    }
}]