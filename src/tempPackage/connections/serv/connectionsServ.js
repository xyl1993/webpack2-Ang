export default class {

    /**
     * 获取所有偏好
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} currentPage 
     * @param {*} pageSize 
     */
    selectRmConnections($http, APPBASE,currentPage, pageSize) {
        return $http.post(APPBASE.base_api_host + '/rm/selectRmConnections/paging/'+currentPage+'/'+pageSize)
    }
    /**
     * 设置人脉圈
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    newRmq($http, APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/rm/rmq/new',data)
    }
    /**
     * 获取我的偏好
     * @param {*} http 
     * @param {*} APPBASE 
     */
    findConnectionByLogin($http, APPBASE){
        return $http.post(APPBASE.base_api_host + '/rm/findConnectionByLogin')
    }

    /**
     * 发布动态
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    createDynamic($http, APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/rm/createDynamic',data)
    }
    /**
     * 获取动态
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} currentPage 
     * @param {*} pageSize 
     */
    findDynamicWebNew($http, APPBASE,currentPage,pageSize,data){
        return $http.post(APPBASE.base_api_host + '/rm/findDynamicWebNew/paging/'+currentPage+'/'+pageSize,data)
    }
    /**
     * 赞
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    laudation($http, APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/rm/laudation',data)
    }

    /**
     * 添加评论
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    replyNew($http,APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/rm/reply/new',data)
    }

    /**
     * 查询评论列表
     */
    replayListNew($http,APPBASE,dynamicId,currentPage,pageSize){
        return $http.post(APPBASE.base_api_host + '/rm/replyNew/paging/'+dynamicId+'/'+currentPage+'/'+pageSize)
    }

    /**
     * 查询详情
     */
    findDynamicDetail($http,APPBASE,dynamicId){
        return $http.post(APPBASE.base_api_host + '/rm/findDynamicDetail/'+dynamicId)
    }
    /**
     * 删除动态
     */
    deleteDynamic($http,APPBASE,dynamicId){
        return $http.post(APPBASE.base_api_host + '/rm/dynamic/delete/'+dynamicId)
    }
    /**
     * 查询点赞信息
     */
    getLaudation($http,APPBASE,dynamicId,currentPage,pageSize){
        return $http.post(APPBASE.base_api_host + '/rm/laudation/paging/'+dynamicId+'/'+currentPage+'/'+pageSize)
    }
    /**
     * 删除评论
     */
    delReplay($http,APPBASE,dynamicId,replyId){
        return $http.post(APPBASE.base_api_host + '/rm/reply/del/'+dynamicId+'/'+replyId)
    }
    /**
     * 查看子评论
     */
    replyChild($http,APPBASE,dynamicId,replyFatherId,currentPage,pageSize){
        return $http.post(APPBASE.base_api_host + '/rm/replyChild/paging/'+dynamicId+'/'+replyFatherId+'/'+currentPage+'/'+pageSize)
    }
}