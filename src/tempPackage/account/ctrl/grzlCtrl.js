require('../style/grzl.scss');
import {yunUtil} from '../../../js-plug/util';
export default ['$scope', '$state', '$http', 'APPBASE', '$compile', 'accountServ','commonServ','$cookies','$location',
    function ($scope, $state, $http, APPBASE, $compile, accountServ,commonServ,$cookies,$location) {

        $scope.grzlModel = {};

        $scope.sexObj = {
            selName:'',    //选择的性别
            status:false,
            emptyObj:{
                id:'',
                name:''
            },
            typeList:[{
                id:0,
                name:'保密'
            },{
                id:1,
                name:'男'
            },{
                id:0,
                name:'女'
            }]    //传递给组建的类型集合
        };
        $scope.educationObj = {
            selName:'',    //选择的性别
            status:false,
            emptyObj:{
                id:'',
                name:''
            },
            typeList:[{
                id:0,
                name:'博士及以上'
            },{
                id:1,
                name:'硕士'
            },{
                id:2,
                name:'本科'
            },{
                id:3,
                name:'大专'
            },{
                id:4,
                name:'中专'
            },{
                id:5,
                name:'高中'
            },{
                id:6,
                name:'初中及以下'
            }]    
        };
        $scope.industryObj = {
            selName:'',    //选择的性别
            status:false,
            emptyObj:{
                id:'',
                name:''
            },
            typeList:[{
                id:'房屋工程建筑',
                name:'房屋工程建筑'
            },{
                id:'土木工程建筑',
                name:'土木工程建筑'
            },{
                id:'建筑安装业',
                name:'建筑安装业'
            },{
                id:'其他建筑业',
                name:'其他建筑业'
            }]    
        };
        ;(function () {
            $.datetimepicker.setLocale('zh'); 
            $('#birth').datetimepicker({
                format:'Y-m-d',
                timepicker:false
            });
            personalData();
        }());

        function personalData(){
            accountServ.personalData($http,APPBASE).then(function(res){
                if(res.data.code === 0){
                    let userInfo = res.data.data.userInfo;
                    userInfo.birth  = userInfo.birth?yunUtil.getSmpFormatDateByLong(userInfo.birth,false):'';
                    if(typeof(userInfo.sex) !== 'undefined'){
                        $scope.sexObj.selName = $scope.sexObj.typeList[userInfo.sex].name;
                    }
                    if(typeof(userInfo.education) !== 'undefined'){
                        $scope.educationObj.selName = $scope.educationObj.typeList[userInfo.education].name;
                    }
                    $scope.industryObj.selName = userInfo.industry;
                    $scope.grzlModel = {
                        nickName : userInfo.account.nickName,
                        realName : userInfo.realName,
                        sex : userInfo.sex,
                        education : userInfo.education,
                        industry:userInfo.industry,
                        enterprise : userInfo.enterprise,
                        contactAddress:userInfo.contactAddress,
                        handPhone : userInfo.handPhone,
                        birth : userInfo.birth,
                        portrait : userInfo.portrait
                    };
                    if(userInfo.handPhone){
                        $('#handPhone').setAttribute('disabled','disabled');
                    }
                }
            })
        }

        $scope.typeSureClick = function(type,data){
            if(type === 'sex'){
                $scope.sexObj.selName = data.name;
                $scope.grzlModel.sex = data.id;
            }else if(type === 'education'){
                $scope.educationObj.selName = data.name;
                $scope.grzlModel.education = data.id;
            }else if(type === 'industry'){
                $scope.industryObj.selName = data.name;
                $scope.grzlModel.industry = data.id;
            }
        }

        $scope.uploadFile = function(event){
            let file = event.target.files;
            if(!file) return;
            let fileName = file[0].name;
            let fileType = file[0].type;
            if(fileType.split('/')[0] !== 'image'){
                return;
            }
            let formData = new FormData();
            formData.append("file", file[0]);
            commonServ.uploadFile($http,APPBASE,formData).then(function(res){
                if(res.data.code === 0){
                    let file_path = res.data.data;
                    $scope.grzlModel.portrait = file_path;
                }
            });
        };
        $scope.successDialog = {                   //显示成功弹窗
            status:false,
            infoText:'保存成功',
            btnText:'确&nbsp;&nbsp;定'
        }; 
        $scope.dialogSureClick = function(){
            $scope.successDialog.status = false;
        };
        $scope.submit = function(){
            let data = {
                nickName :$scope.grzlModel.nickName,
                userInfo:$scope.grzlModel
            }
            accountServ.updateUserInfoResource($http,APPBASE,data).then(function(res){
                if(res.data.code === 0){
                    $scope.successDialog.status = true;
                }
            })
        }

        $scope.grzlLoginOut = function(){
                accountServ.loginOut($http,APPBASE).then(function(res){
                    
                    if(res.data.code === 0 || res.data.code === 8020 || res.data.code === 8010){
                        sessionStorage.removeItem("token");
                        if($cookies.get("userName") && $cookies.get("password")){
                            //清除原有的cookie
                            $cookies.remove("password");
                        }
                        $scope.token = null;
                        $state.go('main.index');
                        // if(APPBASE.requireToeknStates.test($location.url())){
                        //     $state.go('main.index');
                        // }
                    }
                })
            }
}]