require('./resources/css/common.scss');

import global from './global/global.js';
import routes from './global/router.js';

import interceptors from './global/interceptors.js';
import controllers from './global/appCtrl.js';
import directives from './global/appDirective.js';
import services from './global/appServ.js';
import factory from './factory/appFactory.js';

/*路由加载动画模块*/
import animInOut from './js-plug/anim-in-out/anim-in-out.js';
/*repeat动画模块*/
import repeatAnimate from './factory/animate.js';

//模块化
export default angular
    .module('app', [
        'ngSanitize',
        'ui.router',
        'ngResource',

        global,
        controllers,
        directives,
        services,
        factory,
        repeatAnimate,
        animInOut
    ])
    .run(['$rootScope', '$state', '$http', '$stateParams', '$location', '$timeout', '$window',
        function($rootScope, $state, $http, $stateParams, $location, $timeout, $window) {
            $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState) {});
        }
    ])
    .config(['$sceDelegateProvider','APPBASE',function($sceDelegateProvider,APPBASE) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            APPBASE.white_resource_url
        ]);
    }])
    .config(routes)
    .config(interceptors)
    
