import mainTemplate from '../tempPackage/main/main.html';
import indexTemplate from '../tempPackage/index/index.html';
import resourcesHomeTemplate from '../tempPackage/resourcesHome/resourcesHome.html';
import articleDetailTemplate from '../tempPackage/articleDetail/index.html';
import workFlowTemplate from '../tempPackage/resourceWorkFlow/workFlow.html';

import workFlowDefaultTemplate from '../tempPackage/resourceWorkFlow/workFlow_default.html';
import workFlowGzhbTemplate from '../tempPackage/resourceWorkFlow/workFlow_gzhb.html';

import workFlowNoTeamTemplate from '../tempPackage/resourceWorkFlow/workFlow_no_team.html';
import workFlowmessageTemplate from '../tempPackage/resourceWorkFlow/workFlow_message.html';

import workFlowlistTemplate from '../tempPackage/resourceWorkFlow/workFlow_list.html';
// import teamMemberTemplate from '../tempPackage/team/team.html';
import workFlowLeaveTemplate from '../tempPackage/resourceWorkFlow/workFlow_leave.html';
import workFlowApprovalTemplate from '../tempPackage/resourceWorkFlow/workFlow_approval.html';
import workFlowWjxxqfTemplate from '../tempPackage/resourceWorkFlow/workFlow_wjxxqf.html';
import workFlowBxTemplate from '../tempPackage/resourceWorkFlow/workFlow_bx.html';
import workFlowCcTemplate from '../tempPackage/resourceWorkFlow/workFlow_cc.html';
import workFlowYyTemplate from '../tempPackage/resourceWorkFlow/workFlow_yy.html';
import workFlowBgyplyTemplate from '../tempPackage/resourceWorkFlow/workFlow_bgyply.html';
import workFlowCgsqTemplate from '../tempPackage/resourceWorkFlow/workFlow_cgsq.html';
import workFlowZjsqTemplate from '../tempPackage/resourceWorkFlow/workFlow_zjsq.html';
import workFlowZsjyTemplate from '../tempPackage/resourceWorkFlow/workFlow_zsjy.html';
import workFlowDetailTemplate from '../tempPackage/resourceWorkFlow/workFlow_detail.html';
import workFlowGzhbDetailTemplate from '../tempPackage/resourceWorkFlow/workFlow_gzhb_detail.html';
import workFlowGzhbListTemplate from '../tempPackage/resourceWorkFlow/workFlow_gzhb_list.html';
import createTeamTemplate from '../tempPackage/team/createTeam.html';
import teamSetTemplate from '../tempPackage/team/teamSet.html';
import workFlowDataTemplate from '../tempPackage/resourceWorkFlow/workFlow_data.html';
import accountTemplate from '../tempPackage/account/account.html';
import loginTemplate from '../tempPackage/account/login.html';
import forgetPassWordTemplate from '../tempPackage/account/forgetPassWord.html';
import registerTemplate from '../tempPackage/account/register.html';
import updatePwdTemplate from '../tempPackage/account/xgmm.html';
import testDialogTemplate from '../components/dialog/dialog.html';

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
        $urlRouterProvider.otherwise('/main/index');

        $stateProvider
            .state('account', {
                url: '/account',
                template: accountTemplate,
                abstract: false,     //表明此状态不能被显性激活，只能被子状态隐性激活
                controller: 'accountCtrl'
            })
            .state('account.login', {
                url: '/login',
                template: loginTemplate,
                controller: 'loginCtrl'
            })
            .state('account.register', {
                url: '/register',
                template: registerTemplate,
                controller: 'registerCtrl'
            })
            .state('account.forgetPassWord', {
                url: '/forgetPassWord',
                template: forgetPassWordTemplate,
                controller: 'forgetPassWordCtrl'
            })
            .state('account.updatePwd', {
                url: '/updatePwd',
                template: updatePwdTemplate,
                // controller: 'accountCtrl'
            })
            .state('main', {
                url: '/main',
                template: mainTemplate,
                abstract: true,     //表明此状态不能被显性激活，只能被子状态隐性激活
                controller: 'mainController'
            })
            .state('main.testDialog', {
                url: '/testDialog',
                template: testDialogTemplate,
                // controller: 'workFlowCtrl'
            })
            .state('main.index', {
                url: '/index',
                template: indexTemplate,
                controller: 'indexController'
            })
            .state('main.resources', {
                url: '/resources',
                template: resourcesHomeTemplate,
                controller: 'resourcesHomeController'
            })
            .state('main.articleDetail', {
                url: '/articleDetail/:id',
                template: articleDetailTemplate,
                controller: 'articleDetailCtrl'
            }).state('main.zixunListUrl', {
                url: '/index/:id',
                template: indexTemplate,
                controller: 'indexController'
            }).state('main.workFlow', {
                url: '/workFlow',
                template: workFlowTemplate,
                controller: 'workFlowCtrl'
            }).state('main.workFlow.default', {
                url: '/default',
                template: workFlowDefaultTemplate,
                controller: 'workFlowDefaultCtrl'
            }).state('main.workFlow.gzhbList', {
                url: '/flowGzhbList',
                template: workFlowGzhbListTemplate,
                controller: 'workFlowGzhbListCtrl'
            }).state('main.workFlow_noTeam', {
                url: '/noTeam',
                template: workFlowNoTeamTemplate,
                // controller: 'workFlowCtrl'
            }).state('main.workFlow.message', {
                url: '/message',
                template: workFlowmessageTemplate,
                // controller: 'workFlowCtrl'
            }).state('main.workFlow.list', {              //工作审批
                url: '/list',
                template: workFlowlistTemplate,
                controller: 'workFlowListCtrl'
            })
            .state('main.workFlow.list.data', {
                url: '/data',
                template: workFlowDataTemplate,
                // controller: 'workFlowDataCtrl'
            })
            .state('main.workFlow.leave', {
                url: '/flowLeave',
                template: workFlowLeaveTemplate,
                controller: 'workFlowLeaveCtrl'
            })
            .state('main.workFlow.approval', {
                url: '/flowApproval',
                template: workFlowApprovalTemplate,
                controller: 'workFlowApprovalCtrl'
            })
            .state('main.workFlow.wjxxqf', {
                url: '/flowWjxxqf',
                template: workFlowWjxxqfTemplate,
                controller: 'workFlowWjxxqfCtrl'
            })
            .state('main.workFlow.bx', {
                url: '/flowBx',
                template: workFlowBxTemplate,
                controller: 'workFlowBxCtrl'
            })
            .state('main.workFlow.cc', {
                url: '/flowCc',
                template: workFlowCcTemplate,
                controller: 'workFlowCcCtrl'
            })
            .state('main.workFlow.yy', {
                url: '/flowYy',
                template: workFlowYyTemplate,
                controller: 'workFlowYyCtrl'
            })
            .state('main.workFlow.bgyply', {
                url: '/flowBgyply',
                template: workFlowBgyplyTemplate,
                controller: 'workFlowBgyplyCtrl'
            })
            .state('main.workFlow.cgsq', {
                url: '/flowCgsq',
                template: workFlowCgsqTemplate,
                controller: 'workFlowCgsqCtrl'
            })
            .state('main.workFlow.zjsq', {
                url: '/flowZjsq',
                template: workFlowZjsqTemplate,
                controller: 'workFlowZjsqCtrl'
            })
            .state('main.workFlow.zsjy', {
                url: '/flowZsjy',
                template: workFlowZsjyTemplate,
                controller: 'workFlowZsjyCtrl'
            })
            .state('main.createTeam', {
                url: '/createTeam',
                template: createTeamTemplate,
                controller: 'createTeamCtrl'
            })
            .state('main.teamSet', {
                url: '/teamSet',
                template: teamSetTemplate,
                controller: 'teamSetCtrl'
            })
            .state('main.workFlow.list.detail', {
                url: '/detail',
                params: { 'id': null, 'type': null, 'workId': null },
                template: workFlowDetailTemplate,
                controller: 'workFlowDetailCtrl'
            })
            .state('main.workFlow.gzhbDetail', {
                url: '/gzhbDetail',
                params:{'id':null},
                template: workFlowGzhbDetailTemplate,
                controller: 'workFlowGzhbDetailCtrl'
            })
            .state('main.workFlow.gzhb', {
                url: '/flowGzhb',
                template: workFlowGzhbTemplate,
                controller: 'workFlowGzhbCtrl'
            })
        // $locationProvider.html5Mode({
        //   enabled: true,
        //   requireBase: false
        // })
        $locationProvider.hashPrefix('!');
    }]
