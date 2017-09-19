export default [function(){
    return function(date) {
		if(date){
            return date.split(' ')[0].replace(/-/g,'/');
        }
	};
}]