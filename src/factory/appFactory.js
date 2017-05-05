import authInterceptor from './authInterceptor.js';
export default angular
    .module( 'app.factory', [] )
    .factory( 'authInterceptor', authInterceptor )
    .name;