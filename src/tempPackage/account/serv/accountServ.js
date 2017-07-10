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
    sendValidCodeRegist($http,APPBASE){
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/login/sendValidCodeRegist'
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
}