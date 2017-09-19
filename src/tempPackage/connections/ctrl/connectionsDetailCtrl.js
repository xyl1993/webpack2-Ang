require('../style/detail.scss');
import {em} from '../../../js-plug/baseFace.js';
export default ['$scope', '$http', '$log', 'APPBASE','$stateParams','connectionsServ','$state',
    function($scope, $http, $log, APPBASE,$stateParams,connectionsServ,$state) {
        var currentPage = 1,
            pageSize = 10;
        var zanCurrentPage = 1,
            zanPageSize = 10;
        let dynamicId = $stateParams.id;
        
        ;(function(){
            $scope.moreStatus = true;
            $scope.zanList = [];
            findDynamicDetail(dynamicId);
            getLaudation(true );
        }());
        //表情对象
        $scope.faceList = em;
        /**
         * 获取详情数据
         */
        function findDynamicDetail(dynamicId){
            connectionsServ.findDynamicDetail($http,APPBASE,dynamicId).then(function(res){
                $scope.dynamicData = res.data.data;
                replayListNew(dynamicId,currentPage,pageSize);
            })
        }
        function replayListNew(id,currentPage,pageSize){
            connectionsServ.replayListNew($http,APPBASE,id,currentPage,pageSize).then(function(res){
                if(res.data.code === 0){
                    $scope.dynamicData.rmReplys = res.data.data.list;
                }
            })
        }
        $scope.loadMoreReplay = function(data){
            currentPage++;
            data.loadReplay = true;
            connectionsServ.replayListNew($http,APPBASE,data.id,currentPage,pageSize).then(function(res){
                if(res.data.code === 0){
                    let list =  res.data.data.list;
                    Array.prototype.push.apply($scope.dynamicData.rmReplys,list);
                    data.loadReplay = false;
                    $scope.moreStatus = (list.length>0);
                    
                }
            })
        }
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
         * 列表的赞,评论点击事件
         */
        $scope.displayComp = function(data,status,event){
            data.currTo = data.currTo === status?0:status;
            if(data.currTo!==0){
                if(event){
                    let _id = event.target.id;
                    $('html,body').animate({scrollTop:$('#'+_id).offset().top-400}, 700);//定位到该位置
                }
            }
        }
        /**
         * 查询点赞信息
         */
        function getLaudation(status){
            $scope.zanList = [];
            connectionsServ.getLaudation($http,APPBASE,dynamicId,zanCurrentPage,zanPageSize).then(function(res){
                let list = res.data.data.list;
                let str = '';
                Array.prototype.push.apply($scope.zanList,list);
                // angular.forEach(list,function(data,index,array){
                //     $scope.zanList.push(data);
                // })
                if(status){
                    for(let i=0;i<3;i++){
                        if($scope.zanList[i]){
                            str = str+$scope.zanList[i].laudationUser.realName+'、';
                        }
                    }
                    $scope.zanName = str.substring(0,str.length-1);
                }
            })
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
                    getLaudation(true);
                }
            })
        };
        /**
         * 添加评论 1级评论
         */
        $scope.replyNew = function(list){
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
        $scope.replyChildComp = function(data,status,event){
            data.currTo = data.currTo === status?0:status;
            if(data.currTo!==0){
                let _id = event.target.id;
                $('html,body').animate({scrollTop:$('#'+_id).offset().top-400}, 700);//定位到该位置
            }
        };
        /**
         * 评论别人的评论(2级评论)
         */
        $scope.replytoRpelayUser = function(list,replaylist){
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
                            list.replyCount = res.data.data.replyCount;
                            let timestamp = Date.parse(new Date());
                            list.replyCount.replyTime = timestamp;
                            replaylist.rmReplyChild.unshift(res.data.data.reply);
                        }
                    })
                }
            }
        }
        
        $scope.toRpelayUserEmojClick = function(replaylist){
            replaylist.emojStatus = true;
            toEmojBindClick(replaylist);
        }
        function toEmojBindClick(list){
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
        $scope.replytoRpelayChildUser = function(list,replaylist,replayChildList){
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
                            let timestamp = Date.parse(new Date());
                            let obj = res.data.data.reply;
                            obj.replyTime = timestamp;
                            replaylist.rmReplyChild.unshift(obj);
                        }
                    })
                }
            }
        }
        
        $scope.replayChildEmojClick = function(replayChildList){
            replayChildList.emojStatus = true;
            toRpelayUserEmojBindClick(replayChildList);
        }
        function toRpelayUserEmojBindClick(list){
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
                        $state.go('main.connections.list');
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

        $scope.loadMoreChildReplay = function(replaylist){
            if(replaylist.currentPage){
                replaylist.currentPage++;
            }else{
                replaylist.currentPage = 2;
            }
            connectionsServ.replyChild($http,APPBASE,dynamicId,replaylist.id,replaylist.currentPage,10).then(function(res){
                if(res.data.code === 0){
                    let list = res.data.data.list;
                    if(list.length===0){
                        replaylist.hideMore = true;
                    }
                    Array.prototype.push.apply(replaylist.rmReplyChild,list);
                    // angular.forEach(list,function(data,index,array){
                    //     replaylist.rmReplyChild.push(data);
                    // })
                }
            })
            
        }
    }
]
