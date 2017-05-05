export default class {

    getHot($http,APPBASE) {
        return $http({
            method : 'post',
            url : APPBASE.base_api_host+'/infos/hot',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


}