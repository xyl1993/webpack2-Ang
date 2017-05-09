require('../style/main.scss');
export default ( $scope,$log,APPBASE)=> {

    'ngInject';
    $scope.ctrl = {
        speed:500,
        mainViewStyle:'anim-fade',
        page1Style: 'anim-swap',
        page2Style:'anim-slide-below-fade'
    }
    $log.info($scope.ctrl);
}