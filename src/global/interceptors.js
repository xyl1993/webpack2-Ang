/*
 * 认证相关
*/

export default ['$httpProvider',function( $httpProvider){

     $httpProvider.interceptors.push('authInterceptor');
}]
