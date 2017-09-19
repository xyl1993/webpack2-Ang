export default [function(){
    return function(value) {
		if(value){
            return value.slice(0,150)+'...'+
            '<font class="detail pointer">&nbsp;查看详情</font>';
        }
	};
}]