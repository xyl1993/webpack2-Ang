require('../style/home.scss');
export default ['$scope', '$http', '$log', 'APPBASE','$stateParams','connectionsServ','accountServ','$state',
    function($scope, $http, $log, APPBASE,$stateParams,connectionsServ,accountServ,$state) {
        //偏好dialog状态
        $scope.connectionsDialog = false;

        (function(){
            findUserByTokenResource();
            setHeight();
            findConnectionByLogin();
        }());
        function findUserByTokenResource(){
            let token = sessionStorage.getItem('token');
            if(token){
                accountServ.findUserByTokenResource($http,APPBASE).then(function(res){
                    if(res.data.code === 0){
                        $scope.userData = res.data.data;
                    }
                })
            }
        }
        function setHeight(){
            let clientHeight = document.body.clientHeight,
                headerHeight = $('.nav-contain').height(),
                footerHeight = $('.footer-main').height();
            let _height = clientHeight-headerHeight-footerHeight-60;
            $('.connections_kind').height(_height);
            
        }

        /**
         * 偏好列表
         */
        function selectRmConnections(myData){
            let currentPage = 1,pageSize = 50;
            connectionsServ.selectRmConnections($http,APPBASE,currentPage,pageSize).then(function(res){
                if(res.data.code === 0){
                    let list = res.data.data.list;
                    $scope.connectionsList = res.data.data.list;
                    if(myData.length>0){
                        angular.forEach(list,function(d,i,a){
                            for(let m=0,len=myData.length;m<len;m++){
                                if(d.id === myData[m].id){
                                    d.selStatus = true;
                                    break;
                                }
                            }
                        })
                    }else{
                        $scope.connectionsDialog = true;
                    }
                    
                }
            })
        }
        /**
         * 获取我的偏好
         */
        function findConnectionByLogin(){
            connectionsServ.findConnectionByLogin($http,APPBASE).then(function(res){
                if(res.data.code === 0){
                    $scope.myConnections = res.data.data;
                    $scope.myConnectionsStr = '';
                    angular.forEach($scope.myConnections,function(data,index,array){
                        if(index === $scope.myConnections.length-1){
                            $scope.myConnectionsStr = $scope.myConnectionsStr+data.name;
                        }else{
                            $scope.myConnectionsStr = $scope.myConnectionsStr+data.name+','
                        }
                        
                    })
                    selectRmConnections(res.data.data);
                }
            })
        }
        /**
         * 设置偏好
         */
        $scope.setConnection = function(){
            $scope.connectionsDialog = true;
        }

        $scope.closeConnectionsDialog = function(){
            if($scope.myConnections.length>0){
                $scope.connectionsDialog = false;
            }
        }

        //监听ng遍历完成事件
        $scope.$on('to-parent',function(){
            $('.connections_kind').mCustomScrollbar({
                autoHideScrollbar:true
            });
        })

        $scope.newRmq = function(){
            let setList = [];
            for(let i=0,len = $scope.connectionsList.length;i<len;i++){
                let _d = $scope.connectionsList[i];
                if(_d.selStatus) {
                    setList.push({
                        connectionId : _d.id
                    });
                }
            }
            if(setList.length>0){
		    	//设置人脉圈
                connectionsServ.newRmq($http,APPBASE,setList).then(function(res){32
                    if(res.data.code === 0){
                        $state.reload();
                    }
                })
			}
        }

    }
]
