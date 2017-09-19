require('../style/labor-user.scss');
export default ['$scope','APPBASE','$state','$http','accountServ',
    function( $scope,APPBASE,$state,$http,accountServ) {
        
    ; (function () {
        let token = sessionStorage.getItem('token');
        if(token){
            accountServ.findUserByTokenResource($http,APPBASE).then(function(res){
                if(res.data.code === 0){
                    $scope.userData = res.data.data;
                }
            })
        }
    }());
}]