/**
 * 认证相关
 */
import { client } from '../js-plug/client';
export default ['$rootScope','$q','$window','$injector','APPBASE',
    function($rootScope, $q, $window, $injector,APPBASE){

    return {
        request: function (config) {
            var allowUrls = new RegExp(APPBASE.allowUrls);//'g'
            let token = sessionStorage.getItem('token');
            if(!allowUrls.test(config.url)){
                config.headers['token'] = token;
            }
            config.headers = config.headers || {};
            // config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json;charset=UTF-8';
            config.headers['deviceSystem'] = APPBASE.deviceSystem;

            return config;
        },
        response: function (response) {
            if(response.data.code === 8010){
                if(client.system.win || client.system.mac || (client.system.xll && !client.system.android)){
                    location.href = APPBASE.login_path;
                }else{
                    location.href = APPBASE.app_login_path;
                }
            }
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            if (rejection && rejection.status === 403) {
                // location.href = APPBASE.loginPath;
            } else {
                alert('服务器异常');
            }
            return rejection || $q.when(rejection);
        },
        requestError: function (rejection) {
            alert('服务器异常');
            return rejection || $q.when(rejection);
        }
    };
}]