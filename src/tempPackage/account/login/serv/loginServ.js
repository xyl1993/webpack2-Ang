export default class {

    /**
     * 登录
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    userWebLogin($http,APPBASE,data) {
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/login/userWebLoginResource',
            data:data,
            headers:{'deviceSystem' : APPBASE.deviceSystem}
		})
    }
    
}