require('./resources/css/common.scss');
require('./js-plug/animate.css/animate.min.css');

import global from './global/global.js';
import routes from './global/router.js';

import interceptors from './global/interceptors.js';
import controllers from './global/appCtrl.js';
import directives from './global/appDirective.js';
import services from './global/appServ.js';
import factory from './factory/appFactory.js';
import ngAnimateAnimate from './factory/animate.js';

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
        ngAnimateAnimate
    ])
    .run(['$rootScope', '$state', '$http', '$stateParams', '$location', '$timeout', '$window',
        function ($rootScope, $state, $http, $stateParams, $location, $timeout, $window) {
            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState) {
                });
        }])
    .config(routes)
    .config(interceptors)
  //
  // 已下都是一些动画配置
  //
  .animation('.dn-flip-x', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-flip-x','flipInX','flipOutX');
  }])

  .animation('.dn-flip-y', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-flip-y','flipInY','flipOutY');
  }])

  //
  // Fade Animations
  //
  .animation('.dn-fade', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade','fadeIn','fadeOut');
  }])

  .animation('.dn-fade-up', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-up','fadeInUp','fadeOutUp');
  }])

  .animation('.dn-fade-down', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-down','fadeInDown','fadeOutDown');
  }])

  .animation('.dn-fade-left', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-left','fadeInLeft','fadeOutLeft');
  }])

  .animation('.dn-fade-right', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-right','fadeInRight','fadeOutRight');
  }])

  .animation('.dn-fade-up-big', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-up-big','fadeInUpBig','fadeOutUpBig');
  }])

  .animation('.dn-fade-down-big', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-down-big','fadeInDownBig','fadeOutDownBig');
  }])

  .animation('.dn-fade-left-big', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-left-big','fadeInLeftBig','fadeOutLeftBig');
  }])

  .animation('.dn-fade-right-big', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-right-big','fadeInRightBig','fadeOutRightBig');
  }])


  //
  // Bounce Animations
  //
  .animation('.dn-bounce', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-bounce','bounceIn','bounceOut');
  }])

  .animation('.dn-bounce-up', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-bounce-up','bounceInUp','bounceOutUp');
  }])

  .animation('.dn-bounce-down', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-bounce-down','bounceInDown','bounceOutDown');
  }])

  .animation('.dn-bounce-left', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-bounce-left','bounceInLeft','bounceOutLeft');
  }])

  .animation('.dn-bounce-right', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-bounce-right','bounceInRight','bounceOutRight');
  }])

  //
  // Rotate Animations
  //
  .animation('.dn-rotate', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-rotate','rotateIn','rotateOut');
  }])

  .animation('.dn-rotate-up-left', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-rotate-up-left','rotateInUpLeft','rotateOutUpLeft');
  }])

  .animation('.dn-rotate-down-left', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-rotate-down-left','rotateInDownLeft','rotateOutDownLeft');
  }])

  .animation('.dn-rotate-up-right', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-rotate-up-right','rotateInUpRight','rotateOutUpRight');
  }])

  .animation('.dn-rotate-down-right', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-rotate-down-right','rotateInDownRight','rotateOutDownRight');
  }])

  //
  // Other Animations
  //
  .animation('.dn-lightspeed', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-lightspeed','lightSpeedIn','lightSpeedOut');
  }])

  .animation('.dn-roll', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-roll','rollIn','rollOut');
  }])

  .animation('.dn-hinge', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-hinge','fadeIn','hinge');
  }]);
    
