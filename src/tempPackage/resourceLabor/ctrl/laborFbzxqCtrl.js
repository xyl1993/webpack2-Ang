
import starsInPng from '../img/starsIn.png';
import starsOnPng from '../img/starsOn.png';
import starsNoPng from '../img/starsNo.png';
export default ['$scope', '$state', '$http', 'APPBASE', '$compile', 'laborServ', '$stateParams',
    function ($scope, $state, $http, APPBASE, $compile, laborServ, $stateParams) {
        var pageSize = 10, currentPage = 1;
        ; (function () {
            let data = $stateParams.id;
            laborServ.selectAutherInfoByUid($http, APPBASE, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.fbzInfo = res.data.data;
                    $scope.star = startFun($scope.fbzInfo.laborScore);
                }
            });
            selectTalkInUserId();
        }());

        function startFun(startCount) {
            //var startCount = 3.5;
            var r = /^\+?[1-9][0-9]*$/;
            let starsObj = [];
            for (let i = 0, len = Math.ceil(startCount); i < len; i++) {
                let data = {
                    src: starsInPng
                }
                if ((i == len - 1) && !r.test(startCount)) {
                    data.src = starsOnPng;
                }
                starsObj.push(data);
            }
            let cellStarCount = 5 - starsObj.length;
            for (let i = 0; i < cellStarCount; i++) {
                let data = {
                    src: starsNoPng
                }
                starsObj.push(data);
            }
            return starsObj;
        }
        /**
         * 获取评论
         */
        function selectTalkInUserId() {
            let data = $stateParams.id;
            laborServ.selectTalkInUserId($http, APPBASE, pageSize, currentPage, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.currentPage = res.data.data.currentPage;
                    $scope.pageCount = res.data.data.pageCount;
                    $scope.plList = res.data.data.list;
                }
            });
        }
        /**
                 * 查看更多
                 */
        $scope.moreComment = function () {
            currentPage++;
            let data = $stateParams.id;
            laborServ.selectTalkInUserId($http, APPBASE, pageSize, currentPage, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.currentPage = res.data.data.currentPage;
                    $scope.pageCount = res.data.data.pageCount;
                    $scope.pl = res.data.data.list;
                    for (let i = 0; i < $scope.pl.length; i++) {
                        $scope.plList.push($scope.pl[i])
                    }


                }

            });
        }
    }]