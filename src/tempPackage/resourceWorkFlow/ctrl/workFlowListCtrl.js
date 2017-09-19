import navJson from '../data/approvalData.json';
export default ['$scope', '$http', '$state', 'APPBASE', 'workFlowServ',
    function ($scope, $http, $state, APPBASE, workFlowServ) {

        //菜单对象,默认我的申请,待审批
        //$scope.approvalData = navJson;
        var currentTeam = $scope.currentTeam;
        var teamId = $scope.currentTeam.id;

        var pageSize = 10, currentPage = 1;
        //当前选择的菜单的索引                
        var selApprovalData = {
            typeDataIndex: 0,
            flagDataIndex: 0
        };

        //接收workFlowCtrl广播事件
        $scope.$on('selTeamFun', function (event, data) {
            currentTeam = data;
            teamId = data.id;
            currentPage = 1;
            selApprovalData = {
                typeDataIndex: 0,
                flagDataIndex: 0
            };
            $scope.approvalData = angular.copy(navJson);
            $scope.approvalData.typeData[0].count = currentTeam.shenQingAgreeCount+currentTeam.shenQingNoagreeCount;
            $scope.approvalData.typeData[1].count = currentTeam.shenPiCount;
            $scope.approvalData.typeData[2].count = currentTeam.writeCount;
            selectShenQinFlow();
        });

        ; (function () {
            if (typeof (teamId) != "undefined") {
                $scope.approvalData = angular.copy(navJson);
                $scope.approvalData.typeData[0].count = currentTeam.shenQingAgreeCount;
                $scope.approvalData.typeData[1].count = currentTeam.shenPiCount;
                $scope.approvalData.typeData[2].count = currentTeam.writeCount;
                selectShenQinFlow();
            }
        }());

        /**
         * 菜单目录切换
         */
        $scope.changeWorkFlow = function (index, data, type) {
            if (data.select) return;
            currentPage = 1;
            switch (type) {
                case 1:
                    $scope.approvalData.typeData[selApprovalData.typeDataIndex].select = false;
                    selApprovalData.typeDataIndex = index;
                    switch (data.id) {
                        case 1:
                            $scope.approvalData.flagData = angular.copy(navJson.flagData);
                            break;
                        case 2:
                            $scope.approvalData.flagData = angular.copy(navJson.AflagData);
                            break;
                        case 3:
                            $scope.approvalData.flagData = angular.copy(navJson.ccData);
                            break;
                    }
                    selApprovalData.flagDataIndex = 0;
                    typeChangeFun(data);
                    break;
                case 2:
                    $scope.approvalData.flagData[selApprovalData.flagDataIndex].select = false;
                    selApprovalData.flagDataIndex = index;
                    typeChangeFun($scope.approvalData.typeData[selApprovalData.typeDataIndex]);
                    break;
                default: break;
            }
            data.select = true;
        }

        $scope.tabPage = function (type, current, count) {

            if (type === 'prev') {
                //上一页
                if (current === 1) {
                    return;
                }
                currentPage--;
            } else {
                //下一页
                if (current === count) {
                    return
                }
                currentPage++;
            }
            typeChangeFun($scope.approvalData.typeData[selApprovalData.typeDataIndex]);
        }

        function typeChangeFun(data) {
            switch (data.id) {
                case 1:   //我的申请
                    selectShenQinFlow();
                    break;
                case 2:    //我的审批
                    selectShenPiFlow();
                    break;
                case 3:    //抄送我的
                    selectChaoSongFlow();
                    break;
            }
        }
        /**
         * 查询我的申请
         */
        function selectShenQinFlow() {
            let data = {
                teamId: teamId,
                flowStatus: $scope.approvalData.flagData[selApprovalData.flagDataIndex].id
            }
            $scope.type = $scope.approvalData.typeData[selApprovalData.typeDataIndex].id
            workFlowServ.selectShenQinFlow($http, APPBASE, currentPage, pageSize, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.infoData = res.data.data;
                    $state.go('main.workFlow.list.data');
                }
            })
        }

        /**
         * 查询我的审批
         */
        function selectShenPiFlow() {
            let data = {
                teamId: teamId,
                flowStatus: $scope.approvalData.flagData[selApprovalData.flagDataIndex].id
            }
            $scope.type = $scope.approvalData.typeData[selApprovalData.typeDataIndex].id
            workFlowServ.selectShenPiFlow($http, APPBASE, currentPage, pageSize, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.infoData = res.data.data;
                    $state.go('main.workFlow.list.data');
                }
            })

        }

        /**
         * 查询抄送我的
         */
        function selectChaoSongFlow() {
            let data = {
                teamId: teamId
            }
            $scope.type = $scope.approvalData.typeData[selApprovalData.typeDataIndex].id
            workFlowServ.selectChaoSongFlow($http, APPBASE, currentPage, pageSize, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.infoData = res.data.data;
                    $state.go('main.workFlow.list.data');
                }
            })
        }

    }]