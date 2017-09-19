export default [function(){
    return function(value) {
		if(value){
            return value.indexOf('&mop*') === 0?value.replace(/&mop\*/,''):value.replace(/&mop\*/,'<br>');
        }
	};
}]