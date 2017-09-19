    export default ['$scope', '$state', '$http', 'APPBASE', '$compile', 'accountServ','$interval','md5',
    function ($scope, $state, $http, APPBASE, $compile, accountServ,$interval,md5) {

        $scope.token = sessionStorage.getItem("token");
        $scope.name = sessionStorage.getItem('name');
        $scope.passwordTiShi = '';
        $scope.repeatPasswordTiShi = '';
        $scope.passwordDisaccordTiShi = '';

        // var myreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;

         var myreg =  /^[a-zA-Z\d]{6,16}$/;

        $scope.firstPasswordValid = function(){
            if(!$scope.password){
                $scope.passwordTiShi = '密码为空！' ;
            } else if(!myreg.test($scope.password)){
                $scope.passwordTiShi = '密码是由数字或字母组成的6—16位字符！' ;
            } 
        }

        $scope.passwordChange = function(){
            $scope.passwordTiShi = '' ;
        }

        $scope.repeatPasswordChange = function(){
            $scope.repeatPasswordTiShi = '';
        }

        $scope.confirm = function () {

            if(!$scope.password){
                $scope.passwordTiShi = '密码为空！';
                return;
            } else if(!myreg.test($scope.password)){
                $scope.passwordTiShi = '密码是由数字或字母组成的6—16位字符！' ;
                return;
            }

            if(!$scope.repeatPassword){
                $scope.repeatPasswordTiShi = "密码为空！";
                return;
            } else if(!myreg.test($scope.repeatPassword)){
                $scope.repeatPasswordTiShi = '密码是由数字或字母组成的6—16位字符！' ;
                return; 
            }
            
            // 密码验证
            if ($scope.password != $scope.repeatPassword && $scope.password != undefined && $scope.repeatPassword != undefined) {
                $scope.repeatPasswordTiShi = '两次密码输入不一致！';
                return;
            } else {
                if(!$scope.token){
                    alert('token为空，请返回登录界面！');
                    return;
                }
                var password = md5.createHash($scope.password.toLowerCase()).substring(0,15); //密码加密
                var data={'password':password};
               
                accountServ.setPassword($http,APPBASE,data).then(function(res){
                    if(res.data.code == 0){
                        sessionStorage.removeItem("token");
                        sessionStorage.removeItem("name");
                        $state.go('password.xgmmcg');
                    }
                })
            }
        };
        // 回车键设置
        $scope.nextStep = function(e){
            //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
            var keycode = window.event?e.keyCode:e.which; 
            if(keycode==13){
                $scope.confirm();
            }
        }
    }]