import {yunUtil} from '../../../js-plug/util';
export default [function(){
    return function(time) {
        let inDate = yunUtil.getSmpFormatDateByLong(time,true);
        let arr = inDate.split(' ');
        let timestamp = Date.parse(new Date());
        let currentDate = yunUtil.getSmpFormatDateByLong(timestamp,false);
        if(arr[0] === currentDate){
            return arr[1];
        }
        return inDate
	};
}]