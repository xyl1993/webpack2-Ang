export default class {
    /**
     * 查询我的审批
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} currentPage 
     * @param {*} pageSize 
     * @param {*} data 
     */
    selectShenPiFlow($http, APPBASE, currentPage, pageSize, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/selectShenPiFlow/paging/' + currentPage + '/' + pageSize,
            data: data
        })
    }
    /**
     * 查询我的申请
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} currentPage 
     * @param {*} pageSize 
     * @param {*} data 
     */
    selectShenQinFlow($http, APPBASE, currentPage, pageSize, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/selectShenQinFlow/paging/' + currentPage + '/' + pageSize,
            data: data
        })

    };
    /**
     * 查询我发出的
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} currentPage 
     * @param {*} pageSize 
     * @param {*} data 
     */
    selectShenQinFlowNormal($http, APPBASE, currentPage, pageSize, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/selectShenQinFlowNormal/paging/' + currentPage + '/' + pageSize,
            data: data
        })

    };
    /**
     * 查询抄送我的
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} currentPage 
     * @param {*} pageSize 
     * @param {*} data 
     */
    selectChaoSongFlow($http, APPBASE, currentPage, pageSize, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/selectChaoSongFlow/paging/' + currentPage + '/' + pageSize,
            data: data
        })
    }
    /**
     * 查询我收到的
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} currentPage 
     * @param {*} pageSize 
     * @param {*} data 
     */
    selectChaoSongFlowNormal($http, APPBASE, currentPage, pageSize, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/selectChaoSongFlow/paging/' + currentPage + '/' + pageSize,
            data: data
        })
    }
    /**
     * 获取字典表
     * @param {*}  
     * @param {*} APPBASE 
     * @param {string} type 
     * 1002:请假类型
     * 1003:公章类型
     * 1004:证件类型
     */
    selectDictionaryInfo($http, APPBASE, type) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/selectDictionaryInfo',
            data: { type: type }
        })
    }
    /**
     * 获取关于我的团队
     * @param {*}  
     * @param {*} APPBASE 
     */
    getFlowTeamListAboutMe($http, APPBASE) {
        return $http({
            method: 'post',
            async: true,
            url: APPBASE.base_api_host + '/flow/getFlowTeamListAboutMe',
        })
    }

    /**
     * 根据团队id获取成员,剔除我自己
     * @param {*}  
     * @param {*} APPBASE 
     * @param {int} id 团队id 
     */
    getTeamMemberNotMe($http, APPBASE, id) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/getTeamMemberNotMe?id=' + id,
        })
    }
    /**
     * 获取团队成员
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    getFlowTeamMember($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/getFlowTeamMember',
            data:data
        })
    }

    /**
     * 上传文件
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} formData 
     */
    uploadFile($http, APPBASE, formData) {
        return $http.post(APPBASE.base_api_host + 'common/uploadFile', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
    /**
     * 请假
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} formData 
     */
    saveFormLeave($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/saveFormLeave',
            data: data,
        })
    }
    /**
     * 事务审批
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} formData 
     */
    saveFormApproval($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/saveFormTransaction',
            data: data,
        })
    }
    /**
     * 办公用品领用
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} formData 
     */
    saveFormBgyply($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/saveOfficeSupplies',
            data: data,
        })
    }
    /**
     * 报销
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} formData 
     */
    saveFormBx($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/saveReimbursement',
            data: data,
        })
    }
    /**
    * 出差
    * @param {*}  
    * @param {*} APPBASE 
    * @param {*} formData 
    */
    saveFormCc($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/saveBusinessTrip',
            data: data,
        })
    }
    /**
    * 采购申请
    * @param {*}  
    * @param {*} APPBASE 
    * @param {*} formData 
    */
    saveFormCgsq($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/savePurchaseRequisition',
            data: data,
        })
    }
    /**
    * 文件消息签发
    * @param {*}  
    * @param {*} APPBASE 
    * @param {*} formData 
    */
    saveFormWjxxqf($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/saveDocumentIssue',
            data: data,
        })
    }
    /**
    * 用印
    * @param {*}  
    * @param {*} APPBASE 
    * @param {*} formData 
    */
    saveFormYy($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/saveFormSeal',
            data: data,
        })
    }
    /**
    * 资金申请
    * @param {*}  
    * @param {*} APPBASE 
    * @param {*} formData 
    */
    saveFormZjsq($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/saveMoneyApply',
            data: data,
        })
    }
    /**
    * 证书借用
    * @param {*}  
    * @param {*} APPBASE 
    * @param {*} formData 
    */
    saveFormZsjy($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/saveFormCertificate',
            data: data,
        })
    }
    searchDetails($http, APPBASE) {
        alert(APPBASE.base_api_host)
        $http.post('workFlow_detail.html', postData, config).
            success(function (data) {
                console.log(data);
            }).
            error(function (err) {
                //错误代码
            });
    }
    /**
     * 
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    searchFlowById($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/selectFlowDetail',
            data: data,
        })
    }
    saveFormGzhb($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/saveDailyWork',
            data: data,
        })
    }
    /**
     * 流程审批
     * @param {*}  
     * @param {*} APPBASE 
     * @param {*} data 
     */
    flowStatus($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/flowStatus',
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
selectMessageInfo($http, APPBASE, currentPage, pageSize){
 return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/selectMessageInfo/paging/' + currentPage + '/' + pageSize
        })
}
getFlowTeamDetail($http, APPBASE,data){
   return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/getFlowTeamDetail?teamId=' + data
        })  
}
selectFlowNormalDetail($http, APPBASE, data) {
        return $http({
            method: 'post',
            url: APPBASE.base_api_host + '/flow/selectFlowNormalDetail',
            data: data,
        })
    }
}