import navJson from '../data/nav.json';
require('../style/index.scss');
export default ( $scope,$http,$log,APPBASE,indexServ)=> {

    'ngInject';
  
    // 默认显示页面为3条..当前页为第一页..data查询参数
    var $pager = $('#pagination');
    var pageSize = 10,
        currentPage = 1,
        categoryData = {     //目录类型对象
            infoCategoryId:0
        };    
    $scope.repeatCount = 10;
    $scope.infoLists = [];       //首页资讯对象集合
    $scope.infoCategory = [];    //目录菜单集合

    //自动构建指定长度的数组
    $scope.range = (n)=> {
        return new Array(n);
    };
    $scope.navData = navJson.data;
    getInfoCategory();
    getInfoList(1);

    /*切换目录*/
    $scope.categoryClick = (infoCategoryData)=>{
        if(!infoCategoryData.active === true){
            angular.forEach($scope.infoCategory ,(data,index,array)=>{
                if(data.active === true){
                    data.active = false;
                }
            })
            infoCategoryData.active = true;
            $pager.empty();
            $pager.removeData("twbs-pagination");
            $pager.unbind("page");
            categoryData.infoCategoryId = infoCategoryData.id;
            getInfoList(1);
        }
    }
    /*获取目录*/
    function getInfoCategory(){
        indexServ.getInfoCategory($http,APPBASE).then((res)=>{
            var resData = res.data;
            if(resData.code==0){
                $scope.infoCategory = resData.data;
                $scope.infoCategory[0].active = true;
            }
        });
    }

    /*
    *获取资讯列表
    */
    function getInfoList(currentPage){
        indexServ.getInfoList($http,APPBASE,currentPage,pageSize,categoryData).then((res)=>{
            var resData = res.data;
            if(resData.code==0){
                $scope.infoLists = resData.data.list;
                var counts = resData.data.recordCount; //总共的条数
                var pageCount = resData.data.pageCount > 0 ? resData.data.pageCount : 1; //总共的页数
                initPage(pageCount);
                $scope.$broadcast('infoListsChange',$scope.infoLists)
            }
        });
    }
    /*
    *分页
    */
    function initPage(pages) {
        $pager.twbsPagination({
            totalPages: pages,
            visiblePages: 5,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '末页',
            onPageClick: (event, page)=>{
                getInfoList(page);
            }
        });
    }
}