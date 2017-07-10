import navJson from '../data/menu.json';
require('../style/resourcesHome.scss');
export default ['$scope','APPBASE','$state',function( $scope,APPBASE,$state) {

    $scope.menu = navJson.data;

            /*切换目录*/
    $scope.menuClick = function(id){
    	var src = "";

        switch(id){
        	case '3': $state.go('main.workFlow.default');break;
        }
        
    }
}]