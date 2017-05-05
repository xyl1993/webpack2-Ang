require('./footer.scss');
import template from './footer.html'

export default ()=> {
    return {
        restrict: 'E',
        replace: true,
        template: template
    };
}

