
export default ['$scope', '$state','$http', 'APPBASE','$compile', 'workFlowServ',
    function ($scope, $state, $http, APPBASE,$compile, workFlowServ) {
        
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
        
         $scope.ccData = {
            ccStatus:false,             //是否显示弹窗,默认false
            ccList:[]                   //汇报对象集合,从数据库查询
        };//传递给汇报对象弹窗组件的对象
        $scope.gzhbFormData = {};    //form表单model
    
        (function () {
            var startDate,endDate;
            $.datetimepicker.setLocale('zh'); 
            $('#gzhbStartTime').datetimepicker({
                format:'Y-m-d H:i',
                minDate: 0,
                onShow:function( ct ){
                    this.setOptions({
                        maxDate:$('#gzhbEndTime').val()?$('#gzhbEndTime').val():false
                    })
                }
            });
            $('#gzhbEndTime').datetimepicker({
                format:'Y-m-d H:i',
                onShow:function( ct ){
                    this.setOptions({
                        minDate:$('#gzhbStartTime').val()?$('#gzhbStartTime').val():0
                    })
                }
            });
            if(typeof(teamId)!="undefined"){
                getTeamMemberNotMe();
            }
        }());

        function getTeamMemberNotMe(){
            workFlowServ.getTeamMemberNotMe($http,APPBASE,teamId).then(function(res){
                if(res.data.code === 0){
                    let data = res.data.data;
                    console.log(data);
                    $scope.ccData.ccList = data;  //浅拷贝
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
            if(fileName == $scope.fileObj.fileList[0] || fileName == $scope.fileObj.fileList[1]){
                   alert("请不要重复上传文件");
                   return;
            }
            let formData = new FormData();
            formData.append("file", file[0]);
            workFlowServ.uploadFile($http,APPBASE,formData).then(function(res){
                if(res.data.code === 0){
                    $scope.fileObj.fileList.push(fileName);
                    if($scope.fileObj.fileList.length===3){
                        $scope.fileObj.btnStatus = false;
                    }
                   
                }
            });
            var fileInput = $('#gzhbUploadFileInput');
            fileInput.after($compile(fileInput.clone().val(""))($scope));
            fileInput.remove();
        };

        $scope.removeFile = function(index){
            $scope.fileObj.fileList.splice(index,1);
            $scope.fileObj.btnStatus = true;
        }

        /**
         * 显示选择汇报人
         */
       $scope.addCC = function(){
            $scope.ccData.ccStatus = true;
        }
        /**
         * 确定选择汇报人
         */
        $scope.ccSureClick = function(){
            $scope.ccData.ccStatus = false;
        }
        /**
         * 删除汇报人
         */
        $scope.delcc = function(index,selData){
            selData.selStatus = false;
        }
        /**
         * 保存
         */
        $scope.submit = function(){
            let formData = $scope.gzhbFormData;
            formData.teamId = teamId;
             formData.flowWriteList = [];
            //循环汇报对象
            angular.forEach($scope.ccData.ccList,function(data,index,array){
                if(data.selStatus){
                    let ccData = {
                        writePersonId:data.id,
                    }
                    formData.flowWriteList.push(ccData);
                }
            })
            //循环文件对象
            angular.forEach($scope.fileObj.fileList,function(data,index,array){
                switch (index){
                    case 0 : formData.fileUrlOne = data;
                        break;
                    case 1 : formData.fileUrlTwo = data;
                        break;
                    case 2 : formData.fileUrlThree = data;
                        break;
                }
            })
            workFlowServ.saveFormGzhb($http,APPBASE,formData).then(function(res){
                if(res.data.code === 0){
                    $scope.successDialog.status = true;
                }
            })
        }
        /**
         * 关闭保存成功弹窗
         */
        $scope.dialogSureClick = function(){
            $state.reload('main.workFlow.gzhb');
            $scope.successDialog.status = false;
        }
        /**
         * 取消
         */
        $scope.cancel = function(){
            $state.reload('main.workFlow.gzhb');
        }
    }]