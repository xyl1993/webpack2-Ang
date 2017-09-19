
export default class {
    /**
     * 获取省
     * @param {*}  
     * @param {*} APPBASE 
     */
    selectProvinces($http, APPBASE) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/selectProvinces'
        })
    }

    /**
     * 获取市
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} provinceId 
     */
    selectCities($http, APPBASE, provinceId) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/selectCities',
            params: { 'provinceId': provinceId }
        })
    }

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
     * 个人认证
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    addAuther($http, APPBASE, data) {
        return $http.post(APPBASE.base_api_host + '/labor/addAuther', data)
    }
    /**
     * 查看我的认证
     * @param {*}  
     * @param {*} APPBASE 
     */
    myLaborAuther($http, APPBASE) {
        return $http.post(APPBASE.base_api_host + '/labor/myLaborAuther')
    }

    /**
     * 猜你喜欢
     * @param {*}  
     * @param {*} APPBASE 
     */
    maybelike($http, APPBASE) {
        return $http.post(APPBASE.base_api_host + '/labor/selectMaybeLike')
    }
    /**
     * 优质用工
     * @param {*}  
     * @param {*} APPBASE 
     */
    bestEmployee($http, APPBASE) {
        return $http.post(APPBASE.base_api_host + '/labor/selectBestEmployee')
    }

    bestSupplier($http, APPBASE) {
        return $http.post(APPBASE.base_api_host + '/labor/selectBestSupplier')
    }
    selectWorkType($http, APPBASE) {
        return $http.post(APPBASE.base_api_host + '/labor/selectDictionaryInfo?type=1001')
    }

    findPeople($http, APPBASE, currentPage, pageSize, data) {
        return $http.post(APPBASE.base_api_host + '/labor/selectFindPeople/paging/' + currentPage + "/" + pageSize, data)
    }

    /**
     * 查看公共标签库
     * @param {*}  
     * @param {*} APPBASE 
     */
    selectGgbq($http, APPBASE) {
        return $http.post(APPBASE.base_api_host + '/labor/selectDictionaryInfo?type=1003')
    }
    /**
     * 查看私人标签库
     * @param {*}  
     * @param {*} APPBASE 
     */
    selectSrbq($http, APPBASE) {
        return $http.post(APPBASE.base_api_host + '/labor/selectLaborTagList')
    }
    /**
     * 查看岗位类型
     * @param {*}  
     * @param {*} APPBASE 
     */
    selectPositionType($http, APPBASE) {
        return $http.post(APPBASE.base_api_host + '/labor/selectDictionaryInfo?type=1001')
    }
    /**
     * 创建发布表
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    createLaunch($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/createLaunch',
            data: data,
        })
    }
    /**
     * 消息查询
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} currentPage 
     * @param {*} pageSize 
     */
    selectMessageInfo($http, APPBASE, currentPage, pageSize) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/selectMessageInfo/paging/' + currentPage + '/' + pageSize + '?type=3'
        })
    }

    selectMyFabu($http, APPBASE, currentPage, pageSize, type) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/selectMySendInfo/paging/' + currentPage + '/' + pageSize + '/' + type
        })
    }

    selectMyShouCang($http, APPBASE, currentPage, pageSize, type) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/selectMyConllection/paging/' + currentPage + '/' + pageSize + '/' + type
        })
    }

    deleteLabor($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/deleteLaunch',
            data: data,
        })
    }
    /**
     * 发布详情
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    selectLaborDetail($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/selectLaborDetail/' + data
        })
    }
    /**
     * 添加评论
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    createComment($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/createComment',
            data: data
        })
    }
    /**
     * 获取评论
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} pageSize 
     * @param {*} currentPage 
     * @param {*} data 
     */
    selectCommentByLaborLaunchId($http, APPBASE, pageSize, currentPage, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/selectCommentByLaborLaunchId/paging/' + currentPage + '/' + pageSize,
            data: data
        })
    }
    /**
     * 收藏/取消收藏
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    addConllection($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/addConllection?laborLaunchId=' + data
        })
    }
    /**
     * 获取投诉类型
     * @param {*}  
     * @param {*} APPBASE 
     */
    getTosuType($http, APPBASE) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/selectDictionaryInfo?type=1002'
        })
    }
    /**
     * 添加投诉
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    doComplaint($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/doComplaint',
            data: data
        })
    }
    /**
     * 发布者详情
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    selectAutherInfoByUid($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/selectAutherInfoByUid?userId=' + data,
            data: data
        })
    }
    selectTalkInUserId($http, APPBASE, pageSize, currentPage, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/selectTalkInUserId/paging/' + currentPage + '/' + pageSize + "?userId=" + data,
            data: data
        })
    }
    deleteComment($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/labor/deleteComment',
            data: data
        })
    }
}
