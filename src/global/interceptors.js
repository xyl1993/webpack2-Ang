/*
 * 认证相关
*/

export default ( $httpProvider)=> {
    'ngInject';

     $httpProvider.interceptors.push('authInterceptor');
}
