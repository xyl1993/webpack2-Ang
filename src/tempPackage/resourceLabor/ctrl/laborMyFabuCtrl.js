
export default ['$scope', '$http', 'APPBASE', 'laborServ','accountServ','$state',
      function ($scope, $http, APPBASE, laborServ,accountServ,$state) {
      /**
       * 分页数据
       */
      $scope.currentPage = 1;
      $scope.pageSize = 10;
      $scope.records = 0;
      $scope.totalPage = 0;
      var $pager = $('#pagination');
    $scope.radioBox=function(event){
      if(!$(event.target).checked){
        $(event.target).parent().parent().find("div.div_radio_outer").removeClass("select");
        $(event.target).parent().children("div.div_radio_outer").addClass("select");
      }
      $scope.currentPage = 1;
      $scope.pageSize = 10;
      selectMyFabu();
    }

    $scope.selectMyFabu = function(){
                var type = 1;
    laborServ.selectMyFabu($http, APPBASE,$scope.currentPage,$scope.pageSize,type ).then(res => {
              if (res.data.code === 0) {
                $scope.myList = res.data.data.list;
                $scope.currentPage = res.data.data.currentPage==0?1:res.data.data.currentPage;
                $scope.records = res.data.data.recordCount;
                $scope.totalPage = res.data.data.pageCount;
              }
            })   
    }

    function selectMyFabu(){
         var type = $("[name='type']:checked").val();
         if(!type){
            type=1;
         }
    laborServ.selectMyFabu($http, APPBASE,$scope.currentPage,$scope.pageSize,type ).then(res => {
              if (res.data.code === 0) {
                $scope.myList = res.data.data.list;
                $scope.currentPage = res.data.data.currentPage==0?1:res.data.data.currentPage;
                $scope.records = res.data.data.recordCount;
                $scope.totalPage = res.data.data.pageCount;
                initPage($scope.totalPage==0?1:$scope.totalPage);
              }
            })
    }

    selectMyFabu();

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
                selectMyFabu();
            }
        });
    }
    
   $scope.deleteLabor = function(id){

        $scope.infoData = {
            infoText:"是否确定删除",
            sureText:"确&nbsp;&nbsp;定",
            status : true
        }
             $scope.infoSureClick = function(){
            var data = {"id":id};
            $scope.infoData.status = false;
            laborServ.deleteLabor($http,APPBASE,data).then(function(res){
                if(res.data.code === 0){
                    alert("删除成功!");
                  }else if(res.data.code ==9062){
                    alert("已有人评论，不可删除!");  
                  }else if(res.data.code ==9061){
                    alert("非信息发布者不可删除信息!"); 
                  }else if(res.data.code ==9060){
                    alert("发布信息不存在或已被删除!"); 
                  }else{
                    alert("删除失败!");
                  }
            })
       }
      }

}]