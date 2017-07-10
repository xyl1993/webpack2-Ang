export default class {

    /**
     * 创建团队
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     * @param {*} token 
     */
    createTeam($http,APPBASE,data,token) {
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/flow/createTeam',
            headers : {'token':APPBASE.token,'deviceSystem':APPBASE.deviceSystem},
            data : JSON.stringify(data)
		})
    }
    /**
     * 根据手机号码获取用户
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} tel 
     */
    getUserByTel($http,APPBASE,tel) {
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/userInfo/getUserByTel?tel='+tel,
            headers : {'token':APPBASE.token,'deviceSystem':APPBASE.deviceSystem}
		})
    }
    /**
     * 获取团队成员 (参数:团队id)
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    getFlowTeamMember($http,APPBASE,data){
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/flow/getFlowTeamMember',
            data:data
		})
    }
    /**
     * 邀请团队成员加入
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    createTeamMember($http,APPBASE,data){
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/flow/createTeamMember',
            data:data
		})
    }
    /**
     * 移除团队成员
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    delFlowTeamMember($http,APPBASE,data){
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/flow/delFlowTeamMember',
            data:data
		})
    }
    /**
     * 删除团队
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    delFlowTeam($http,APPBASE,data){
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/flow/delFlowTeam',
            data:data
		})
    }
}