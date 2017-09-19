 require('../style/edit.scss');
 export default ['$scope', '$state', '$http', 'APPBASE', '$compile','$stateParams','meetingServ','commonServ',
    function ($scope, $state, $http, APPBASE, $compile,$stateParams,meetingServ,commonServ) {
    
    $scope.menuStatus = 'hyBasc'        //当前显示目录

    $scope.meetingData = {
        id:$stateParams.meetingId,                       //id
        title:'',                    //标题
        logo:'',                     //logo
        start_time:'',               //开始日期
        end_time:'',                 //结束日期
        sign_prompt:'',              //签到提示语
        onwall_prompt:'',             //上墙提示语
        theme:1,
        open_text:'',
        close_text:''
    }

    $scope.hyxqData = {};      //会议基本设置对象
    $scope.successDialog = {                   //显示成功弹窗
        status:false,
        infoText:'保存成功',
        btnText:'确&nbsp;&nbsp;定'
    }; 
    (function () {
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
        if($scope.meetingData.id){
            selectMeetingById();
            selectMDGByMeetingId();
            selectTestimonialByMeeting();
        }
        selectAllTheme();
    }());
    function selectMeetingById(){
        let data = {
            id : $scope.meetingData.id
        };
        meetingServ.selectMeetingById($http, APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $scope.meetingData = res.data.data;
            }
        })
    }
    $scope.menuSel = function(value){
        if($scope.meetingData.id){
            $scope.menuStatus = value;
        }
    }
    /**
     * 上传logo
     */
    $scope.uploadFile = function(event){
        let file = event.target.files;
        if(!file) return;
        let fileType = file[0].type;
        if(fileType.split('/')[0] !== 'image'){
            alert('请上传图片类型的文件');
            return;
        }
        let formData = new FormData();
        formData.append("file", file[0]);
        commonServ.uploadFile($http,APPBASE,formData).then(function(res){
            if(res.data.code === 0){
                $scope.hyxqData.logo = res.data.data;
            }
        });
        var fileInput = $('#logoFile');
        fileInput.after($compile(fileInput.clone().val(""))($scope));
        fileInput.remove();
    };
    /**
     * 基本信息确认
     */
    $scope.hyxqUpdateQd = function(){
        let data = {
            id:$scope.meetingData.id,
            title : $scope.meetingData.title,
            start_time : $scope.meetingData.start_time,
            end_time : $scope.meetingData.end_time,
            sign_prompt : $scope.meetingData.sign_prompt,
            onwall_prompt : $scope.meetingData.onwall_prompt,
            logo : $scope.meetingData.logo
        };
        meetingServ.createOrUpdateMeeting($http, APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $scope.successDialog.status = true;
                $scope.meetingData.id = res.data.data;
            }
        })
    }
    /*******************主题相关  start******* */
    $scope.themeModel = {
        themSelId : 1
    }
    /**
     * 主题确认
     */
    $scope.themeQd = function(){
        let data = {
            id : $scope.meetingData.id,
            theme : $scope.meetingData.theme
        };
        meetingServ.createOrUpdateMeeting($http, APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $scope.successDialog.status = true;
            }
        })
    }


    /**
     * 获取所有主题
     */
    function selectAllTheme(){
        meetingServ.selectAllTheme($http, APPBASE).then(function(res){
            if(res.data.code === 0){
                $scope.themeAll=res.data.data;
                $scope.themeModel.themSelId = $scope.themeAll[0].id;
                // if($rootScope.hy_id){
                //     findThemeId();
                // }
            }
        })
    }
    /*******************主题相关  end******* */

    /************开幕墙相关start************** */
    $scope.openWellUpdataQd = function(){
        let data = {
            id : $scope.meetingData.id,
            open_text : $scope.meetingData.open_text
        };
        meetingServ.createOrUpdateMeeting($http, APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $scope.successDialog.status = true;
            }
        })
    }
    /************开幕墙相关end************** */
    

    /***********抽奖墙相关 start************* */
    
    $scope.hycjData = [];      //奖项集合
    
    $scope.mrpData = {
        meeting: $scope.meetingData.id,
        team:'',
        name:'',
        img:'',
        prize:'',
        count:'',
        once_count:''
    };
    /**
     * 获取所有奖项
     */
    function selectTestimonialByMeeting(){
        let data = {
            meeting : $scope.meetingData.id
        }
        meetingServ.selectTestimonialByMeeting($http, APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $scope.hycjData=res.data.data;
            }
        })
    }
    /**
     * 添加奖项
     */
    $scope.awardAddQd = function(){
        let data = $scope.mrpData;
        meetingServ.createTestimonial($http, APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $scope.hycjData.push(res.data.data);
            }
        })
    }
    /**
     * 删除奖项
     */
    $scope.awardDel = function(index,id){
        let data = {
            id : id
        };
        meetingServ.deleteTestimonialById($http, APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $scope.hycjData.splice(index,1);
            }
        })
    }
    /**
     * 上传奖品图片
     */
    $scope.uploadJpFile = function(event){
        let file = event.target.files;
        if(!file) return;
        let fileType = file[0].type;
        if(fileType.split('/')[0] !== 'image'){
            alert('请上传图片类型的文件');
            return;
        }
        let formData = new FormData();
        formData.append("file", file[0]);
        commonServ.uploadFile($http,APPBASE,formData).then(function(res){
            if(res.data.code === 0){
                $scope.mrpData.img = res.data.data;
            }
        });
        let fileInput = $('#jpFile');
        fileInput.after($compile(fileInput.clone().val(""))($scope));
        fileInput.remove();
    };
    /***********抽奖墙相关 end************* */

    /*****嘉宾设置 start********** */
    $scope.hyjbData = [];

    

    $scope.mdgObj = {
        meeting : $scope.meetingData.id,
        name : '',
        photo : '',
        simple_decription: ''
    }
    /**
     * 上传嘉宾图片
     */
    $scope.uploadJbFile = function(event){
        let file = event.target.files;
        if(!file) return;
        let fileType = file[0].type;
        if(fileType.split('/')[0] !== 'image'){
            alert('请上传图片类型的文件');
            return;
        }
        let formData = new FormData();
        formData.append("file", file[0]);
        commonServ.uploadFile($http,APPBASE,formData).then(function(res){
            if(res.data.code === 0){
                $scope.mdgObj.photo = res.data.data;
            }
        });
        let fileInput = $('#jbFile');
        fileInput.after($compile(fileInput.clone().val(""))($scope));
        fileInput.remove();
    };
    /**
     * 获取嘉宾信息
     */
    function selectMDGByMeetingId(){
        let data = {
            meeting : $scope.meetingData.id
        };
        meetingServ.selectMDGByMeetingId($http, APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $scope.hyjbData = res.data.data;
            }
        })
    }

    /**
     * 添加嘉宾
     */
    $scope.guestAddQd = function(){
        let data = $scope.mdgObj;
        meetingServ.createOrUpdateDG($http, APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $scope.hyjbData.push(res.data.data);
            }
        })
    }

    /**
     * 删除嘉宾
     */
    $scope.guestDel = function(index,id){
        let data = {
            id : id
        };
        meetingServ.deleteMDGByMDGId($http, APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $scope.hyjbData.splice(index,1);
            }
        })
    }

    /*****嘉宾设置 end********** */

    /***************闭幕墙 start*************** */
    $scope.closeWellUpdataQd = function(){
        let data = {
            id : $scope.meetingData.id,
            close_text : $scope.meetingData.close_text
        };
        meetingServ.createOrUpdateMeeting($http, APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $scope.successDialog.status = true;
            }
        })
    }
    /****************闭幕墙 end************** */

    /**
     * 关闭保存成功弹窗
     */
    $scope.dialogSureClick = function(){
        $scope.successDialog.status = false;
    };


    
}]