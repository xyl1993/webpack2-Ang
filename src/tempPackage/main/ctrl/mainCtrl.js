require('../style/main.scss');
import { client } from '../../../js-plug/client';
import headerImg from '../directive/navbar/images/top-bac.png';
export default ['$scope', '$log', '$state', '$rootScope', 'APPBASE', '$http', 'md5', 'commonServ',
    function($scope, $log, $state, $rootScope, APPBASE, $http, md5, commonServ) {
        $scope.phoneTitle = "资讯";
        /**
         * 构建指定长度的数组对象.测试用
         */
        $scope.range = function(n) {
            return new Array(n);
        };
        $scope.ctrl = {
            speed: 500,
            mainViewStyle: 'anim-fade',
            page1Style: 'anim-swap',
            page2Style: 'anim-slide-below-fade'
        }

        let token = sessionStorage.getItem("token");
        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState) {
                var toStateUrl = toState.name;
                //   if(APPBASE.requireToeknStates.test(toStateUrl)){
                //     if(!token){
                //         $state.go('account.login');
                //     }
                //   }
                $log.info(toStateUrl);
                
                //电脑设备
                if (client.system.win || client.system.mac || (client.system.xll && !client.system.android)) {
                    if (toStateUrl.split('.').length > 2) {
                        setStyle();
                    } else {
                        switch (toStateUrl.split('.')[1]) {
                            case 'createTeam':
                            case 'teamSet':
                            case 'connections':
                            case 'workFlow_noTeam':
                                setStyle()
                                break;
                            default:
                                $scope.headerStyle = {
                                    height: '512px'
                                };
                                $scope.headerTopStyle = {
                                    height: '512px'
                                };
                                $scope.headerBacStyle = {};
                                break;
                        }
                    }
                }else{
                    switch (toStateUrl.split('.')[1]){
                        case 'index':
                            $scope.phoneTitle = "资讯";
                            break;
                        case 'resources':
                            $scope.phoneTitle = "资源";
                            break;
                        case 'connections':
                            $scope.phoneTitle = "社交圈";
                            break;
                        case 'grzl':
                            $scope.phoneTitle = "我";
                            break;
                        default:
                            break;
                    }
                }
            })

        function setStyle() {
            $scope.headerStyle = {
                'position': 'fixed',
                'top': '0px',
                'left': '0px',
                'z-index': '9999',
                'width': '100%',
                'height': '80px',
                'box-shadow': '0 4px 20px 1px rgba(0, 0, 0, 0.2)'
            };
            $scope.headerTopStyle = {
                height: '80px',
                background: 'url(' + headerImg + ')'
            };
            $scope.headerBacStyle = {
                background: 'none'
            };
        }
        if (token) {
            commonServ.selectAllRemind($http, APPBASE).then(function(res) {
                //   console.log(res);
            })
        }
    }
]