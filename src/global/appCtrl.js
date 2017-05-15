import mainController from '../tempPackage/main/ctrl/mainCtrl.js';
import indexController from '../tempPackage/index/ctrl/indexCtrl.js';
import resourcesHomeController from '../tempPackage/resourcesHome/ctrl/resourcesHomeCtrl.js';
import articleDetailCtrl from '../tempPackage/articleDetail/ctrl/indexCtrl.js';

export default angular
    .module( 'app.controllers', [] )
    .controller( 'mainController', mainController )
    .controller( 'indexController', indexController )
    .controller( 'resourcesHomeController', resourcesHomeController )
    .controller( 'articleDetailCtrl', articleDetailCtrl )
    .name;
