export default ['$scope', '$state', '$http', 'APPBASE', '$compile', 'laborServ',
    function ($scope, $state, $http, APPBASE, $compile, laborServ) {

        //表单对象
        $scope.ygfbFormData = {
            title:'', //用工主题
            content:'', //用工要求
            provinceId:'',  //省id
            cityId:'',    //市id
            peopleNum:'', //供方规模
            positionType:'', //岗位类型
            validityDate:'', //信息有效期
            tag:'',          //标签
            type: 1          //发布类型 1、用工发布 2、供方发布
        };  
        $scope.successDialog = {                   //显示成功弹窗
            status:false,
            infoText:'保存成功',
            btnText:'确&nbsp;&nbsp;定'
        }; 
        //福利标签
        $scope.tjflData = {  
            tjflStatus:false,
            zdyTag:'',
            srbqStatus:false,
            tagList:[],//公共标签列表
            zdyList:[], //自定义标签列表
            srbqList:[], //私人标签列表
            selectedSrbqList:[] //选中的私人标签列表
        }

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

        //传递给用工类型下拉框的对象
        $scope.positionTypeObj = {
            selName:'',    //选择的用工类型
            status:false,
            emptyObj:{
                id:'',
                name:''
            },
            typeList:[]    //传递给组建的类型集合
        };

        //传递给信息有效期下拉框的对象
        $scope.validityDateObj = {
            selName:'',    //选择的用工类型
            status:false,
            emptyObj:{
                id:'',
                name:''
            },
            typeList:[
                {id:'1',name:'3天'},
                {id:'2',name:'7天'},
                {id:'3',name:'10天'},
                {id:'4',name:'15天'},
                {id:'5',name:'30天'}
            ]    //传递给组建的类型集合
        };
        
        $('body').bind('click',function(){
            $scope.$apply(function(){
                $scope.provinceObj.status=false;
                $scope.cityObj.status=false;
            })
        })
        $('#ygProviceChoosen').bind('click',function(e){
            stopPropagation(e);
            $scope.$apply(function(){
                $scope.cityObj.status=false;
                $scope.provinceObj.status=!$scope.provinceObj.status;
            })
        });
        $('#ygCityChoosen').bind('click',function(e){
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
        }
        (function () {
            
            /**
             * 获取省
             */
            laborServ.selectProvinces( $http,APPBASE).then(function(res){
                if(res.data.code ===0){
                    $scope.provinceObj.typeList = res.data.data;
                    let chosenData = res.data.data[0];
                    $scope.ygfbFormData.provinceId = chosenData.provinceId;
                    $scope.provinceObj.selName = chosenData.province;
                    selectCities(chosenData.provinceId);
                }
            })
            /**
             * 获取公共标签
             */
            laborServ.selectGgbq($http,APPBASE).then(function(res){
                if(res.data.code === 0){
                    $scope.tjflData.tagList = res.data.data;
                }
            })
            /**
             * 获取私人标签
             */
            laborServ.selectSrbq($http,APPBASE).then(function(res){
                if(res.data.code === 0){
                    $scope.tjflData.srbqList = res.data.data;
                }
            })
            /**
             * 获取岗位类型
             */
            laborServ.selectPositionType($http,APPBASE).then(function(res){
                if(res.data.code === 0){
                    $scope.positionTypeObj.typeList = res.data.data;
                }
            })
        }());

        /**
         * 获取市
         * @param {*} provinceId 
         */
        function selectCities(provinceId){
            laborServ.selectCities( $http,APPBASE,provinceId).then(function(res){
                if(res.data.code ===0){
                    $scope.cityObj.typeList = res.data.data;
                    let chosenData = res.data.data[0];
                    $scope.ygfbFormData.cityId = chosenData.cityId;
                    $scope.cityObj.selName = chosenData.city;
                }
            })
        }
        /**
         * 确定选择省对象
         */
        $scope.proviceSureClick = function(data){
            $scope.ygfbFormData.provinceId = data.provinceId;
            $scope.provinceObj.selName = data.province;
            selectCities(data.provinceId);
        }

        /**
         * 确定选择市对象
         */
        $scope.citySureClick = function(data){
            $scope.ygfbFormData.cityId = data.cityId;
            $scope.cityObj.selName = data.city;
        }

        /**
         * 接收选择事件
         */
        $scope.typeSureClick = function(type,data){
            if(type === 'positionType'){
                $scope.positionTypeObj.selName = data.name;
                $scope.ygfbFormData.positionType = data.id;
            } else if(type === 'validityDate'){
                $scope.validityDateObj.selName = data.name;
                $scope.ygfbFormData.validityDate = data.name;
            }
        };
        /**
         * 添加福利弹窗
         */
        $scope.tjflDialog = function(){
            $scope.tjflData.tjflStatus=true;
        }
        /**
         * 添加福利
         */
        $scope.tjflSureClick = function(){
            if($scope.tjflData.zdyTag != '' && $scope.tjflData.zdyTag != null){
                for(let i = 0 ; i < $scope.tjflData.tagList.length ; i++){
                    if($scope.tjflData.zdyTag === $scope.tjflData.tagList[i].name){
                        showErrDialog('输入标签与公共标签重复请重新输入');
                        $scope.tjflData.zdyTag = '';
                        return;
                    }
                }
                for(let i = 0 ; i < $scope.tjflData.srbqList.length ; i++){
                    if($scope.tjflData.zdyTag === $scope.tjflData.srbqList[i].text){
                        showErrDialog('输入标签与私人标签重复请重新输入');
                        $scope.tjflData.zdyTag = '';
                        return;
                    }
                }
                $scope.tjflData.zdyList.push($scope.tjflData.zdyTag);
            }
            $scope.tjflData.zdyTag = '';
            $scope.tjflData.tjflStatus=false;
        }
         /**
         * 添加已选择的私人标签
         */
        $scope.selectSrbq = function(index){
            for(let i = 0 ; i < $scope.tjflData.selectedSrbqList.length ; i++){
                if($scope.tjflData.srbqList[index] === $scope.tjflData.selectedSrbqList[i]){
                    $scope.delSrbq(i);
                    $scope.tjflData.srbqList[index].status = false;
                    return;
                }
            }
            $scope.tjflData.srbqList[index].status =true;
            $scope.tjflData.selectedSrbqList.push($scope.tjflData.srbqList[index]);
        }
        /**
         * 取消添加福利
         */
        $scope.tjflCancelClick = function(){
           $scope.tjflData.tjflStatus=false;
        }
        
         /**
         * 删除福利
         */
        $scope.delFl = function(index,selData){
            selData.selStatus = false;
        }
        /**
         * 删除自定义福利
         */
        $scope.delZdyFl = function(index){
            $scope.tjflData.zdyList.splice(index,1);
        }
        /**
         * 删除已选择的私人标签
         */
        $scope.delSrbq = function(index){
            for(let i = 0 ; i < $scope.tjflData.srbqList.length ; i++){
                if($scope.tjflData.selectedSrbqList[index] === $scope.tjflData.srbqList[i]){
                     $scope.tjflData.srbqList[i].status = false;
                     $scope.tjflData.selectedSrbqList.splice(index,1);
                     break;
                }
            }
        }
        /**
         * 人数只允许填数字
         */
        $scope.peopleNumChange = function(){
            $scope.ygfbFormData.peopleNum = $scope.ygfbFormData.peopleNum.replace(/\D|^0/g,'');  
        }
         /**
         * 保存
         */
        $scope.submit = function(){

            let formData = $scope.ygfbFormData;
            formData.peopleNum = $.trim(formData.peopleNum);
            angular.forEach($scope.tjflData.tagList,function(data,index,array){
                if(data.selStatus){
                    formData.tag += data.name + ',';
                }
            });
            angular.forEach($scope.tjflData.selectedSrbqList,function(data,index,array){
                    formData.tag += data.text + ',';
            }); 
            angular.forEach($scope.tjflData.zdyList,function(data,index,array){
                    formData.tag += data + ',';
            });
                
            formData.tag =formData.tag.substring(0,formData.tag.length-1);
            formData.validityDate = formData.validityDate.substring(0,formData.validityDate.length-1);
            laborServ.createLaunch($http, APPBASE, formData).then(function(res){
                if(res.data.code === 0){
                    $scope.successDialog.status = true;
                } else if(res.data.code === 9001){
                    showErrDialog('系统错误');
                }
            })
        }

        $scope.dialogSureClick = function(){
            $state.reload('main.labor.laborYgfb');
            $scope.successDialog.status = false;
        }
        /**
         * 取消
         */
        $scope.cancel = function(){
            $state.reload('main.labor.laborYgfb');
        }

        
        /**
         * 错误提示
         */
        function showErrDialog(text){
            $scope.errorDialog = {
                infoText:text,
                btnText:'返&nbsp;&nbsp;回',
                status:true
            }
        }
}]