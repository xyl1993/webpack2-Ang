require('./footer.scss');
import template from './footer.html'

export default [function(){
    return {
        restrict: 'E',
        replace: true,
        template: template
    };
}]

