export default class {
    /**
     * 上传文件
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} formData 
     */
    uploadFile($http, APPBASE, formData) {
        return $http.post(APPBASE.base_api_host + '/common/uploadFile', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
    /**
     * 所有的消息提醒汇总
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} formData 
     */
    selectAllRemind($http, APPBASE) {
        return $http.post(APPBASE.base_api_host + '/login/selectAllRemind')
    }
}
