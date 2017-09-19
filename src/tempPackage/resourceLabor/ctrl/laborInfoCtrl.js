require('../style/laborInfo.scss');
export default ['$scope','APPBASE','$state','laborServ','$http',
    function( $scope,APPBASE,$state,laborServ,$http) {


    $scope.infoData={
        currentPage : 1
    };

    var pageSize = 10;       //一页显示10条

    selectMessageInfo();

    function selectMessageInfo(type){
        laborServ.selectMessageInfo($http, APPBASE, $scope.infoData.currentPage, pageSize).then(function(res){
            if(res.data.code === 0){
                let data = res.data.data;
                $scope.infoData = {
                    currentPage:data.currentPage,                    //当前第几页
                    recordCount : data.recordCount,                    //总共多少条
                    pageCount : data.pageCount==0?1:data.pageCount,                     //总共多少页
                    lists:data.list                         //消息集合
                };
            }
        });
    }

    //上一页
    $scope.prevPage = function(){
        if($scope.infoData.currentPage>1){
            $scope.infoData.currentPage--;
            selectMessageInfo();
        }
    }
    //下一页
    $scope.nextPage = function(){
        if($scope.infoData.currentPage<$scope.infoData.pageCount){
            $scope.infoData.currentPage++;
            selectMessageInfo();
        }
    }
}]