import mainTemplate from '../tempPackage/main/main.html';
import indexTemplate from '../tempPackage/index/index.html';
import resourcesHomeTemplate from '../tempPackage/resourcesHome/resourcesHome.html';
import articleDetailTemplate from '../tempPackage/articleDetail/index.html';
//审批
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
import forgetPasswordTemplate from '../tempPackage/account/forget_password.html';
import ensureAccountTemplate from '../tempPackage/account/ensure_account.html';
import xgmmcgTemplate from '../tempPackage/account/xgmmcg.html';
import xgmmTemplate from '../tempPackage/account/xgmm.html';
import passwordTemplate from '../tempPackage/account/password.html';
import registerTemplate from '../tempPackage/account/register.html';
import grzlTemplate from '../tempPackage/account/grzl.html';
import crossdomainTemplate from '../tempPackage/account/crossdomain.html';
import testDialogTemplate from '../components/dialog/dialog.html';
import meetingListTemplate from '../tempPackage/resourceMeeting/meetingList.html';
import meetingEditTemplate from '../tempPackage/resourceMeeting/meetingEdit.html';
import meetingStatisticsTemplate from '../tempPackage/resourceMeeting/meetingStatistics.html';

//劳务
import laborTemplate from '../tempPackage/resourceLabor/labor.html';
import laborIndexTemplate from '../tempPackage/resourceLabor/labor_index.html';
import laborUserInfoTemplate from '../tempPackage/resourceLabor/labor_user_info.html';
import laborAutherTemplate from '../tempPackage/resourceLabor/labor_auther.html';
import laborInfoTemplate from '../tempPackage/resourceLabor/labor_info.html';
import laborLaunchDetailTemplate from '../tempPackage/resourceLabor/labor_launch_detail.html';
import laborMaybeLikeTemplate from '../tempPackage/resourceLabor/labor_maybe_like.html';
import laborGffbTemplate from '../tempPackage/resourceLabor/labor_gffb.html';
import laborYgfbTemplate from '../tempPackage/resourceLabor/labor_ygfb.html';
import laborFbzxqTemplta from '../tempPackage/resourceLabor/labor_fbzxq.html';
import laborFindPeopleTemplate from '../tempPackage/resourceLabor/labor_find_people.html';
import laborFindJobTemplate from '../tempPackage/resourceLabor/labor_find_job.html';
import laborMyFabuTemplate from '../tempPackage/resourceLabor/labor_my_fabu.html';
import laborMyShouCangTemplate from '../tempPackage/resourceLabor/labor_my_shoucang.html';

import connectionsHomeTemplate from '../tempPackage/connections/home.html';
import connectionsListTemplate from '../tempPackage/connections/list.html';
import connectionsDetailTemplate from '../tempPackage/connections/detail.html'

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
        $urlRouterProvider.otherwise('/main/index');

        $stateProvider
            .state('account', {
                url: '/account',
                template: accountTemplate,
                abstract: true,     //表明此状态不能被显性激活，只能被子状态隐性激活
                controller: 'accountCtrl'
            })
            .state('account.login', {
                url: '/login',
                template: loginTemplate,
                controller: 'loginCtrl'
            })
            .state('grzl',{
                url: '/grzl',
                template: grzlTemplate,
                controller: 'grzlCtrl'
            })
            .state('crossdomain',{
                url: '/crossdomain',
                template: crossdomainTemplate
                // controller: 'grzlCtrl'
            })
            .state('password.register', {
                url: '/register',
                template: registerTemplate,
                controller: 'registerCtrl'
            })
            .state('password', {
                url: '/password',
                template: passwordTemplate,
                // controller: 'passwordCtrl'
            })
            .state('password.ensureAccount', {
                url: '/ensureAccount',
                template: ensureAccountTemplate,
                controller: 'ensureAccountCtrl'
            })
            .state('password.forgetPassword', {
                url: '/forgetPassword/:telephone',
                template: forgetPasswordTemplate,
                controller: 'forgetPasswordCtrl'
            })
            .state('password.xgmm', {
                url: '/xgmm',
                template: xgmmTemplate,
                controller: 'xgmmCtrl'
            })
            .state('password.xgmmcg', {
                url: '/xgmmcg',
                template: xgmmcgTemplate,
                controller: 'xgmmcgCtrl'
            })
            .state('main', {
                url: '/main',
                template: mainTemplate,
                // abstract: true,     //表明此状态不能被显性激活，只能被子状态隐性激活
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
            .state('main.login', {
                url: '/login',
                template: loginTemplate,
                controller: 'loginCtrl'
            })
            .state('main.grzl',{
                url: '/grzl',
                template: grzlTemplate,
                controller: 'grzlCtrl'
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
                url: '/gzhbDetail/:id',
                template: workFlowGzhbDetailTemplate,
                controller: 'workFlowGzhbDetailCtrl'
            })
            .state('main.workFlow.meeting', {
                url: '/meeting',
                template: meetingListTemplate,
                controller: 'meetingListCtrl'
            })
            .state('main.workFlow.meetingEdit', {
                url: '/meetingEdit/:meetingId',
                template: meetingEditTemplate,
                controller: 'meetingEditCtrl'
            })
            .state('main.workFlow.meetingStatistics', {
                url: '/meetingStatistics/:meetingId',
                template: meetingStatisticsTemplate,
                controller: 'meetingStatisticsCtrl'
            })
            .state('main.workFlow.gzhb', {
                url: '/flowGzhb',
                template: workFlowGzhbTemplate,
                controller: 'workFlowGzhbCtrl'
            }).state('main.labor.laborfbxq',{
                url:'/laborfbxq/:id',
                template:laborLaunchDetailTemplate,
                controller:'laborLaunchDetailCtrl'
            }).state('main.labor.index.laborMaybeLike',{
                url:'/laborMaybeLike',
                template:laborMaybeLikeTemplate,
                controller:'laborMaybeLikeCtrl'
            })
            .state('main.labor',{
                url:'/labor',
                template:laborTemplate
            })
            .state('main.labor.laborGffb',{
                url:'/laborGffb',
                template:laborGffbTemplate,
                controller:'laborGffbCtrl'
            })
            .state('main.labor.laborYgfb',{
                url:'/laborYgfb',
                template:laborYgfbTemplate,
                controller:'laborYgfbCtrl'
            })
            .state('main.labor.index',{
                url:'/index',
                template:laborIndexTemplate,
                controller:'laborIndexCtrl'
            })
            .state('main.labor.index.userInfo',{
                url:'/userInfo',
                template:laborUserInfoTemplate,
                controller:'laborUserInfoCtrl'
            })
            .state('main.labor.index.laborFindPeople',{
                url:'/laborFindPeople',
                template:laborFindPeopleTemplate,
                controller:'laborFindPeopleCtrl'
            })
            .state('main.labor.index.laborFindJob',{
                url:'/laborFindJob',
                template:laborFindJobTemplate,
                controller:'laborFindJobCtrl'
            })
            .state('main.labor.index.userInfo.auther',{
                url:'/auther',
                template:laborAutherTemplate,
                controller:'laborAutherCtrl'
            })
            .state('main.labor.index.userInfo.info',{
                url:'/info',
                template:laborInfoTemplate,
                controller:'laborInfoCtrl'
            })
            .state('main.labor.laborFbzxq',{
                url:'/laborFbzxq/:id',
                template:laborFbzxqTemplta,
                controller:'laborFbzxqCtrl'
            })
            .state('main.labor.index.userInfo.myFabu',{
                url:'/myFabu',
                template:laborMyFabuTemplate,
                controller:'laborMyFabuCtrl'
            })
            .state('main.labor.index.userInfo.myShouCang',{
                url:'/myShouCang',
                template:laborMyShouCangTemplate,
                controller:'laborMyShouCangCtrl'
            })
            .state('main.connections',{
                url:'/connections',
                template:connectionsHomeTemplate,
                controller:'connectionsHomeCtrl'
            })
            .state('main.connections.list',{
                url:'/list',
                template:connectionsListTemplate,
                controller:'connectionsListCtrl'
            })
            .state('main.connections.detail',{
                url:'/detail/:id',
                template:connectionsDetailTemplate,
                controller:'connectionsDetailCtrl'
            })
            
        // $locationProvider.html5Mode({
        //   enabled: true,
        //   requireBase: false
        // })
        $locationProvider.hashPrefix('!');
    }]
