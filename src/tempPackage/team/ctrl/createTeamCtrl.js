require('../style/team.scss');
import defaultImg from '../../../resources/images/default_img1.png';
export default ['$scope','$http','$log','APPBASE','$stateParams','teamServ','$state','accountServ',
    function( $scope,$http,$log,APPBASE,$stateParams,teamServ,$state,accountServ){
    
    $scope.teamMemberStatus =false;            //默认隐藏添加成员弹出框
    $scope.successDialog = {                   //显示成功弹窗
        status:false,
        infoText:'保存成功',
        btnText:'确&nbsp;&nbsp;定'
    };          
    $scope.teamModel = {                       //团队对象
        name:'',
        flowTeamMemberList:[

        ]
    };
    
    $scope.addMemberObj = {
        addMember:{},       //添加成员form对象
        teamMemberStatus:false   //组建的显示状态
    };//传递给添加成员组件的对象
    (function () {
        findUserByTokenResource();
    }());
    /**
     * 获取用户信息
     */
    function findUserByTokenResource(){
        accountServ.findUserByTokenResource($http,APPBASE).then(function(res){
            if(res.data.code === 0){
                $scope.yunzhujiaUser = res.data.data;
            }
        })
    }             

    /**
     * 添加成员
     */
    $scope.addTeamMember = function(){
        $scope.addMemberObj.teamMemberStatus = true;
    }
    /**
     * 保存成员.获取用户信息
     */
    $scope.getUserByTel = function(flag){
        let exitId = "#tel"+$scope.addMemberObj.addMember.tel;
        let exitIdDom = $(exitId);
        if(exitIdDom.length>0 || $scope.yunzhujiaUser.handPhone === $scope.addMemberObj.addMember.tel ){
            alert('用户已在团队中');
            return
        }
        teamServ.getUserByTel($http,APPBASE,$scope.addMemberObj.addMember.tel).then(function(res){
            let isRegist = false;
            let portrait = '';
            if(res.data.code === 0){
                isRegist = true;
                portrait = res.data.data.portrait;
            }else{
                portrait = defaultImg;
            }
            $scope.teamModel.flowTeamMemberList.push(
                {
                    memberName:$scope.addMemberObj.addMember.realName,
                    portrait:portrait,
                    memberTelphone:$scope.addMemberObj.addMember.tel,
                    isRegist:isRegist
                }
            );
            $scope.addMemberObj.addMember = {};
            $scope.addMemberObj.teamMemberStatus = flag;
        })
    }
    /**
     * 移除团队成员
     */
    $scope.removeMember = function(key){
        $scope.teamModel.flowTeamMemberList.splice(key,1);
    }
    /**
     * 创建团队
     */
    var submitStatus = false; //未点击提交按钮,防止重复提交
    $scope.createTeam = function(){
        if(submitStatus) return;
        submitStatus = true;
        let ajaxTeamModel = {                      //团队的ajax提交对象
            name:$scope.teamModel.name,
            flowTeamMemberList:[

            ]
        };          
        angular.forEach($scope.teamModel.flowTeamMemberList,function(data,index,array){
            ajaxTeamModel.flowTeamMemberList.push(
                {
                    memberName:data.memberName,
                    memberTelphone:data.memberTelphone
                }
            )
        })   
        teamServ.createTeam($http,APPBASE,ajaxTeamModel).then(function(res){
            if(res.data.code === 0){
                $scope.successDialog.status = true;
                submitStatus = false;
                sessionStorage.teamId=res.data.data.id;
            }
        })
    } 
    /**
     * 保存成功弹窗的按钮点击事件
     */
    $scope.dialogSureClick = function(){
        location.href=APPBASE.team_set_url;
    }
}]