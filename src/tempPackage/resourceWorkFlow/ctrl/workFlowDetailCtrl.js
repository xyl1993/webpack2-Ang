import navJson from '../data/approvalData.json';
import workJson from '../data/detailDate.json';
export default ['$scope', '$http', '$stateParams', 'APPBASE', 'workFlowServ', 'accountServ',
    function ($scope, $http, $stateParams, APPBASE, workFlowServ, accountServ) {
        $scope.approveStatus = 0;
        $scope.successDialog = {                   //显示成功弹窗
            status: false,
            infoText: '审批成功',
            btnText: '确&nbsp;&nbsp;定'
        };
        ; (function () {
            $scope.ifType = $stateParams.type;
            searchFlow($stateParams.type, $stateParams.id, $stateParams.workId);
            let token = sessionStorage.getItem('token');
            if (token) {
                accountServ.findUserByTokenResource($http, APPBASE).then(function (res) {
                    if (res.data.code === 0) {
                        $scope.currrntUserId = res.data.data.account.id;
                    }
                })
            }
        }());
        function searchFlow(type, id, workId) {
            let data = {
                id: id
            }
            workFlowServ.searchFlowById($http, APPBASE, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.infoData = res.data.data.formInfo;
                    $scope.flowInfo = res.data.data.flowInfo;
                    $scope.flowData = res.data.data.FlowDetailList;
                    $scope.ccDate = res.data.data.writeInfo;
                    $scope.ccIfShow= $scope.ccDate.length;
                    switch (workId) {
                        case '1':
                            leaveDetail();//请假
                            break;
                        case '2':
                            bxDetail();//报销
                            break;
                        case '3':
                            ccDetail();//出差
                            break;
                        case '4':
                            yyDetail();//用印
                            break;
                        case '5':
                            bgyplyDetail();//办公用品领用
                            break;
                        case '6':
                            cgsqDetail();//采购申请
                            break;
                        case '7':
                            zjsqDetail();//资金申请
                            break;
                        case '8':
                            zsjyDetail();//证书借用
                            break;
                        case '9':
                            wjxxqfDetail();//文件消息签发
                            break;
                        case '10':
                            gzhbDetail();//工作日报
                            break;
                        case '11':
                            approvalDetail();//事物审批
                            break;

                    }
                }
            })
        }
        /**
         * 请假
         */
        function leaveDetail() {
            $scope.detailType = angular.copy(workJson.leave);
            $scope.detailType[0].value = $scope.infoData.typeName
            $scope.detailType[1].value = $scope.infoData.startTime
            $scope.detailType[2].value = $scope.infoData.endTime
            $scope.detailType[3].value = $scope.infoData.remark
        }
        function bxDetail() {
            $scope.detailType = angular.copy(workJson.bx);
            $scope.detailType[0].value = $scope.infoData.type
            $scope.detailType[1].value = $scope.infoData.detail
            $scope.detailType[2].value = $scope.infoData.amount
        }
        function ccDetail() {
            $scope.detailType = angular.copy(workJson.cc);
            $scope.detailType[0].value = $scope.infoData.address
            $scope.detailType[1].value = $scope.infoData.startTime
            $scope.detailType[2].value = $scope.infoData.endTime
            $scope.detailType[3].value = $scope.infoData.remark
        }
        function yyDetail() {
            $scope.detailType = angular.copy(workJson.yy);
            $scope.detailType[0].value = $scope.infoData.typeName
            $scope.detailType[1].value = $scope.infoData.sealTime
            $scope.detailType[2].value = $scope.infoData.num
            $scope.detailType[3].value = $scope.infoData.remark
        }
        function bgyplyDetail() {
            $scope.detailType = angular.copy(workJson.bgyply);
            $scope.detailType[0].value = $scope.infoData.name
            $scope.detailType[1].value = $scope.infoData.num
            $scope.detailType[2].value = $scope.infoData.remark

        }
        function cgsqDetail() {
            $scope.detailType = angular.copy(workJson.cgsq);
            $scope.detailType[0].value = $scope.infoData.remark
            $scope.detailType[1].value = $scope.infoData.detail
            $scope.detailType[2].value = $scope.infoData.amount

        }
        function zjsqDetail() {
            $scope.detailType = angular.copy(workJson.zjsq);
            $scope.detailType[0].value = $scope.infoData.receiver
            $scope.detailType[1].value = $scope.infoData.remark
            $scope.detailType[2].value = $scope.infoData.amount
            $scope.detailType[3].value = $scope.infoData.bank
            $scope.detailType[4].value = $scope.infoData.bankAcount
        }
        function zsjyDetail() {
            $scope.detailType = angular.copy(workJson.zsjy);
            $scope.detailType[0].value = $scope.infoData.typeName
            $scope.detailType[1].value = $scope.infoData.startTime
            $scope.detailType[2].value = $scope.infoData.remark
        }
        function wjxxqfDetail() {
            $scope.detailType = angular.copy(workJson.wjxxqf);
            $scope.detailType[0].value = $scope.infoData.name
            $scope.detailType[1].value = $scope.infoData.approver
            $scope.detailType[2].value = $scope.infoData.department
        }
        function gzhbDetail() {
            $scope.detailType = angular.copy(workJson.gzhb);
            $scope.detailType[0].value = $scope.infoData.startTime;
            $scope.detailType[1].value = $scope.infoData.endTime;
            $scope.detailType[2].value = $scope.infoData.workComplete;
            $scope.detailType[3].value = $scope.infoData.workUncomplete;
            $scope.detailType[4].value = $scope.infoData.workPlane;
            $scope.detailType[5].value = $scope.infoData.remark;
        }
        function approvalDetail() {
            $scope.detailType = angular.copy(workJson.approval);
            $scope.detailType[0].value = $scope.infoData.name
            $scope.detailType[1].value = $scope.infoData.detail
        }
        $scope.flowApproval = function (spType) {
            switch (spType) {
                case 1:
                    $scope.type = "审批通过";
                    $scope.approveStatus = 1;
                    break;
                case 2:
                    $scope.type = "审批驳回";
                    $scope.approveStatus = 2;
                    break;

            }
            $scope.spSuccessData = {
                spSuccessStatus: true,
                type: $scope.type
            };
        }
        $scope.spSuccessSureClick = function () {

            let data = {
                flowInfoId: $stateParams.id,
                approveStatus: $scope.approveStatus,
                approveRemark: $scope.spSuccessData.opinion
            }
            workFlowServ.flowStatus($http, APPBASE, data).then(function (res) {
                if (res.data.code === 0) {
                    $scope.spSuccessData.spSuccessStatus = false;
                    $scope.successDialog.status = true;
                }
            });
        }
        /**
        * 关闭保存成功弹窗
        */
        $scope.dialogSureClick = function () {
            searchFlow($stateParams.type, $stateParams.id, $stateParams.workId);
            $scope.successDialog.status = false;
        }
    }]