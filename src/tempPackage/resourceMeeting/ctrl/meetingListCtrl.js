 require('../style/list.scss');
 export default ['$scope', '$state', '$http', 'APPBASE', '$compile','$stateParams','meetingServ',
    function ($scope, $state, $http, APPBASE, $compile,$stateParams,meetingServ) {
    
    var pageSize = 10,currentPage = 1;
    $scope.meetingList = [];
    $scope.moreStatus = false;

    selectMeetingsByTooken();

    function selectMeetingsByTooken(){
        let data = {};
        meetingServ.selectMeetingsByTooken($http, APPBASE,currentPage,pageSize,data).then(function(res){
            if(res.data.code === 0){
                let list = res.data.data.list;
                for(var i in list){
                    $scope.meetingList.push(list[i]);
                }
                $scope.moreStatus = (currentPage <res.data.data.pageCount);
            }
        })
    }

    $scope.loadMore = function(){
        currentPage ++;
        selectMeetingsByTooken();
    }

    //跳转到直播
    $scope.live = function(id,md){
        window.open("http://www.yunzhujia.cn/ryHy/hy.html?id="+id+"&md="+md);
    }
}]