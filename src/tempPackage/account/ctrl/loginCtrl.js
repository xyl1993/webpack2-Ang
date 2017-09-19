
import {Base64} from '../../../js-plug/base64.js';
export default ['$scope', '$state', '$http', 'APPBASE','$cookies' ,'accountServ','md5',
    function ($scope, $state, $http, APPBASE,$cookies, accountServ,md5) {

    var reg = /^1[358][0-9]{9}$/;//手机验证
    $scope.errorShow={//错误信息对象
        phoneError:'',
        passwordError:'',
        phoneShow:false,
        passwordShow:false
    }
    //登录对象
    $scope.vmModel = {
        loginId:'',
        password:'',
        reme:false
    };
    let url=window.location.href;
    var roowNum;
    if(/roowNum/.test(url)){
        roowNum = url.split('=')[1];
    }
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
        if(!reg.test($scope.vmModel.loginId)) return;
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
                if(roowNum){
                    location.href=APPBASE.game_url+roowNum;
                }else{
                    $state.go('main.index');
                }
            }
            else if(res.data.code==8004){
                $scope.errorShow.phoneError=res.data.errorMessage;
                $scope.errorShow.phoneShow=true;    
            }else if(res.data.code==8018){//密码不正确
                $scope.errorShow.passwordError=res.data.errorMessage;
                $scope.errorShow.passwordShow=true;
                $scope.errorShow.phoneShow=false;    
            }else {//账号信息错误
                $scope.errorShow.phoneError=res.data.checkedMessage;
                $scope.errorShow.phoneShow=true;
            }
        })
    };

    $scope.tenxunLogin = function(){
        window.location.href="https://graph.qq.com/oauth2.0/authorize?" +
				"response_type=code&client_id="+APPBASE.qq_client_id+
				"&redirect_uri="+encodeURIComponent("http://www.yunzhujia.cn/login/wbQQLogin")+"&scope=get_user_info";
    };

    $scope.weiboLogin = function(){
        let baseUrl = 'http://www.yunzhujia.cn/crossdomain/weiboLogin.html';
        let url = roowNum?baseUrl+'?roowNum='+roowNum:baseUrl;
        window.location.href=" https://api.weibo.com/oauth2/authorize?" +
				"client_id="+APPBASE.sina_client_id+"&response_type=code" +
				"&redirect_uri="+url;
    };

    $scope.wxLogin = function(){
        let baseUrl = 'http://www.yunzhujia.cn/crossdomain/wxLogin.html';
        let url = roowNum?baseUrl+'?roowNum='+roowNum:baseUrl;
		window.location.href="https://open.weixin.qq.com/connect/qrconnect?appid="
        +APPBASE.wx_app_id+"&redirect_uri="+url+
        "&response_type=code&scope=snsapi_login"
    };
    $scope.phoneYz=function(){
        if($scope.vmModel.loginId!=undefined&&$scope.vmModel.loginId!=""){
            if(!reg.test($scope.vmModel.loginId)){
                $scope.errorShow.phoneError="手机格式不正确";
                $scope.errorShow.phoneShow=true;
            }
        }
    }
    $scope.categoryClick=function(){
        
    }

    $scope.xzmm = function(){
        $state.go('password.ensureAccount');
    }
}]
