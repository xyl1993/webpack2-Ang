require('../style/main.scss');
export default ['$scope', '$log', '$state','$rootScope', 'APPBASE','$http','md5',
    function($scope, $log, $state, $rootScope,APPBASE,$http,md5) {
    
    $scope.ctrl = {
        speed: 500,
        mainViewStyle: 'anim-fade',
        page1Style: 'anim-swap',
        page2Style: 'anim-slide-below-fade'
    }
    
    let token = sessionStorage.getItem("token");
    $scope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState) {
          var toStateUrl = toState.name;
          if(APPBASE.requireToeknStates.test(toStateUrl)){
             if(!token){
                 $state.go('account.login');
             }
          }
          $log.info(toStateUrl);
          if(toStateUrl.split('.').length>2){
              $scope.headerStyle = {
                  height: '80px'
              }
          }else{
            switch(toStateUrl.split('.')[1]){
                case 'createTeam':
                case 'teamSet':
                case 'workFlow_noTeam':
                    $scope.headerStyle = {
                        height: '80px'
                    }
                break;
                default : 
                    $scope.headerStyle = {
                        height: '512px'
                    }
                break;
            }
            
          }
      })
}]
