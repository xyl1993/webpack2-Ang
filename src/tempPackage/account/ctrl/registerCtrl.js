export default ['$scope', '$state', '$http', 'APPBASE', '$compile', 'accountServ', '$interval', 'md5',
    function ($scope, $state, $http, APPBASE, $compile, accountServ, $interval, md5) {
        $scope.passWordTiShi = false;//密码错误提示
        $scope.passWordInfo = "";
        $scope.phoneInfo = "用户名支持中文、字母、数字、'-' '_'的组合，4-20个字符";
        $scope.text = "发送验证码";
        $scope.ifAgree = true;
        var passWordReg = /^[a-zA-Z\d]{6,16}$/;
        var reg = /^1[358][0-9]{9}$/;//手机验证
        let validStatus = true;   //可以发送验证码
        let f_time = function () {
            let time = 60;
            let stop = $interval(
                function () {
                    if (time > 0) {
                        time--;
                        $scope.text = time + "秒后重发";
                        $("#btn-send").addClass("getting");
                        validStatus = false;
                        //发送验证码的时间内手机号码不允许修改
                        $("input[name='telphone']").attr("disabled", true);
                    } else {
                        $interval.cancel(stop);
                        $scope.text = "重新发送";
                        $("#btn-send").removeClass("getting");
                        validStatus = true;
                        $("input[name='telphone']").attr("disabled", false);
                    }
                }
                , 1000);
        };
        $scope.setValid = function () {
            if (reg.test($scope.telphone)) {
                $scope.phoneShow = false;
                let data = {
                    'telphone': $scope.telphone
                }
                accountServ.sendValidCodeRegist($http, APPBASE, data).then(function (res) {
                    if (res.data.code === 0) {
                        $('.sj').css('color', '#999999');
                        $scope.phoneInfo = "用户名支持中文、字母、数字、'-' '_'的组合，4-20个字符";
                        f_time();
                    } else if (res.data.code === 8049) {
                        $('.sj').css('color', 'red');
                        $scope.phoneInfo = res.data.checkedMessage;
                    } else if (res.data.code === 8011) {
                        $('.sj').css('color', 'red');
                        $scope.phoneInfo = res.data.errorMessage;
                    }

                })
            } else {
                $('.sj').css('color', 'red');
                $scope.phoneShow = true;
                $scope.phoneInfo = "手机号码格式不正确";
            }

        }
        /**
         * 注册
         */
        $scope.confirm = function () {
            let ifTrue = formIfNull();
            if (!ifTrue) return;
            let password = md5.createHash($scope.password.toLowerCase()).substring(0, 15);
            let data = {
                'telphone': $scope.telphone,
                'validCode': $scope.validCode,
                'password': password
            }
            accountServ.userWebRegistResource($http, APPBASE, data).then(function (res) {
                if (res.data.code === 0) {
                    $state.go('account.login');
                } else if (res.data.code === 8015) {
                    $scope.yzmInfo = res.data.errorMessage;
                    $scope.yzmShow = true;
                }
            })
        };
        /**
         * 表单空验证
         */
        function formIfNull() {
            let ifTrue = true;
            if (!reg.test($scope.telphone)) {//手机号码是否为空
                $('.sj').css('color', 'red');
                $scope.phoneShow = true;
                $scope.phoneInfo = "手机号码格式不正确";
                ifTrue = false;
            }
            if ($scope.validCode == undefined) {
                $scope.yzmInfo = "验证码不可为空";
                $scope.yzmShow = true;
                ifTrue = false;
            }
            if ($scope.password == undefined || $scope.rePassword == undefined) { //密码是否为空
                $scope.passWordInfo = "密码和确认密码不可为空"
                $scope.passWordTiShi = true;
                ifTrue = false;
            }
            if (!$scope.ifAgree) {// 石佛选择用户协议
                $scope.zsInfo = "您还未接受云主筑加用户协议"
                $scope.zsTiShi = true;
                ifTrue = false;
            } else {
                $scope.zsTiShi = false;
            }
            return ifTrue;
        }
        /**
         * 密码验证
         */
        $scope.passWordYz = function () {
            if ($scope.password != $scope.rePassword && $scope.password != undefined && $scope.rePassword != undefined) {//一致性判断
                $scope.passWordTiShi = true;
                $scope.passWordInfo = "两次密码输入不一致";
            } else {
                $scope.passWordTiShi = false;
            }
            if ($scope.password != undefined) {//密码格式判断
                if (!passWordReg.test($scope.password)) {
                    $scope.passWordInfo = "密码由数字或字母组成的6—16位字符"
                    $scope.passWordTiShi = true;
                }
            }
            if ($scope.rePassword != undefined) {//确认密码格式判断
                if (!passWordReg.test($scope.rePassword)) {
                    $scope.passWordInfo = "确认密码由数字或字母组成的6—16位字符"
                }
            }
        }
        $scope.tenxunLogin = function(){
            window.location.href="https://graph.qq.com/oauth2.0/authorize?" +
                "response_type=code&client_id="+APPBASE.qq_client_id+
                "&redirect_uri="+encodeURIComponent("http://www.yunzhujia.cn/login/wbQQLogin")+"&scope=get_user_info";
        };

        $scope.weiboLogin = function(){
            window.location.href=" https://api.weibo.com/oauth2/authorize?" +
                "client_id="+APPBASE.sina_client_id+"&response_type=code" +
                "&redirect_uri="+"http://www.yunzhujia.cn/crossdomain/weiboLogin.html";
        };

        $scope.wxLogin = function(){
            window.location.href="https://open.weixin.qq.com/connect/qrconnect?appid="
                +APPBASE.wx_app_id+"&redirect_uri="+"http://www.yunzhujia.cn/crossdomain/wxLogin.html"+
                "&response_type=code&scope=snsapi_login"
        };
       
        $(function () {
            $('#telphone').keydown(function () {
                $('.sj').css('color', '#999999');
                $scope.phoneInfo = "用户名支持中文、字母、数字、'-' '_'的组合，4-20个字符";
            });
            $('#validCode').keydown(function () {
                $scope.yzmShow = false;
            });
        });
    }]