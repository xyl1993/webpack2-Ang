/**
 * 认证相关
 */
export default ['$rootScope','$q','$window','$injector','APPBASE',
    function($rootScope, $q, $window, $injector,APPBASE){

    return {
        request: function (config) {
            config.headers = config.headers || {};
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
            // if ($window.sessionStorage.token) {
            //     config.headers['Content-Type'] = 'application/json';
            // }
            return config;
        },
        response: function (response) {
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            if (rejection && rejection.status === 403) {
                //location.href = APPBASE.loginPath;
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