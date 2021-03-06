require('../style/index.scss');
export default ['$scope', '$http', '$log', 'APPBASE','$stateParams' ,'articleDetailServ','$sce',
    function($scope, $http, $log, APPBASE,$stateParams, articleDetailServ,$sce) {
        var articleId = $stateParams.id;

        articleDetailServ.selectInfoDetails($http, APPBASE,articleId).then((res) => {
            if(res.data.code==0){
            	let articleDetailData = res.data.data;
            	let htmlPath = articleDetailData.htmlPath;
                $scope.trustSrc = $sce.trustAsResourceUrl(htmlPath);
            }
        });

        $scope.infoCategory = [];    //目录菜单集合
        getInfoCategory();
            /*获取目录*/
    function getInfoCategory(){
        articleDetailServ.getInfoCategory($http,APPBASE).then((res)=>{
            var resData = res.data;
            if(resData.code==0){
                $scope.infoCategory = resData.data;
                $scope.infoCategory[0].active = true;
            }
        });
    };

        /*切换目录*/
    $scope.categoryClick = function(articleId){
        window.location.href = APPBASE.zixun_list_url+articleId;
    }
    }
]
