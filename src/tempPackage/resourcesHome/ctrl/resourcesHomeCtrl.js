import navJson from '../data/menu.json';
require('../style/resourcesHome.scss');
export default ['$scope','APPBASE','$state',function( $scope,APPBASE,$state) {

    $scope.menu = navJson.data;

    $scope.infoData = {
        status:false,
        infoText:'敬请期待'
    };


    /*切换目录*/
    $scope.menuClick = function(id){
    	var src = "";

        switch(id){
        	case '3': $state.go('main.workFlow.default');break;
            case '0': $state.go('main.labor.index.laborMaybeLike');break;
            default:$scope.infoData.status = true;break;
        }
        
    }


}]