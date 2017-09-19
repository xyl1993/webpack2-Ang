require('./navbar.scss');
import { client } from '../../../../js-plug/client';
import template from './navbar.html'

export default ['$state','$http','APPBASE','accountServ','$cookies','$timeout','$location','md5',
    function($state,$http,APPBASE,accountServ,$cookies,$timeout,$location,md5){
    return {
        restrict: 'EA',
        template: template,
        link:function(scope,element,iAttrs){
            scope.updatePwdStatus = false;
            scope.token = sessionStorage.getItem('token');
            if(scope.token){
                accountServ.findUserByTokenResource($http,APPBASE).then(function(res){
                    if(res.data.code === 0){
                        scope.userData = res.data.data;
                    }
                })
            }
            let state_name = $state.current.name.split('.')[1];
            if(APPBASE.resourcesView.test(state_name)){
                state_name = 'resources';
            }else if(state_name === 'connections'){
                state_name = 'connections';
            }
            $('#'+state_name).siblings('.active').removeClass('active');
            $('#'+state_name).addClass('active');

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
        	$(element).find('.list-row').click(function(){
        		if(!$(this).hasClass('active')){
                    var tag = $(this).data('tag');
                    if(tag !==3){
                        $(this).siblings('.active').removeClass('active');
	        		    $(this).addClass('active');
                    }
	        		switch(tag){
	        			case 0:$state.go('main.index');
	        			    break;
                        case 1:$state.go('main.resources');
                            break;
                        case 2:$state.go('main.connections.list');
                            break;
                        case 3: goProductPage();
                            break;
                            
	        		}
        		}
        	})
            scope.loginOut = function(){
                accountServ.loginOut($http,APPBASE).then(function(res){
                    if(res.data.code === 0 || res.data.code === 8020 || res.data.code === 8010){
                        sessionStorage.removeItem("token");
                        if($cookies.get("userName") && $cookies.get("password")){
                            //清除原有的cookie
                            $cookies.remove("password");
                        }
                        scope.token = null;
                        if(APPBASE.requireToeknStates.test($location.url())){
                            $state.go('main.index');
                        }
                    }
                })
            }
            let cleanPwd = function(){
                scope.pwd.password = '';
                scope.pwd.newpassword = '';
                scope.pwd.curpassword = '';
            }
            scope.updatePwd = function(){
                scope.pwd = {};
                scope.updatePwdStatus = true;
            }
            scope.closeUpdatePwd = function(){
                scope.updatePwdStatus = false;
                cleanPwd();
            }
            scope.subUpdatePwd =function(){
                
                let oldPassword =  md5.createHash(scope.pwd.password.toLowerCase()).substring(0,15);
			    let newPassword =  md5.createHash(scope.pwd.newpassword.toLowerCase()).substring(0,15);
                let data= {
                    oldPassword : oldPassword,
                    newPassword : newPassword
                }
                accountServ.updatePassword($http,APPBASE,data).then(function(res){
                    let code = res.data.code;
                    switch(code){
                        case 0:
                            scope.successDialog = {                   //显示成功弹窗
                                status:true,
                                infoText:'保存成功,点击确定重新登录',
                                btnText:'确&nbsp;&nbsp;定'
                            }; 
                            scope.dialogSureClick = function(){
                                if($cookies.get("userName") && $cookies.get("password")){
                                    //清除原有的cookie
                                    $cookies.remove("password");
                                }
                                $state.go('account.login');
                                scope.successDialog.status = false;
                                scope.updatePwdStatus = false;
                            };
                        break;
                        case 8019:
                            scope.oldPwdErr = true;
                        break
                        default:break;
                    }
                })
            }
        }
    };
}]
