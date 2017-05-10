/*
* 分页指令
*/
require('./pagination.scss');
require('../../js-plug/jquery.pagination/jquery.twbsPagination.js');
import template from './pagination.html'

export default [function(){
    return {
        restrict: 'E',
        replace: true,
        template: template
    };
}]

