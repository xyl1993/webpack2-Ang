
export default ['$scope', '$http', 'APPBASE', 'laborServ', 'accountServ', '$state',
  function ($scope, $http, APPBASE, laborServ, accountServ, $state) {
    $scope.e = '';
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.records = 0;
    $scope.totalPage = 0;

    laborServ.selectProvinces($http, APPBASE).then(res => {
      if (res.data.code === 0) {
        $scope.provinceObj = res.data.data
      }
    })

    laborServ.selectWorkType($http, APPBASE).then(res => {
      if (res.data.code === 0) {
        $scope.workTypeObj = res.data.data
      }
    })
    $scope.selectCity = function () {
      var provinceId = $scope.e;

      laborServ.selectCities($http, APPBASE, provinceId).then(res => {
        if (res.data.code === 0) {
          $scope.citiesObj = res.data.data
        }
      })
    }



    $scope.findPeople = function () {
      var title = $("#title").val();
      var provinceId = $("#province").val();
      var cityId = $("#city").val();
      var workType = $("#workType").val();
      var data = { "content": title, "provinceId": provinceId, "cityId": cityId, "positionType": workType, "type": 1 };
      laborServ.findPeople($http, APPBASE, $scope.currentPage, $scope.pageSize, data).then(res => {
        if (res.data.code === 0) {
          $scope.findPeopleList = res.data.data.list;
          $scope.currentPage = res.data.data.currentPage == 0 ? 1 : res.data.data.currentPage;
          $scope.records = res.data.data.recordCount;
          $scope.totalPage = res.data.data.pageCount;
        }
      })
    }

    $scope.findPeopleMore = function () {
      $scope.currentPage = $scope.currentPage + 1;
      var title = $("#title").val();
      var provinceId = $("#province").val();
      var cityId = $("#city").val();
      var workType = $("#workType").val();
      var data = { "content": title, "provinceId": provinceId, "cityId": cityId, "positionType": workType, "type": 1 };
      laborServ.findPeople($http, APPBASE, $scope.currentPage, $scope.pageSize, data).then(res => {
        if (res.data.code === 0) {
          $scope.findPeopleList.push.apply($scope.findPeopleList, res.data.data.list);
          $scope.currentPage = res.data.data.currentPage == 0 ? 1 : res.data.data.currentPage;
          $scope.records = res.data.data.recordCount;
          $scope.totalPage = res.data.data.pageCount;
        }
      })
    }
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
    $scope.findPeople();
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