export default ['$scope', '$state', '$http', 'APPBASE', '$compile', 'accountServ','$interval',
    function ($scope, $state, $http, APPBASE, $compile, accountServ,$interval) {
        
        $scope.login = function(){
            $state.go('account.login');
        }
        
    }]