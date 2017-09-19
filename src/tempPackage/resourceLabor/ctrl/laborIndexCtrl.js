export default ['$scope','APPBASE','$state','$http',
    function( $scope,APPBASE,$state,$http) {
    $scope.miniMenuClick = function(){
        $('.labor_menu').toggle();
    }
}]