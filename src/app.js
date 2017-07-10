require('./resources/css/detail.css');
require('./resources/css/common.scss');
require('./components/dialog/dialog.scss');
require('../bower_components/datetimepicker/datetimepicker.css');
require('../bower_components/w5c-validator/style.scss');
require('./js-plug/tooltip/tooltip.css')

import global from './global/global.js';
import routes from './global/router.js';

import interceptors from './global/interceptors.js';
import controllers from './global/appCtrl.js';
import directives from './global/appDirective.js';
import filters from './global/appFilter.js';
import services from './global/appServ.js';
import factory from './factory/appFactory.js';
import w5cValidatorProvider from './global/w5cValidatorProvider.js';

/*路由加载动画模块*/
import animInOut from './js-plug/anim-in-out/anim-in-out.js';
/*repeat动画模块*/
import repeatAnimate from './factory/animate.js';
/*jquery tooltip模块*/
import './js-plug/tooltip/tooltip.js';

//模块化
export default angular
    .module('app', [
        'ngSanitize',
        'ui.router',
        'ngResource',
        'w5c.validator',
        'angular-image-404',
        'angular-md5',
        'ngCookies',

        global,
        controllers,
        directives,
        filters,
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
    .config(w5cValidatorProvider)
    
