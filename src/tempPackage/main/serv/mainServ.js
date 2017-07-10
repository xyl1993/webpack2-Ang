export default class {

    getImgData($http, $q) {
        return $http({
			method : 'post',
			url : './src/controllers/gallery/data.json'
		})
    }
    
}