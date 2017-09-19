import uploadImg from '../img/upload-img.png';
import starsInPng from '../img/starsIn.png';
import starsOnPng from '../img/starsOn.png';
import starsNoPng from '../img/starsNo.png';
export default ['$scope','APPBASE','$state','laborServ','$http','$compile',
    function( $scope,APPBASE,$state,laborServ,$http,$compile) {
    
    // startsFun();

    // function startsFun(){
    //     var startCount = 3;  //认证积分
    //     var r = /^\+?[1-9][0-9]*$/;　　//正整数

    //     $scope.starsObj = [];
    //     for(let i=0,len = Math.ceil(startCount);i<len;i++){
    //         let data = {
    //             src : starsInPng
    //         }
    //         if((i == len-1) && !r.test(startCount)){
    //             data.src = starsOnPng;
    //         }
    //         $scope.starsObj.push(data);
    //     }
    //     let cellStarCount = 5-$scope.starsObj.length;
    //     for(let i=0;i<cellStarCount;i++){
    //         let data = {
    //             src : starsNoPng
    //         }
    //         $scope.starsObj.push(data);
    //     }
    // }
    
    $scope.formData = {
        companyName:'',      //公司名称
        type:1,        //认证类型 1、个人 2、公司
        provinceId:'',  //省id
        cityId:'',    //市id
        baseInfo:'',    //基本信息
        personImg:'',    //个人认证图片
        personBackImg:'',//个人认证背面图
        companyImg:''   //公司认证图片
    };  //表单对象

    //传递给省下拉框的对象
    $scope.provinceObj = {
        selName:'',    //选择的省类型
        status:false,
        emptyObj:{
            provinceId:'',
            province:''
        },
        typeList:[]    //传递给组建的类型集合
    };
    //传递给市下拉框的对象
    $scope.cityObj = {
        selName:'',    //选择的市类型
        status:false,
        emptyObj:{
            cityId:'',
            city:''
        },
        typeList:[]    //传递给组建的类型集合
    };
    $('body').bind('click',function(){
        $scope.$apply(function(){
            $scope.provinceObj.status=false;
            $scope.cityObj.status=false;
        })
    })
    $('#proviceChoosen').bind('click',function(e){
        stopPropagation(e);
        $scope.$apply(function(){
            $scope.cityObj.status=false;
            $scope.provinceObj.status=!$scope.provinceObj.status;
        })
    });
    $('#cityChoosen').bind('click',function(e){
        stopPropagation(e);
        $scope.$apply(function(){
            $scope.provinceObj.status=false;
            $scope.cityObj.status=!$scope.cityObj.status;
        })
    });
    function stopPropagation(e) {
        if (e.stopPropagation) 
            e.stopPropagation();
        else 
            e.cancelBubble = true;
    };
    (function () {
        
        laborServ.myLaborAuther( $http,APPBASE).then(function(res){
            if(res.data.code ===0){
                let data = res.data.data;
                $scope.formData = {
                    companyName:data.companyName,
                    type:data.type,        //认证类型 1、个人 2、公司
                    provinceId:data.provinceId,  //省id
                    cityId:data.cityId,    //市id
                    baseInfo:data.baseInfo,    //基本信息
                    personImg:data.personImg,    //个人认证图片
                    personBackImg:data.personBackImg,//个人认证背面图
                    companyImg:data.companyImg   //公司认证图片
                };  //表单对象
                document.getElementById('personImg').src = data.personImg?data.personImg:uploadImg;
                document.getElementById('personBacImg').src = data.personBackImg?data.personBackImg:uploadImg;
                document.getElementById('companyImg').src = data.companyImg?data.companyImg:uploadImg;
                $scope.provinceObj.selName = data.province;
                $scope.cityObj.selName = data.city;
            }else{
                document.getElementById('personImg').src = uploadImg;
                document.getElementById('personBacImg').src = uploadImg;
                document.getElementById('companyImg').src = uploadImg;
            }
            selectProvinces();
        })
    }());

    /**
     * 获取省
     */
    function selectProvinces(){
        laborServ.selectProvinces( $http,APPBASE).then(function(res){
            if(res.data.code ===0){
                $scope.provinceObj.typeList = res.data.data;

                if($scope.formData.provinceId){
                    selectCities($scope.formData.provinceId);
                }else{
                    let chosenData = res.data.data[0];
                    $scope.formData.provinceId = chosenData.provinceId;
                    $scope.provinceObj.selName = chosenData.province;
                    selectCities(chosenData.provinceId);
                }
            }
        });
    }


    
    /**
     * 获取市
     * @param {*} provinceId 
     */
    function selectCities(provinceId){
        laborServ.selectCities( $http,APPBASE,provinceId).then(function(res){
            if(res.data.code ===0){
                $scope.cityObj.typeList = res.data.data;
                let chosenData = res.data.data[0];
                $scope.formData.cityId = chosenData.cityId;
                $scope.cityObj.selName = chosenData.city;
            }
        })
    }
    /**
     * 确定选择省对象
     */
    $scope.proviceSureClick = function(data){
        $scope.formData.provinceId = data.provinceId;
        $scope.provinceObj.selName = data.province;
        selectCities(data.provinceId);
    }

    /**
     * 确定选择市对象
     */
    $scope.citySureClick = function(data){
        $scope.formData.cityId = data.cityId;
        $scope.cityObj.selName = data.city;
    }
    /**
     * 个人图片上传监听
     */
    $scope.uploadPersonFile = function(){
        let file = event.target.files;
        if(!file) return;
        let fileName = file[0].name;
        let fileType = file[0].type;
        if(fileType.split('/')[0] !== 'image'){
            alert('请上传图片类型的文件');
            return;
        }
        let formData = new FormData();
        formData.append("file", file[0]);
        laborServ.uploadFile($http,APPBASE,formData).then(function(res){
            if(res.data.code === 0){
                let file_path = res.data.data;
                $scope.formData.personImg = file_path;
                let reader = new FileReader();
                reader.onload = function (evt) {
                    document.getElementById('personImg').src = evt.target.result;
                }
                reader.readAsDataURL(file[0]);
            }
        });
        let fileInput = $('#personFile');
        fileInput.after($compile(fileInput.clone().val(""))($scope));
        fileInput.remove();
    }
    /**
     * 个人认证背面图上传监听
     */
    $scope.uploadPersonBacFile = function(){
        let file = event.target.files;
        if(!file) return;
        let fileName = file[0].name;
        let fileType = file[0].type;
        if(fileType.split('/')[0] !== 'image'){
            alert('请上传图片类型的文件');
            return;
        }
        let formData = new FormData();
        formData.append("file", file[0]);
        laborServ.uploadFile($http,APPBASE,formData).then(function(res){
            if(res.data.code === 0){
                let file_path = res.data.data;
                $scope.formData.personBackImg = file_path;
                let reader = new FileReader();
                reader.onload = function (evt) {
                    document.getElementById('personBacImg').src = evt.target.result;
                }
                reader.readAsDataURL(file[0]);
            }
        });
        let fileInput = $('#personBacFile');
        fileInput.after($compile(fileInput.clone().val(""))($scope));
        fileInput.remove();
    }
    /**
     * 公司图片上传监听
     */
    $scope.uploadCompanyFile = function(){
        let file = event.target.files;
        if(!file) return;
        let fileName = file[0].name;
        let fileType = file[0].type;
        if(fileType.split('/')[0] !== 'image'){
            alert('请上传图片类型的文件');
            return;
        }
        let formData = new FormData();
        formData.append("file", file[0]);
        laborServ.uploadFile($http,APPBASE,formData).then(function(res){
            if(res.data.code === 0){
                let file_path = res.data.data;
                $scope.formData.companyImg = file_path;
                let reader = new FileReader();
                reader.onload = function (evt) {
                    document.getElementById('companyImg').src = evt.target.result;
                }
                reader.readAsDataURL(file[0]);
            }
        });
        let fileInput = $('#companyFile');
        fileInput.after($compile(fileInput.clone().val(""))($scope));
        fileInput.remove();
    }
    //保存成功提示组件对象
    $scope.successDialog = {
        infoText:'保存成功',
        btnText:'确&nbsp;&nbsp;定',
        status:false
    }
    $scope.submit = function(){
        laborServ.addAuther( $http,APPBASE,$scope.formData).then(function(res){
            let code = res.data.code;
            let resData = res.data.data;
            switch(code){
                case 9005:
                    showErrDialog('公司认证图片不能为空');
                    break;
                case 9006:
                    showErrDialog('个人认证图片不能为空');
                    break
                case 0:
                    $scope.successDialog.status = true;
                    break
            }
        })
    }
    function showErrDialog(text){
        $scope.errorDialog = {
            infoText:text,
            btnText:'返&nbsp;&nbsp;回',
            status:true
        }
    }
    //点击保存成功确定按钮
    $scope.dialogSureClick = function(){
        $scope.successDialog.status = false;
    }
}]