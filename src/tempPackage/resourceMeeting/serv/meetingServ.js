
export default class {
    /**
     * 获取会议列表
     * @param {*}  
     * @param {*} APPBASE 
     */
    selectMeetingsByTooken($http, APPBASE,currentPage,pageSize,data) {
        return $http.post(APPBASE.base_api_host + '/microMeeting/selectMeetingsByTooken/paging/'+currentPage+'/'+pageSize,data)
    }
    /**
     * 保存会议基本设置
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    createOrUpdateMeeting($http, APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/microMeeting/createOrUpdateMeeting',data)
    }
    /**
     * 获取会议基本设置
     */
    selectMeetingById($http, APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/microMeeting/selectMeetingById',data)
    }
    /**
     * 获取所有主题
     */
    selectAllTheme($http, APPBASE){
        return $http.post(APPBASE.base_api_host + '/microMeeting/selectAllTheme')
    }

    /**
     * 获取奖项信息
     */
    selectTestimonialByMeeting($http,APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/microMeeting/selectTestimonialByMeeting',data)
    }
    /**
     * 添加奖项
     */
    createTestimonial($http,APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/microMeeting/createTestimonial',data)
    }
    /**
     * 删除奖项
     */
    deleteTestimonialById($http,APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/microMeeting/deleteTestimonialById',data)
    }
    /**
     * 获取嘉宾列表
     */
    selectMDGByMeetingId($http,APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/microMeeting/selectMDGByMeetingId',data)
    }
    /**
     * 添加嘉宾
     */
    createOrUpdateDG($http,APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/microMeeting/createOrUpdateDG',data)
    }
    /**
     * 删除嘉宾
     */
    deleteMDGByMDGId($http,APPBASE,data){
        return $http.post(APPBASE.base_api_host + '/microMeeting/deleteMDGByMDGId',data)
    }
    /**
     * 获取签到用户
     */
    mmSIPagin($http,APPBASE,currentPage,pageSize,data){
        return $http.post(APPBASE.base_api_host + '/microMeeting/mmSIPagin/paging/'+currentPage+'/'+pageSize,data)
    }
    /**
     * 获取上墙信息
     */
    mmOnWallPagin($http,APPBASE,currentPage,pageSize,data){
        return $http.post(APPBASE.base_api_host + '/microMeeting/mmOnWallPagin/paging/'+currentPage+'/'+pageSize,data)
    }
    /**
     * 获取中奖信息
     */
    mmTrPagin($http,APPBASE,currentPage,pageSize,data){
        return $http.post(APPBASE.base_api_host + '/microMeeting/mmTrPagin/paging/'+currentPage+'/'+pageSize,data)
    }
}
