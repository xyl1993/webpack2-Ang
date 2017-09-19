import starsInPng from '../img/starsIn.png';
import starsOnPng from '../img/starsOn.png';
import starsNoPng from '../img/starsNo.png';
export default ['$scope', '$state', '$http', '$stateParams', 'APPBASE', '$compile', 'laborServ',
    function ($scope, $state, $http, $stateParams, APPBASE, $compile, laborServ) {
        $scope.complaintData = { //投诉
            complaintStatus: false,
            opinion: '',
            tsList: [],
            text: ''
        }
        $scope.successDialog = { //显示成功弹窗
            status: false,
            infoText: '投诉成功',
            btnText: '确&nbsp;&nbsp;定'
        };
        $scope.shareType = false;
        $scope.tagList = [];
        $scope.starList = [];
        var pageSize = 10, currentPage = 1;
        ; (function () {
            let data = $stateParams.id;
            laborServ.selectLaborDetail($http, APPBASE, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.fbxqInfo = res.data.data;
                    $scope.tagList = $scope.fbxqInfo.tag.split(',');
                    $scope.star = startFun($scope.fbxqInfo.laborScore);
                }
            });
            data = {
                'laborLaunchId': $stateParams.id
            };
            selectCommentByLaborLaunchId(data);
            /**
             * 获取投诉类型
             */
            laborServ.getTosuType($http, APPBASE).then(function (res) {
                if (res.data.code === 0) {
                    $scope.complaintData.tsList = res.data.data;
                }
            });

        }());
        function selectCommentByLaborLaunchId(data) {
            currentPage = 1;
            laborServ.selectCommentByLaborLaunchId($http, APPBASE, pageSize, currentPage, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.currentPage = res.data.data.currentPage;
                    $scope.pageCount = res.data.data.pageCount;
                    $scope.plList = res.data.data.list;
                }
            });

        }
        /**
         * 评论框显示
         */
        $scope.addComment = function () {
            $scope.addCommentData = {
                addCommentStatus: true
            }
        }
        /**
         * 信用积分设置
         */

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
         * 分享窗口
         */
        $scope.updateShareType = function () {
            if ($scope.shareType == false) {
                $scope.shareType = true;
            } else {
                $scope.shareType = false;
            }

        }
        /**
         * 添加评论
         */
        $scope.addCommentSureClick = function () {
            if ($scope.addCommentData.score == undefined) {
                $scope.addCommentData.score = 5;
            }
            let data = {
                'laborLaunchId': $stateParams.id,
                'score': $scope.addCommentData.score,
                'content': $scope.addCommentData.opinion
            }
            laborServ.createComment($http, APPBASE, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.addCommentData.addCommentStatus = false;
                    data = {
                        'laborLaunchId': $stateParams.id
                    };
                    selectCommentByLaborLaunchId(data);
                }
            });
        }
        /**
         * 收藏/取消收藏
         */
        $scope.collectionState = function () {
            let data = $stateParams.id;
            laborServ.addConllection($http, APPBASE, data).then(function (res) {
                if (res.data.code === 0) {
                    if ($scope.fbxqInfo.conllectionFlag == 0) {
                        $scope.fbxqInfo.conllectionFlag = 1;
                    } else {
                        $scope.fbxqInfo.conllectionFlag = 0;
                    }
                }
            });
        }
        /**
         * 查看更多
         */
        $scope.moreComment = function () {
            currentPage++;
            let data = {
                'laborLaunchId': $stateParams.id
            };
            laborServ.selectCommentByLaborLaunchId($http, APPBASE, pageSize, currentPage, data).then(function (res) {
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

        /**
         * 投诉窗口显示
         */
        $scope.complaint = function () {
            $scope.complaintData.complaintStatus = true;
        }
        /**
         * 保存投诉信息
         */
        $scope.complaintSureClick = function () {
            let data = {
                'laborLaunchId': $stateParams.id,
                'text': $scope.complaintData.text,
                'remark': $scope.complaintData.opinion
            }
            laborServ.doComplaint($http, APPBASE, data).then(function (res) {//添加评论
                if (res.data.code === 0) {
                    $scope.complaintData.complaintStatus = false;
                    $scope.successDialog.status = true;

                }
            });
        }
        /**
         * 成功框关闭
         */
        $scope.dialogSureClick = function () {
            $scope.successDialog.status = false;
        }
        /**
         * 删除评论
         */
        $scope.delCommentByid = function (id,index) {
            let data = {
                'id': id
            }
            $scope.infoData = {
                infoText: "是否确定删除",
                sureText: "确&nbsp;&nbsp;定",
                status: true
            }
            $scope.infoSureClick = function () {
                laborServ.deleteComment($http, APPBASE, data).then(function (res) {
                    if (res.data.code === 0) {
                        $scope.infoData.status=false;
                        $scope.plList.splice(index,1);
                    }
                });
            }

        }
    }]