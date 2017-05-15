export default class {

    selectInfoDetails($http,APPBASE,articleId) {
        return $http({
			method : 'post',
			url : APPBASE.base_api_host+'/infos/selectInfoDetails/' + articleId
		})
    }
}