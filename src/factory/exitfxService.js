export default ['$http','APPBASE',
    function($http,APPBASE){
        return {  
		    query : function(id,dytype) { 
		    	if(dytype == 'laborfbxq'){     //劳务根据id查询详情
		    		return $http({method: 'post', url: APPBASE.base_api_host+'/labor/selectLaborDetail/'+id});
		    	}
		    } 
		};
    }]