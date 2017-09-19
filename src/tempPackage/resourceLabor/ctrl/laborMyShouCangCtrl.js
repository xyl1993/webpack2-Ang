
export default ['$scope', '$http', 'APPBASE', 'laborServ','accountServ','$state',
      function ($scope, $http, APPBASE, laborServ,accountServ,$state) {
      /**
       * 分页数据
       */
      $scope.currentPage = 1;
      $scope.pageSize = 10;
      $scope.totalPage = 0;
      var $pager = $('#pagination');
    $scope.radioBox=function(event){
      if(!$(event.target).checked){
      $(event.target).parent().parent().find("div.div_radio_outer").removeClass("select");
      $(event.target).parent().children("div.div_radio_outer").addClass("select");
      }
      $scope.currentPage = 1;
      $scope.pageSize = 10;
      selectMyShouCang();
    }

    $scope.selectMyShouCang = function(){
                var type = 1;
    laborServ.selectMyShouCang($http, APPBASE,$scope.currentPage,$scope.pageSize,type ).then(res => {
              if (res.data.code === 0) {
                $scope.myList = res.data.data.list;
                $scope.currentPage = res.data.data.currentPage==0?1:res.data.data.currentPage;
                $scope.records = res.data.data.recordCount;
                $scope.totalPage = res.data.data.pageCount;
                initPage($scope.totalPage==0?1:$scope.totalPage);
              }
            })   
    }

    function selectMyShouCang(){
      
         var type = $("[name='type']:checked").val();
         if(!type){
            type=1;
         }
    laborServ.selectMyShouCang($http, APPBASE,$scope.currentPage,$scope.pageSize,type ).then(res => {
              if (res.data.code === 0) {
                $scope.myList = res.data.data.list;
                $scope.currentPage = res.data.data.currentPage==0?1:res.data.data.currentPage;
                $scope.records = res.data.data.recordCount;
                $scope.totalPage = res.data.data.pageCount;
                initPage($scope.totalPage);
              }
            })
    }

    selectMyShouCang();

            /*
    *分页
    */
    function initPage(pages) {
        $pager.twbsPagination({
            totalPages: pages,
            visiblePages: 8,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '末页',
            onPageClick: (event, page)=>{
              $scope.currentPage = page;
                selectMyShouCang();
            }
        });
    }
      /**
       * 取消收藏
       */
$scope.collectionState = function (id,index) {
      let data = id;
      laborServ.addConllection($http, APPBASE, data).then(function (res) {
        if (res.data.code === 0) {
          selectMyShouCang();
          //$scope.myList.splice(index,1);
        }
      });
    }
}]