export default class {

    getInfoList($http,APPBASE,currentPage,pageSize,data) {
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/infos/infoList/paging/' + currentPage + '/' + pageSize,
            data:JSON.stringify(data)
		})
    };
    getInfoCategory($http,APPBASE) {
        return $http({
            method : 'post',
            url : APPBASE.base_api_host+'/infos/infoCategory/list'
        })
    }


}