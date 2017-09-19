require('../style/list.scss');
import {em} from '../../../js-plug/baseFace.js';
export default ['$scope', '$http', '$log', 'APPBASE', '$stateParams','commonServ','$compile','connectionsServ','$timeout',
    function ($scope, $http, $log, APPBASE, $stateParams,commonServ,$compile,connectionsServ,$timeout) {

        var currentPage = 1;
        var pageSize = 15;
        var num = 1;
        var maxNum = 2;
        //动态列表对象
        $scope.allDynamicList = [];
        //表情对象
        $scope.faceList = em;
        //发布的动态对象
        $scope.dynamicObj = {
            content:''
        }
        //表情对象
        $scope.emojStatus = false;
        //图片对象
        $scope.senderImgObj = {
            status : false,           //是否显示选择图片弹窗
            imgList:[]             //选择的图片集合
        };
        ;(function(){
            //获取动态
            $scope.noDynamic = false;
            findDynamicWebNew(currentPage,pageSize);
            $('.text_el_div').on('click',function(){
                $('#sendTextEl').focus();
            })
        }());
        /**
         * 选择表情
         */
        $scope.choseEmoj = function(){
            $scope.emojStatus = true;
            emojBindClick();
        }
        $scope.selEmoj = function(data){
            $scope.dynamicObj.content = $scope.dynamicObj.content+data.phrase;
            $scope.emojStatus = true;
        }
        function emojBindClick(){
            $(document).bind('click',function(e){ 
                var e = e || window.event; //浏览器兼容性 
                var elem = e.target || e.srcElement; 
                while (elem) { //循环判断至跟节点，防止点击的是div子元素 
                    if (elem.id && elem.id=='emojDiv' || elem.id === 'sendEmoj') { 
                        $scope.emojStatus = true;
                        return; 
                    } 
                    elem = elem.parentNode; 
                }
                $scope.$apply(function(){
                    $scope.emojStatus = false;
                    $(document).unbind('click');
                })
            }); 
        }
  
        /**
         * 个人图片上传监听
         */
        $scope.uploadFile = function(event){
            let files = event.target.files;
            if(!files) return;
            let content = $scope.dynamicObj.content.replace(/\n/g, "").trim();
            if(content ==''){
                $scope.dynamicObj.content = '分享图片';
            }
            for(let i=0,len = files.length;i<len;i++){
                if(i<9){
                    let file = files[i];
                    let fileName = file.name;
                    let fileType = file.type;
                    if(fileType.split('/')[0] !== 'image'){
                        return;
                    }
                    let formData = new FormData();
                    formData.append("file", file);
                    commonServ.uploadFile($http,APPBASE,formData).then(function(res){
                        if(res.data.code === 0){
                            let file_path = res.data.data;
                            let data = {
                                url : file_path 
                            }
                            $scope.senderImgObj.imgList.push(data);
                        }
                    });
                }
            }
            let fileInput = $('#senderImg');
            fileInput.after($compile(fileInput.clone().val(""))($scope));
            fileInput.remove();
        }
        //上传图片
        $scope.uploadImg = function(){
            if(!$scope.senderImgObj.status){
                $scope.senderImgObj.status = true;
            }
        }

        $scope.closeUpImg = function(){
            clearImgUp();
        }
        
        function clearImgUp(){
            $scope.senderImgObj.imgList = [];
            $scope.senderImgObj.status = false;
        }
        //发布
        $scope.createDynamic = function(){
            if($scope.dynamicObj.content !== ''||$scope.senderImgObj.imgList.length>0){
                let elData = {
                    content :  $scope.dynamicObj.content.replace(/\n/g, "").trim(), // 将反斜杠转换为双斜杠,所有的空格去掉
                    imageUrls:[]
                }
                let temp = $scope.senderImgObj.imgList;
                angular.forEach(temp,function(data,index,array){
                    elData.imageUrls.push(data.url);
                })
                connectionsServ.createDynamic($http,APPBASE,elData).then(function(res){
                    if(res.data.code === 0){
                        $scope.dynamicObj.content ='';
                        clearImgUp();
                        $scope.allDynamicList.unshift(res.data.data);
                    }
                })
            }
        }
        /**
         * 获取动态
         */
        function findDynamicWebNew(currentPage,pageSize,lastDiv){
            $scope.loadingStatus = true;
            let data = {};
            connectionsServ.findDynamicWebNew($http,APPBASE,currentPage,pageSize,data).then(function(res){
                if(res.data.code === 0){
                    $scope.loadingStatus = false;
                    let list = res.data.data.list;
                    angular.forEach(list,function(data,index,array){
                        data.currTo = 0; //设置状态,0不显示评论及赞,1显示赞,2显示评论
                        $scope.allDynamicList.push(data);
                    })
                    if(list.length===0){
                        $scope.noDynamic = true;
                    }else{
                        if(lastDiv && lastDiv.length>0){
                            $('html,body').animate({scrollTop:lastDiv.offset().top-100}, 700);//定位到该位置
                        }
                    }
                    num = 1;
                }
            })
        }
        /**
         * 加载更多
         */
        $scope.loadMoreDynmic=function(){
            num++;
            if(num <= maxNum && !$scope.noDynamic){
                currentPage++;
                let connections_list_div = $('.connections_list_div:last');
                findDynamicWebNew(currentPage,pageSize,connections_list_div);
            }
        }
        /**
         * 列表的赞,评论点击事件
         */
        $scope.displayComp = function(data,status){
            if(data.currTo === status){
                data.currTo = 0;
            }else{
                data.loadReplay = true;
                let currentPage =1,pageSize = 8;
                connectionsServ.replayListNew($http,APPBASE,data.id,currentPage,pageSize).then(function(res){
                    if(res.data.code === 0){
                        data.rmReplys = res.data.data.list;
                        data.rmReplayRecordCount = res.data.data.recordCount;
                        data.currTo =status;
                        data.loadReplay = false;
                    }
                })
            }
        }
        /**
         * 点赞或取消赞
         */
        $scope.laudation = function(list){
            let data = {
                dynamicId:list.id
            };
            connectionsServ.laudation($http,APPBASE,data).then(function(res){
                if(res.data.code === 0){
                    let resData = res.data.data;
                    list.laudationStatus = resData.laudationStatus;
                    list.laudationCount = resData.laudationCount;
                    // if(resData.laudationStatus === 0){
                    //     angular.forEach(list.rmLaudations,function(data,index,array){
                    //         if(data.laudationUser.id === $scope.userData.account.id){
                    //             list.rmLaudations.splice(index,1);
                    //         }
                    //     })
                    // }else{
                    //     list.rmLaudations.unshift({
                    //         laudationUser:{
                    //             id : $scope.userData.account.id,
                    //             portrait : $scope.userData.portrait
                    //         }
                    //     })
                    // }
                    
                }
            })
        };
        /**
         * 查看大图
         */
        $scope.showBigImg = function(data,index){
            data.isShowBigImg = true;   //显示图片
            data.currentBigImgIndex = index;
            data.rmImgs[index].active = true;   //指定图片设置active样式

            data.currentImg =  data.rmImgs[index].imgUrl;     //指定图片为大图默认图
        }
        /**
         * 取消查看大图
         */
        $scope.cancelBigImg = function(data){
            data.isShowBigImg = false;   //显示图片
            let currentBigImgIndex = data.currentBigImgIndex; 
            data.rmImgs[currentBigImgIndex].active = false;  
        }
        /**
         * 上一个大图
         */
        $scope.prevBigImg = function(data){
            let currentBigImgIndex = data.currentBigImgIndex;
            let prevIndex = currentBigImgIndex-1;
            revertBigImg(data,prevIndex,currentBigImgIndex);
        }
        /**
         * 下一个大图
         */
        $scope.nextBigImg = function(data){
            let currentBigImgIndex = data.currentBigImgIndex;
            let nextIndex = currentBigImgIndex+1;
            revertBigImg(data,nextIndex,currentBigImgIndex);
        }
        function revertBigImg(data,index,oldIndex){
            data.currentBigImgIndex = index;
            data.rmImgs[index].active = true;   //指定图片设置active样式
            data.rmImgs[oldIndex].active = false;   //指定图片设置active样式
            data.currentImg =  data.rmImgs[index].imgUrl;     //指定图片为大图默认图
        }
        /**
         * 切换预览
         */
        $scope.tabBigImg =function(data,index){
            if(data.rmImgs[index].active){
                return
            }
            let currentBigImgIndex = data.currentBigImgIndex;
            let nextIndex = index;
            revertBigImg(data,nextIndex,currentBigImgIndex);
        };

        /**
         * 添加评论 1级评论
         */
        $scope.replyNew = function(list,event){
            if(list.replayContent){
                let content = list.replayContent.replace(/\n/g, "").trim();
                if(content.length>0){
                    let data = {
                        content : content,
                        dynamicId : list.id
                    }
                    connectionsServ.replyNew($http,APPBASE,data).then(function(res){
                        if(res.data.code === 0){
                            list.replayContent = '';
                            list.replyCount = res.data.data.replyCount;
                            let obj = res.data.data.reply;
                            obj.rmReplyChild = [];
                            let timestamp = Date.parse(new Date());
                            obj.replyTime = timestamp;
                            list.rmReplys.unshift(obj);
                            $('html,body').animate({scrollTop:$(event.target).offset().top-350}, 700);//定位到该位置
                        }
                    })
                }
            }
        }

        //1级评论选择表情
        $scope.replayListEmojClick = function(list){
            list.emojStatus = true;
            replayEmojBindClick(list);
        }
        //1级评论添加表情
        $scope.replayListselEmoj = function(list,data){
            var content = list.replayContent?list.replayContent:'';
            list.replayContent = content + data.phrase;
            list.emojStatus = true;
        }
        function replayEmojBindClick(list){
            $(document).bind('click',function(e){
                var e = e || window.event; //浏览器兼容性 
                var elem = e.target || e.srcElement; 
                while (elem) { //循环判断至跟节点，防止点击的是div子元素 
                    if (elem.id && elem.id=='repeatEmoj'+list.id || elem.id === 'repeatface'+list.id) { 
                        list.emojStatus = true;
                        return; 
                    } 
                    elem = elem.parentNode; 
                }
                $scope.$apply(function(){
                    list.emojStatus = false;
                    $(document).unbind('click');
                })
            }); 
        }
        //2级回复
        $scope.replyChildComp = function(data,status){
            data.currTo = data.currTo === status?0:status;
        };
        /**
         * 评论别人的评论(2级评论)
         */
        $scope.replytoRpelayUser = function(list,replaylist,event){
            if(replaylist.replayContent){
                let content = replaylist.replayContent.replace(/\n/g, "").trim();
                if(content.length>0){
                    let data = {
                        content : content,
                        dynamicId : list.id,
                        replyFatherId : replaylist.id,
                        toReplyUserId : replaylist.replyUserId
                    }
                    connectionsServ.replyNew($http,APPBASE,data).then(function(res){
                        if(res.data.code === 0){
                            replaylist.currTo = 0;
                            replaylist.replayContent = '';
                            let replay = res.data.data.reply;
                            let timestamp = Date.parse(new Date());
                            replay.replyTime = timestamp;
                            replaylist.rmReplyChild.unshift(replay);
                            $('html,body').animate({scrollTop:$(event.target).offset().top-350}, 700);//定位到该位置
                        }
                    })
                }
            }
        }
        
        $scope.toRpelayUserEmojClick = function(replaylist){
            replaylist.emojStatus = true;
            toRpelayUserEmojBindClick(replaylist);
        }
        function toRpelayUserEmojBindClick(list){
            $(document).bind('click',function(e){
                var e = e || window.event; //浏览器兼容性 
                var elem = e.target || e.srcElement; 
                while (elem) { //循环判断至跟节点，防止点击的是div子元素 
                    if (elem.id && elem.id=='toRpelayUserface'+list.id || elem.id === 'toRpelayUserEmoj'+list.id) { 
                        list.emojStatus = true;
                        return; 
                    } 
                    elem = elem.parentNode; 
                }
                $scope.$apply(function(){
                    list.emojStatus = false;
                    $(document).unbind('click');
                })
            }); 
        }
        //2级评论添加表情
        $scope.toRpelayUserselEmoj = function(replaylist,data){
            var content = replaylist.replayContent?replaylist.replayContent:'';
            replaylist.replayContent = content + data.phrase;
            replaylist.emojStatus = true;
        }
        /**
         * 评论别人的评论(3级评论)
         */
        $scope.replytoRpelayChildUser = function(list,replaylist,replayChildList,event){
            if(replayChildList.replayContent){
                let content = replayChildList.replayContent.replace(/\n/g, "").trim();
                if(content.length>0){
                    let data = {
                        content : content,
                        dynamicId : list.id,
                        replyFatherId : replaylist.id,
                        toReplyUserId : replayChildList.replyUserId
                    }
                    connectionsServ.replyNew($http,APPBASE,data).then(function(res){
                        if(res.data.code === 0){
                            replayChildList.currTo = 0;
                            replayChildList.replayContent = '';
                            let replay = res.data.data.reply;
                            let timestamp = Date.parse(new Date());
                            replay.replyTime = timestamp;
                            replaylist.rmReplyChild.unshift(replay);
                            $('html,body').animate({scrollTop:$(event.target).offset().top-350}, 700);//定位到该位置
                        }
                    })
                }
            }
        }
        
        $scope.replayChildEmojClick = function(replayChildList){
            replayChildList.emojStatus = true;
            toEmojBindClick(replayChildList);
        }
        function toEmojBindClick(list){
            $(document).bind('click',function(e){
                var e = e || window.event; //浏览器兼容性 
                var elem = e.target || e.srcElement; 
                while (elem) { //循环判断至跟节点，防止点击的是div子元素 
                    if (elem.id && elem.id=='replayChildEmoj'+list.id || elem.id === 'replayChildface'+list.id) { 
                        list.emojStatus = true;
                        return; 
                    } 
                    elem = elem.parentNode; 
                }
                $scope.$apply(function(){
                    list.emojStatus = false;
                    $(document).unbind('click');
                })
            }); 
        }
        //3级评论添加表情
        $scope.replayChildEmoj = function(replayChildList,data){
            var content = replayChildList.replayContent?replayChildList.replayContent:'';
            replayChildList.replayContent = content + data.phrase;
            replayChildList.emojStatus = true;
        }
        
        $scope.listDelFun = function(list){
            list.showDel = list.showDel?false:true;
        }

        $scope.delDynamc = function(list,index){
            $scope.infoData = {
                infoText: "确定删除这条动态?",
                sureText: "确&nbsp;&nbsp;定",
                status: true
            }
            $scope.infoSureClick = function(){
                connectionsServ.deleteDynamic($http,APPBASE,list.id).then(function(res){
                    if(res.data.code === 0){
                        $scope.infoData.status = false;
                        $scope.allDynamicList.splice(index,1);
                    }
                })
            }
        }

        $scope.delFirstReplay = function(list,replaylist,index){
             $scope.infoData = {
                infoText: "确定删除该回复吗?",
                sureText: "确&nbsp;&nbsp;定",
                status: true
            }
            $scope.infoSureClick = function(){
                connectionsServ.delReplay($http,APPBASE,list.id,replaylist.id).then(function(res){
                    if(res.data.code === 0){
                        list.replyCount = res.data.data.replyCount;
                        $scope.infoData.status = false;
                        list.rmReplys.splice(index,1);
                    }
                })
            }
        }

        $scope.delChildReplay = function(list,replaylist,replayChildList,index){
            $scope.infoData = {
                infoText: "确定删除该回复吗?",
                sureText: "确&nbsp;&nbsp;定",
                status: true
            }
            $scope.infoSureClick = function(){
                connectionsServ.delReplay($http,APPBASE,list.id,replayChildList.id).then(function(res){
                    if(res.data.code === 0){
                        list.replyCount = res.data.data.replyCount;
                        $scope.infoData.status = false;
                        replaylist.rmReplyChild.splice(index,1);
                    }
                })
            }
        }
    }
]
