export default ['$scope', '$state', '$http', 'APPBASE', '$compile', 'accountServ','$interval','$stateParams',
    function ($scope, $state, $http, APPBASE, $compile, accountServ,$interval , $stateParams) {

    $scope.telephone = $stateParams.telephone;

    $scope.validcodeTiShi = '';

    $scope.text="获取验证码";  

    let validStatus = true;   //可以发送验证码

    let f_time = function(){
        let time = 60;
        $scope.validcodeTiShi = '';
        let stop = $interval(
            function(){
                if(time>0){
                    time--;
                    $scope.text = time + "秒后重发";
                    $("#btn-send").addClass("getting");
                    validStatus = false;
                    //发送验证码的时间内手机号码不允许修改
                }else{
                    $interval.cancel(stop);
                    $scope.text="重新发送";
                    $("#btn-send").removeClass("getting");
                    validStatus = true;
                }
            }
            ,1000);
    };
    $scope.setValid = function(){
        let data = {'telphone':$scope.telephone};
        if(validStatus){
            accountServ.sendValidCode($http,APPBASE,data).then(function(res){
                if(res.data.code === 0){
                    f_time();
                } else {
                    $scope.validcodeTiShi = res.data.errorMessage;
                }
            })
        }
    }

    $scope.next = function(){
        var myreg = /^[0-9]{4}$/;

        if(!$scope.validCode){
            $scope.validcodeTiShi = '验证码为空！';
            return false;
        }

        if(!myreg.test($scope.validCode)){
            $scope.validcodeTiShi = '验证码不合法！' ;
            return false; 
        }
        
        let data = {
            'telphone':$scope.telephone,
            'validCode':$scope.validCode
        }
        accountServ.userLoginResource($http,APPBASE,data).then(function(res){
            if(res.data.code === 0){
                var token = res.data.data.account.token;
                 var name = res.data.data.account.loginId;
				sessionStorage.removeItem("token");
                sessionStorage.setItem("token" , token);
                sessionStorage.removeItem("name");
                sessionStorage.setItem("name" , name);
                $state.go('password.xgmm');
            } else {
                $scope.validcodeTiShi = res.data.errorMessage;
            }
        })
    };
    // 回车键设置
    $scope.nextStep = function(e){
        //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
        var keycode = window.event?e.keyCode:e.which; 
        if(keycode==13){
            $scope.next();
        }
    }
}]