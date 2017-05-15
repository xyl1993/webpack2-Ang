import mainTemplate from '../tempPackage/main/main.html';
import indexTemplate from '../tempPackage/index/index.html';
import resourcesHomeTemplate from '../tempPackage/resourcesHome/resourcesHome.html';
import articleDetailTemplate from '../tempPackage/articleDetail/index.html';

export default ['$stateProvider','$urlRouterProvider','$locationProvider','$compileProvider',
    function( $stateProvider, $urlRouterProvider, $locationProvider,$compileProvider) {
        
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
    $urlRouterProvider.otherwise( '/main/index' );

    $stateProvider
        .state( 'main', {
            url: '/main',
            template: mainTemplate,
            controller: 'mainController'
        } )
        .state( 'main.index', {
            url: '/index',
            template: indexTemplate,
            controller: 'indexController'
        } )
        .state( 'main.resources', {
            url: '/resources',
            //abstract: true,  //表明此状态不能被显性激活，只能被子状态隐性激活
            template: resourcesHomeTemplate,
            controller: 'resourcesHomeController'
        } )
        .state( 'main.articleDetail', {
            url: '/articleDetail/:id',
            //abstract: true,  //表明此状态不能被显性激活，只能被子状态隐性激活
            template: articleDetailTemplate,
            controller: 'articleDetailCtrl'
        } )

    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // })
    $locationProvider.hashPrefix('!');
}]
