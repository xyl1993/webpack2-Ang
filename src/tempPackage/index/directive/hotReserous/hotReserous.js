require('./hotReserous.scss');
//nivo-slider 轮播插件
require('../../../../js-plug/nivo-slider/themes/default/default.css');
require('../../../../js-plug/nivo-slider/themes/light/light.css');
require('../../../../js-plug/nivo-slider/themes/dark/dark.css');
require('../../../../js-plug/nivo-slider/themes/bar/bar.css');
require('../../../../js-plug/nivo-slider/nivo-slider.css');
require('../../../../js-plug/nivo-slider/jquery.nivo.slider.js');

import template from './hotReserous.html'

export default [function(){
    return {
        restrict: 'AE',
        template: template,
        controller: ['$scope','$http','hotServ','APPBASE',function($scope,$http,hotServ,APPBASE){
            hotServ.getHot($http,APPBASE).then((res)=>{
        		if(res.data.code == 0){
        			$scope.hotLists = res.data.data;
        		}
        	})
        	//监听ng遍历完成事件
			$scope.$on('to-parent',function(){
			   $('#slider').nivoSlider();
			})
			//监听目录切换时热门资讯列表右边数据改变
			$scope.$on('infoListsChange',(event,data)=>{
				$scope.infoLists = data;
			})
        }]
    };
}]

