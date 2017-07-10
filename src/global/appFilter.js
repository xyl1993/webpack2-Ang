import defaultImg from '../tempPackage/resourceWorkFlow/filter/setDefaultImg.js';
export default angular
    .module( 'app.filters', [] )
    .filter( 'defaultImg', defaultImg )
    .name;