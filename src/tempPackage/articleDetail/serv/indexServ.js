export default class {

    selectInfoDetails($http,APPBASE,articleId) {
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/infos/selectInfoDetails/' + articleId
		})
    };
        getInfoCategory($http,APPBASE) {
        return $http({
            method : 'post',
            url : APPBASE.base_api_host+'/infos/infoCategory/list'
        })
    };
        getInfoList($http,APPBASE,currentPage,pageSize,data) {
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/infos/infoList/paging/' + currentPage + '/' + pageSize,
            data:JSON.stringify(data)
		})
    };
}