
export default ['$scope','$state', '$http', 'APPBASE','$compile', 'workFlowServ',
    function ($scope,$state, $http, APPBASE,$compile, workFlowServ) {
        
        var teamId = $scope.currentTeam.id;
        
        //接收workFlowCtrl广播事件
        $scope.$on('selTeamFun',function(event,data){
            teamId = data.id;
            getTeamMemberNotMe();
        })

        $scope.successDialog = {                   //显示成功弹窗
            status:false,
            infoText:'保存成功',
            btnText:'确&nbsp;&nbsp;定'
        }; 
        $scope.selLeaveObj = {
            selName:'',    //选择的请假类型
            leaveEmptyObj:{
                id:'',
                name:''
            },
            typeList:[]    //传递给组建的类型集合
        };//传递给请假下拉框组件的对象
        $scope.approvalData = {
            selIndex:0,                       //默认选择的index索引
            approvalStatus:false,             //是否显示弹窗,默认false
            approvalList:[]                   //审批人对象集合,从数据库查询
        };//传递给审批人弹窗组件的对象
        $scope.ccData = {
            ccStatus:false,             //是否显示弹窗,默认false
            ccList:[]                   //抄送人对象集合,从数据库查询
        };//传递给抄送人弹窗组件的对象
        $scope.leaveFormData = {};    //form表单model
        $scope.approvalList = [];     //选择的审批人集合
        
        (function () {
            var startDate,endDate;
            $.datetimepicker.setLocale('zh'); 
            $('#startTime').datetimepicker({
                format:'Y-m-d H:i',
                minDate: 0,
                onShow:function( ct ){
                    this.setOptions({
                        maxDate:$('#endTime').val()?$('#endTime').val():false
                    })
                }
            });
            $('#endTime').datetimepicker({
                format:'Y-m-d H:i',
                onShow:function( ct ){
                    this.setOptions({
                        minDate:$('#startTime').val()?$('#startTime').val():0
                    })
                }
            });
            selectDictionaryInfo();
            if(typeof(teamId)!="undefined"){
                getTeamMemberNotMe();
            }
        }());

        function selectDictionaryInfo(){
            //获取请假类型
            workFlowServ.selectDictionaryInfo($http, APPBASE, '1002').then(function (res) {
                if(res.data.code === 0){
                    $scope.selLeaveObj.typeList = res.data.data;
                }
            })
        }

        function getTeamMemberNotMe(){
            workFlowServ.getTeamMemberNotMe($http,APPBASE,teamId).then(function(res){
                if(res.data.code === 0){
                    let data = res.data.data;
                    $scope.approvalData.approvalList = data;  //浅拷贝
                    $scope.ccData.ccList = data.slice(0);   //深度拷贝
                }
            })
        }

        /**
         * 上传文件
         */
        $scope.fileObj = {
            btnStatus :true,  //上传按钮是否显示(3个不显示)
            fileList : []
        };
        $scope.uploadFile = function(event){
            let file = event.target.files;
            if(!file) return;
            let fileName = file[0].name;
            switch ($scope.fileObj.fileList.length){
                case 1:
                    if(fileName == $scope.fileObj.fileList[0].name){
                        showErrDialog("请不要重复上传文件");
                        return;
                    }
                break;
                case 2:
                    if(fileName == $scope.fileObj.fileList[0].name || fileName == $scope.fileObj.fileList[1].name){
                        showErrDialog("请不要重复上传文件");
                        return;
                    }
                break;
            }
            
            let formData = new FormData();
            formData.append("file", file[0]);
            workFlowServ.uploadFile($http,APPBASE,formData).then(function(res){
                if(res.data.code === 0){
                    let file_path = res.data.data;
                    $scope.fileObj.fileList.push({
                        name:fileName,
                        path:file_path
                    })
                    if($scope.fileObj.fileList.length===3){
                        $scope.fileObj.btnStatus = false;
                    }
                }
            });
            var fileInput = $('#leaveUploadFileInput');
            fileInput.after($compile(fileInput.clone().val(""))($scope));
            fileInput.remove();
        };

        $scope.removeFile = function(index){
            $scope.fileObj.fileList.splice(index,1);
            $scope.fileObj.btnStatus = true;
        }

        /**
         * 显示选择审批人
         */
        $scope.addApproval = function(){
            $scope.approvalData.approvalStatus = true;
        }
        /**
         *  添加抄送
         */
        $scope.addCC = function(){
            $scope.ccData.ccStatus = true;
        }
        /**
         * 接收select选择事件
         */
        $scope.typeSureClick = function(type,data){
            $scope.selLeaveObj.selName = data.name;
            $scope.leaveFormData.type = data.id;
        };
        /**
         * 确定选择审批人
         */
        $scope.approvalSureClick = function(){
            if($scope.approvalData.approvalList.length>0){
                let selIndex = $scope.approvalData.selIndex,
                    selObj = $scope.approvalData.approvalList[selIndex];
                $scope.approvalList.push(selObj);
                $scope.approvalData.approvalList.splice(selIndex,1);
                $scope.approvalData.selIndex = 0;
            }
            $scope.approvalData.approvalStatus = false;
        }
        /**
         * 确定选择抄送人
         */
        $scope.ccSureClick = function(){
            $scope.ccData.ccStatus = false;
        }
        /**
         * 删除审批人
         */
        $scope.delApproval = function(index,selData){
            $scope.approvalList.splice(index,1);
            $scope.approvalData.approvalList.push(selData);
        }
        /**
         * 删除抄送人
         */
        $scope.delcc = function(index,selData){
            selData.selStatus = false;
        }
        /**
         * 保存
         */
        $scope.submit = function(){
            let formData = $scope.leaveFormData;
            formData.teamId = teamId;
            formData.flowDetailList = [];
            formData.flowWriteList = [];
            //循环审核人
            angular.forEach($scope.approvalList,function(data,index,array){
                let flowData = {
                    approvePersonId:data.userId,
                    approveSort:index+1
                }
                formData.flowDetailList.push(flowData);
            })
            if(formData.flowDetailList.length===0){
                showErrDialog('请选择审核人')
                return;
            }
            //循环抄送人
            angular.forEach($scope.ccData.ccList,function(data,index,array){
                if(data.selStatus){
                    let ccData = {
                        writePersonId:data.userId,
                    }
                    formData.flowWriteList.push(ccData);
                }
            })
            //循环文件对象
            angular.forEach($scope.fileObj.fileList,function(data,index,array){
                switch (index){
                    case 0 : formData.fileUrlOne = data.path;
                        break;
                    case 1 : formData.fileUrlTwo = data.path;
                        break;
                    case 2 : formData.fileUrlThree = data.path;
                        break;
                }
            })
            workFlowServ.saveFormLeave($http,APPBASE,formData).then(function(res){
                if(res.data.code === 0){
                    $scope.successDialog.status = true;
                } else if(res.data.code === 9001){
                    showErrDialog('系统错误');
                }
            })
        }
        /**
         * 关闭保存成功弹窗
         */
        $scope.dialogSureClick = function(){
            $state.reload('main.workFlow.leave');
            $scope.successDialog.status = false;
        }
        /**
         * 取消
         */
        $scope.cancel = function(){
            $state.reload('main.workFlow.leave');
        }

        /**
         * 错误提示
         */
        function showErrDialog(text){
            $scope.errorDialog = {
                infoText:text,
                btnText:'返&nbsp;&nbsp;回',
                status:true
            }
        }
    }]