export default class {

    /**
     * 登录
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    userWebLoginResource($http,APPBASE,data) {
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/login/userWebLoginResource',
            data:data
		})
    }
    /**
     * 获取用户信息
     * @param {*}  
     * @param {*} APPBASE 
     */
    findUserByTokenResource($http,APPBASE){
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/login/findUserByTokenResource'
		})
    }
    /**
     * 退出登录
     * @param {*}  
     * @param {*} APPBASE 
     */
    loginOut($http,APPBASE){
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/login/loginOut'
		})
    }
    /**
     * 获取验证码
     * @param {*}  
     * @param {*} APPBASE 
     */
    sendValidCodeRegist($http,APPBASE,data){
        return $http({
			method : 'post',
            url : APPBASE.base_api_host+'/login/sendValidCodeRegist',
            data:data
		})
    }
    /**
     * 忘记密码获取验证码
     * @param {*}  
     * @param {*} APPBASE 
     */
    sendValidCode($http,APPBASE,data){
        return $http({
            data:data,
			method : 'post',
			url : APPBASE.base_api_host+'/login/sendValidCode'
		})
    }
    /**
     * 注册
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    userWebRegistResource($http,APPBASE,data){
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/login/userWebRegistResource',
            data:data
		})
    }
    /**
     * userlogin
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
     userLoginResource($http,APPBASE,data){
        return $http({
            data:data,
			method : 'post',
			url : APPBASE.base_api_host+'/login/userLoginResource',
		})
    }
    /**
     * 修改密码
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
     setPassword($http,APPBASE,data){
        return $http({
            data:data,
            method : 'post',
			url:APPBASE.base_api_host+'/login/setPassword'
		})
    }
    /**
     * 获取个人信息
     */
    personalData($http,APPBASE){
        return $http.post(APPBASE.base_api_host + '/userInfo/personalData')
    }
    /**
     * 更新个人资料
     */
    updateUserInfoResource($http,APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/userInfo/updateUserInfoResource',data)
    }
    /**
     * 修改密码
     */
    updatePassword($http,APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/account/updatePassword',data)
    }
}