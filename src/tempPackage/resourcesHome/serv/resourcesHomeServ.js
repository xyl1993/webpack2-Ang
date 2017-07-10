export default class {

    getMenuInfoList($http,APPBASE,data) {
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/infos/infoList/paging/' + currentPage + '/' + pageSize,
            data:JSON.stringify(data)
		})
    };



}