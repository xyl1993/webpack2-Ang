require('../style/index.scss');
export default ['$scope', '$http', '$log', 'APPBASE','$stateParams' ,'articleDetailServ',
    function($scope, $http, $log, APPBASE,$stateParams, articleDetailServ) {
        var articleId = $stateParams.id;
        articleDetailServ.selectInfoDetails($http, APPBASE,articleId).then((res) => {
            if(res.data.code==0){
            	$scope.articleDetailData = res.data.data;
            	$scope.htmlPath = $scope.articleDetailData.htmlPath;
            }
        });
    }
]
