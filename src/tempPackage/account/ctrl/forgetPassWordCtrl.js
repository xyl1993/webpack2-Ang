export default ['$scope', '$state', '$http', 'APPBASE', '$compile', 'accountServ','$interval',
    function ($scope, $state, $http, APPBASE, $compile, accountServ,$interval) {

    $scope.text="获取验证码";    
    let validStatus = true;   //可以发送验证码
    let f_time = function(){
        let time = 60;
        let stop = $interval(
            function(){
                if(time>0){
                    time--;
                    $scope.text = time + "秒后重发";
                    $("#btn-send").addClass("getting");
                    validStatus = false;
                    //发送验证码的时间内手机号码不允许修改
                    $("input[name='telphone']").attr("disabled",true);
                }else{
                    $interval.cancel(stop);
                    $scope.text="重新发送";
                    $("#btn-send").removeClass("getting");
                    validStatus = true;
                    $("input[name='telphone']").attr("disabled",false);
                }
            }
            ,1000);
    };
    $scope.setValid = function(){

        if(validStatus && $scope.regForm.tel.$valid){
            accountServ.sendValidCodeRegist($http,APPBASE).then(function(res){
                if(res.data.code === 0){
                    f_time();
                }
            })
        }
        
    }

    $scope.confirm = function(){
        let password = md5.createHash($scope.password.toLowerCase()).substring(0,15)
        let data = {
            'telphone':$scope.telphone,
            'validCode':$scope.validCode
        }
        accountServ.userWebRegistResource($http,APPBASE,data).then(function(res){
            if(res.data.code === 0){
                $state.go('account.login');
            }
        })
    };
}]