require('./navbar.scss');
import template from './navbar.html'

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
            var state_name = $state.current.name.split('.')[1];
            $('#'+state_name).siblings('.active').removeClass('active');
            $('#'+state_name).addClass('active');
        	$(element).find('.list-row').click(function(){
        		if(!$(this).hasClass('active')){
					$(this).siblings('.active').removeClass('active');
	        		$(this).addClass('active');
	        		var tag = $(this).data('tag');
	        		switch(tag){
	        			case 0:$state.go('main.index');
	        			break;
                        case 1:$state.go('main.resources');
                        break;
	        		}
        		}
        	})
            scope.loginOut = function(){
                accountServ.loginOut($http,APPBASE).then(function(res){
                    if(res.data.code === 0){
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
