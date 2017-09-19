
export default ['$scope', '$http', 'APPBASE', 'laborServ', 'accountServ', '$state',
  function ($scope, $http, APPBASE, laborServ, accountServ, $state) {

    maybeLike();
    /**
     * 猜你喜欢
     */
    function maybeLike() {
      laborServ.maybelike($http, APPBASE).then(function (res) {
        if (res.data.code === 0) {
          let data = res.data.data;
          $scope.maybeLikeList = data;  //浅拷贝
          //$scope.ccData.ccList = data.slice(0);   //深度拷贝
        }
      })
    }
    /**
     * 优质用工
     */
    function bestEmployee() {
      laborServ.bestEmployee($http, APPBASE).then(function (res) {
        if (res.data.code === 0) {
          let data = res.data.data;
          $scope.bestEmployeeList = data;  //浅拷贝
          //$scope.ccData.ccList = data.slice(0);   //深度拷贝
        }
      })
    }
    /**
    * 优质供方
    */
    function bestSupplier() {
      laborServ.bestSupplier($http, APPBASE).then(function (res) {
        if (res.data.code === 0) {
          let data = res.data.data;
          $scope.bestSupplierList = data;  //浅拷贝
          //$scope.ccData.ccList = data.slice(0);   //深度拷贝
        }
      })
    }
    /**
     * tab页切换
     */
    $scope.maybeLikeChange = function (event, type) {
      switch (type) {
        case 1: maybeLike(); $("#canMaybeLike").fadeIn(); $("#goodEmployee").fadeOut(); $("#goodGiver").fadeOut(); $(event.target).parent().children("li").removeClass("select"); $(event.target).addClass("select"); break;
        case 2: bestEmployee(); $("#canMaybeLike").fadeOut(); $("#goodEmployee").fadeIn(); $("#goodGiver").fadeOut(); $(event.target).parent().children("li").removeClass("select"); $(event.target).addClass("select"); break;
        case 3: bestSupplier(); $("#canMaybeLike").fadeOut(); $("#goodEmployee").fadeOut(); $("#goodGiver").fadeIn(); $(event.target).parent().children("li").removeClass("select"); $(event.target).addClass("select"); break;
        default: ; break;
      }
    }
    // $scope.getFbzxq = function(id){
    //   $state.go('main.labor.laborFbzxq({id:id})');
    // }
    $scope.deleteLabor = function (id) {
      $scope.infoData = {
        infoText: "是否确定删除",
        sureText: "确&nbsp;&nbsp;定",
        status: true
      }
      $scope.infoSureClick = function () {
        var data = { "id": id };
        laborServ.deleteLabor($http, APPBASE, data).then(function (res) {
          $scope.infoData.status = false;
          if (res.data.code === 0) {
            alert("删除成功!");
          } else if (res.data.code == 9062) {
            alert("已有人评论，不可删除!");
          } else if (res.data.code == 9061) {
            alert("非信息发布者不可删除信息!");
          } else if (res.data.code == 9060) {
            alert("发布信息不存在或已被删除!");
          } else {
            alert("删除失败!");
          }
        })
      }
    }
/**
 * 收藏/取消收藏
 */
    $scope.collectionState = function (list) {
      let data = list.id;
      laborServ.addConllection($http, APPBASE, data).then(function (res) {
        if (res.data.code === 0) {
          if (list.conllectionFlag == 0) {
            list.conllectionFlag = 1;
          } else {
            list.conllectionFlag = 0;
          }
        }
      });
    }
  }]