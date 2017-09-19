export default [function(){
    return function(file) {
		if(file){
            return file.substring(file.lastIndexOf('/')).substring(13);
        }
	};
}]