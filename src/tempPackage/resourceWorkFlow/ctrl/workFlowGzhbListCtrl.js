  
import navJson from '../data/normalData.json';
export default ['$scope', '$http', 'APPBASE', 'workFlowServ',
    function ($scope, $http, APPBASE, workFlowServ) {
    
    var teamId = $scope.currentTeam.id;

    var pageSize = 10,currentPage = 1;

    $scope.spSuccessData = {
        spSuccessStatus : false
    };

    //当前选择的菜单的索引                
    var selnormalData = {
        typeDataIndex : 0
    };

    //接收workFlowCtrl广播事件
    $scope.$on('selTeamFun',function(event,data){
        teamId = data.id;
        currentPage = 1;
        selnormalData = {
            typeDataIndex : 0
        };
        $scope.normalData = angular.copy(navJson);
        selectShenQinFlowNormal();
    });

    ;(function () {
        if(typeof(teamId)!="undefined"){
            $scope.normalData = angular.copy(navJson);
            selectShenQinFlowNormal();
        }
    }());

    /**
     * 菜单目录切换
     */
    $scope.changeWorkFlow = function(index,data){
        if (data.select) return;
        currentPage = 1;
        $scope.normalData.typeData[(index+1)%2].select = false;
        $scope.normalData.typeData[index].select = true;
        typeChangeFun(data);
    }

    $scope.tabPage = function(type,current,count){
        if(type === 'prev'){
            //上一页
            if(current === 1){
                return;
            }
            currentPage--;
        }else{
            //下一页
            if(current === count ){
                return
            }
            currentPage++;
        }
        typeChangeFun($scope.normalData.typeData[selnormalData.typeDataIndex]);
    }

    function typeChangeFun(data){
        switch (data.id){
            case 1:   //我发出的
                selectShenQinFlowNormal();
                break;
            case 2:    //我收到的
                selectChaoSongFlowNormal();
                break;  
        }
    }
    /**
     * 查询我发出的
     */
    function selectShenQinFlowNormal(){
        let data = {
            teamId : teamId
        }
        workFlowServ.selectShenQinFlowNormal($http,APPBASE,currentPage,pageSize,data).then(function(res){
            if(res.data.code === 0){
                $scope.infoData = res.data.data;
            }
        })
    }
    /**
     * 查询我收到的
     */
    function selectChaoSongFlowNormal(){
        let data = {
            teamId : teamId
        }
        workFlowServ.selectChaoSongFlowNormal($http,APPBASE,currentPage,pageSize,data).then(function(res){
            if(res.data.code === 0){
                $scope.infoData = res.data.data;
            }
        })
    }

}]