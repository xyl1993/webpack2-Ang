export default [function(){
	return function(res) {
		if(res == "已经结束"){
		    return 'in-end';
		}else if(res == "正在进行"){
		    return 'in-going';
		}else{
		    return 'no-begin';
		}
	};
}]