import {Base64} from '../../../js-plug/base64.js';
export default ['$scope', '$state', '$http', 'APPBASE','$cookies' ,'accountServ','md5',
    function ($scope, $state, $http, APPBASE,$cookies, accountServ,md5) {

    //登录对象
    $scope.vmModel = {
        loginId:'',
        password:'',
        reme:false
    };

    (function () {
        let userNameValue = $cookies.get("userName");
        let passwordValue = $cookies.get("password");
        if(passwordValue){
            passwordValue = new Base64().decode($cookies.get("password")); //解密
        }

        $scope.vmModel.loginId = userNameValue;
        if(userNameValue && passwordValue) {
            $scope.vmModel.reme = true;
            $scope.vmModel.password = passwordValue;
        }
    }());
    
    $scope.submit = function(){
        let data={
            'loginId':$scope.vmModel.loginId,
            'password': md5.createHash($scope.vmModel.password.toLowerCase()).substring(0,15)
        };
        accountServ.userWebLoginResource($http,APPBASE,data).then(function(res){
            if(res.data.code === 0){
                sessionStorage.setItem('token',res.data.data.account.token);
                if($scope.vmModel.reme){//记住我的状态
                    //将用户名和密码保存到cookie
                    $cookies.put("userName",$scope.vmModel.loginId);
                    $cookies.put("password",new Base64().encode($scope.vmModel.password.toLowerCase()));
                }
                $state.go('main.index');
            }
        })
    };

    $scope.tenxunLogin = function(){
        window.location.href="https://graph.qq.com/oauth2.0/authorize?" +
				"response_type=code&client_id="+APPBASE.qq_client_id+
				"&redirect_uri="+APPBASE.qq_redirect_uri+"&scope=get_user_info&state=1";
    };

    $scope.weiboLogin = function(){
        window.location.href=" https://api.weibo.com/oauth2/authorize?" +
				"client_id="+APPBASE.sina_client_id+"&response_type=code" +
				"&redirect_uri="+APPBASE.third_redirect_url;
    };

    $scope.wxLogin = function(){
		window.location.href="https://open.weixin.qq.com/connect/qrconnect?appid="
        +APPBASE.wx_app_id+"&redirect_uri="+APPBASE.wx_redirect_url+
        "&response_type=code&scope=snsapi_login&state=wxstate"
    };
}]