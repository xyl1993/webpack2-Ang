import defaultImg from '../../../resources/images/default_img1.png';
export default ['$scope','$http','$log','APPBASE','$stateParams','teamServ','$state',
    function( $scope,$http,$log,APPBASE,$stateParams,teamServ,$state){
    
    const teamId = sessionStorage.teamId;

    $scope.addMemberObj = {
        addMember:{},       //添加成员form对象
        teamMemberStatus:false   //组建的显示状态
    };//传递给添加成员组件的对象

    ;(function () {
        let data = {
            id:teamId
        }
        teamServ.getFlowTeamMember($http,APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $scope.teamList = res.data.data;
            }
        })
    }());

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
        let setData = [{
            workflowTeamId:teamId,
            memberTelphone:$scope.addMemberObj.addMember.tel,
            memberName:$scope.addMemberObj.addMember.realName
        }]
        teamServ.createTeamMember($http,APPBASE,setData).then(function(res){
            if(res.data.code === 0){
                let getData = {
                    id:teamId
                }
                teamServ.getFlowTeamMember($http,APPBASE,getData).then(function(res){
                    if(res.data.code === 0){
                        $scope.teamList = res.data.data;
                        $scope.addMemberObj.addMember = {};
                        $scope.addMemberObj.teamMemberStatus = flag;
                    }
                })
            }
        })
    }
    /**
     * 移除团队成员
     */
    $scope.removeMember = function(key,obj){

        $scope.infoData = {
            infoText:"是否确定移除该成员",
            sureText:"确&nbsp;&nbsp;定",
            status : true
        }

        $scope.infoSureClick = function(){
            let data = {
                workflowTeamId:teamId,
                userId:obj.userId,
                memberTelphone:obj.memberTelphone
            }
            teamServ.delFlowTeamMember($http,APPBASE,data).then(function(res){
                if(res.data.code === 0){
                    $scope.teamList.splice(key,1);
                    $scope.infoData.status = false;
                }
            })
        }

    }
    /**
     * 解散团队
     */
    $scope.delFlowTeam = function(){
        $scope.infoData = {
            infoText:"是否确定解散团队",
            sureText:"确&nbsp;&nbsp;定",
            status : true
        }
        $scope.infoSureClick = function(){
            let data = {
                id:teamId
            };
            teamServ.delFlowTeam($http,APPBASE,data).then(function(res){
                if(res.data.code === 0){
                    $scope.infoData.status = false;
                    $state.go('main.workFlow.default');
                }
            })  
        }
    }

}]