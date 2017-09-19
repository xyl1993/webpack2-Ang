require('./footer.scss');
import template from './footer.html'

export default ['$state','$http','APPBASE','accountServ','$cookies','$timeout','$location',
    function($state,$http,APPBASE,accountServ,$cookies,$timeout,$location){
    return {
        restrict: 'EA',
        template: template,
        link:function(scope,element,iAttrs){
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
                scope.token = sessionStorage.getItem('token');
        		if(!$(this).hasClass('active')){
					$(this).siblings('.active').removeClass('active');
	        		$(this).addClass('active');
	        		var tag = $(this).data('tag');
	        		switch(tag){
	        			case 0:$state.go('main.index');
	        			    break;
                        case 1:$state.go('main.resources');
                            break;
                        case 2:if(!scope.token){
                                $state.go('main.login');
                                $(this).removeClass('active');
	        		            $('.my').addClass('active');
                            }else{
                                $state.go('main.connections.list');
                            }
                            break;
                        case 3:if(!scope.token){
                                $state.go('main.login');
                                $(this).removeClass('active');
	        		            $('.my').addClass('active');
                            }else{
                                $state.go('main.grzl');
                            }
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
        }
    };
}]

