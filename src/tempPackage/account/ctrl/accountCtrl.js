import menuJson from '../data/menu.json';
require('../style/account.scss');
require('../style/resetPassword.scss');
import { client } from '../../../js-plug/client';
export default ['$scope', '$state', '$http', 'APPBASE', '$compile', 'accountServ',
    function ($scope, $state, $http, APPBASE, $compile, accountServ) {
        $scope.menuData = menuJson.data;
        /**
         * 跳转到智建云
         */
        let goProductPage = function(){
            let data = {
                login_id:'test',
                pwd:'098f6bcd4621d373cade4e832627b4f6',
                verify_code: ''
            };
            let data_phone = {
                username:'test',
                password:'098f6bcd4621d373cade4e832627b4f6',
                verify_code: ''
            }
                //电脑设备
            if(client.system.win || client.system.mac || (client.system.xll && !client.system.android)){
                $.getJSON("http://58.241.171.226:28090/RuYun_jiangong/ptCommon/doJsonpLogin.do?jsoncallback=?", data,
                function(resp, options) {
                    if(resp.total > 0){
                        window.open("http://58.241.171.226:28090/RuYun_jiangong/index.jsp");
                    }
                });
            }else{
                $.getJSON("http://58.241.171.226:28090/RuYun_jiangong_wx/user/doJsonpLogin?jsoncallback=?", data_phone,
                    function(resp, options) {
                        if(resp.flag == 1){
                        location.href="http://58.241.171.226:28090/RuYun_jiangong_wx/ry_erp/index.html";
                        }
                    });
            }
        }
        $scope.updataMenu = function (tag) {
            switch (tag) {
                case 0: $state.go('main.index');
                    break;
                case 1: $state.go('main.resources');
                    break;
                case 2: $state.go('main.connections.list');
                    break;
                case 3: 
                    goProductPage();
                    break;
            }
        }


    }]