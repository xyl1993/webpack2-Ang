/**
 * textarea自适应高度
 */
import {autoTextarea} from '../../../js-plug/autoTextarea.js';
export default ['$state',function($state){
    return {
        restrict: 'AE',
        link:function(scope,element,iAttrs){
            let dom = $(element)[0];
            autoTextarea(dom,0,243);
        }
    };
}]