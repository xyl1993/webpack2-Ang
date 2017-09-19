import mainController from '../tempPackage/main/ctrl/mainCtrl.js';
import indexController from '../tempPackage/index/ctrl/indexCtrl.js';
import resourcesHomeController from '../tempPackage/resourcesHome/ctrl/resourcesHomeCtrl.js';
import articleDetailCtrl from '../tempPackage/articleDetail/ctrl/indexCtrl.js';
import workFlowCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowCtrl.js';
import createTeamCtrl from '../tempPackage/team/ctrl/createTeamCtrl.js';
import teamSetCtrl from '../tempPackage/team/ctrl/teamSetCtrl.js';
import workFlowLeaveCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowLeaveCtrl.js';
import workFlowApprovalCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowApprovalCtrl.js';
import workFlowBgyplyCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowBgyplyCtrl.js';
import workFlowBxCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowBxCtrl.js';
import workFlowCcCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowCcCtrl.js';
import workFlowCgsqCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowCgsqCtrl.js';
import workFlowWjxxqfCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowWjxxqfCtrl.js';
import workFlowYyCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowYyCtrl.js';
import workFlowZjsqCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowZjsqCtrl.js';
import workFlowZsjyCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowZsjyCtrl.js';
import workFlowListCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowListCtrl.js';
import workFlowGzhbCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowGzhbCtrl.js';
import workFlowDetailCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowDetailCtrl.js';
import workFlowGzhbListCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowGzhbListCtrl.js';
import workFlowGzhbDetailCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowGzhbDetailCtrl.js';
import workFlowDefaultCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowDefaultCtrl.js';
import workFlowDataCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowDateCtrl.js';
import accountCtrl from '../tempPackage/account/ctrl/accountCtrl.js';
import loginCtrl from '../tempPackage/account/ctrl/loginCtrl.js';
import registerCtrl from '../tempPackage/account/ctrl/registerCtrl.js';
import forgetPasswordCtrl from '../tempPackage/account/ctrl/forgetPasswordCtrl.js';
import ensureAccountCtrl from '../tempPackage/account/ctrl/ensureAccountCtrl.js';
import xgmmCtrl from '../tempPackage/account/ctrl/xgmmCtrl.js';
import xgmmcgCtrl from '../tempPackage/account/ctrl/xgmmcgCtrl.js';
import passwordCtrl from '../tempPackage/account/ctrl/passwordCtrl.js';
import laborMaybeLikeCtrl from '../tempPackage/resourceLabor/ctrl/laborMaybeLikeCtrl.js';
import laborLaunchDetailCtrl from '../tempPackage/resourceLabor/ctrl/laborLaunchDetailCtrl.js';
import grzlCtrl from '../tempPackage/account/ctrl/grzlCtrl.js';
//劳务

import laborIndexCtrl from '../tempPackage/resourceLabor/ctrl/laborIndexCtrl.js';
import laborGffbCtrl from '../tempPackage/resourceLabor/ctrl/laborGffbCtrl.js';
import laborYgfbCtrl from '../tempPackage/resourceLabor/ctrl/laborYgfbCtrl.js';
import laborFindPeopleCtrl from '../tempPackage/resourceLabor/ctrl/laborFindPeopleCtrl.js';
import laborFindJobCtrl from '../tempPackage/resourceLabor/ctrl/laborFindJobCtrl.js';
import laborUserInfoCtrl from '../tempPackage/resourceLabor/ctrl/laborUserCtrl.js';
import laborAutherCtrl from '../tempPackage/resourceLabor/ctrl/laborAutherCtrl.js';
import laborInfoCtrl from '../tempPackage/resourceLabor/ctrl/laborInfoCtrl.js';
import laborFbzxqCtrl from '../tempPackage/resourceLabor/ctrl/laborFbzxqCtrl.js';
import laborMyFabuCtrl from '../tempPackage/resourceLabor/ctrl/laborMyFabuCtrl.js';
import laborMyShouCangCtrl from '../tempPackage/resourceLabor/ctrl/laborMyShouCangCtrl.js';

import meetingListCtrl from '../tempPackage/resourceMeeting/ctrl/meetingListCtrl.js';
import meetingEditCtrl from '../tempPackage/resourceMeeting/ctrl/meetingEditCtrl.js';
import meetingStatisticsCtrl from '../tempPackage/resourceMeeting/ctrl/meetingStatisticsCtrl.js';

//人脉
import connectionsHomeCtrl from '../tempPackage/connections/ctrl/connectionsHomeCtrl.js';
import connectionsListCtrl from '../tempPackage/connections/ctrl/connectionsListCtrl.js';
import connectionsDetailCtrl from '../tempPackage/connections/ctrl/connectionsDetailCtrl.js';


export default angular
    .module('app.controllers', [])
    .controller('mainController', mainController)
    .controller('indexController', indexController)
    .controller('resourcesHomeController', resourcesHomeController)
    .controller('articleDetailCtrl', articleDetailCtrl)
    .controller('workFlowCtrl', workFlowCtrl)
    .controller('createTeamCtrl', createTeamCtrl)
    .controller('teamSetCtrl', teamSetCtrl)
    .controller('workFlowLeaveCtrl', workFlowLeaveCtrl)
    .controller('workFlowApprovalCtrl', workFlowApprovalCtrl)
    .controller('workFlowBgyplyCtrl', workFlowBgyplyCtrl)
    .controller('workFlowBxCtrl', workFlowBxCtrl)
    .controller('workFlowCcCtrl', workFlowCcCtrl)
    .controller('workFlowCgsqCtrl', workFlowCgsqCtrl)
    .controller('workFlowWjxxqfCtrl', workFlowWjxxqfCtrl)
    .controller('workFlowYyCtrl', workFlowYyCtrl)
    .controller('workFlowZjsqCtrl', workFlowZjsqCtrl)
    .controller('workFlowZsjyCtrl', workFlowZsjyCtrl)
    .controller('workFlowListCtrl', workFlowListCtrl)
    .controller('workFlowGzhbCtrl', workFlowGzhbCtrl)
    .controller('workFlowDetailCtrl', workFlowDetailCtrl)
    .controller('workFlowDefaultCtrl', workFlowDefaultCtrl)
    // .controller('workFlowDataCtrl',workFlowDataCtrl)
    .controller('accountCtrl', accountCtrl)
    .controller('loginCtrl', loginCtrl)
    .controller('registerCtrl', registerCtrl)
    .controller('forgetPasswordCtrl', forgetPasswordCtrl)
    .controller('ensureAccountCtrl', ensureAccountCtrl)
    .controller('xgmmCtrl', xgmmCtrl)
    .controller('xgmmcgCtrl', xgmmcgCtrl)
    .controller('passwordCtrl', passwordCtrl)
    .controller('grzlCtrl', grzlCtrl)
    .controller('workFlowGzhbListCtrl', workFlowGzhbListCtrl)
    .controller('workFlowGzhbDetailCtrl', workFlowGzhbDetailCtrl)
    .controller('workFlowDefaultCtrl', workFlowDefaultCtrl)
    .controller('laborIndexCtrl', laborIndexCtrl)
    .controller('laborMaybeLikeCtrl', laborMaybeLikeCtrl)
    .controller('laborFindPeopleCtrl', laborFindPeopleCtrl)
    .controller('laborFindJobCtrl', laborFindJobCtrl)
    .controller('laborUserInfoCtrl', laborUserInfoCtrl)
    .controller('laborAutherCtrl', laborAutherCtrl)
    .controller('laborInfoCtrl', laborInfoCtrl)
    .controller('laborGffbCtrl', laborGffbCtrl)
    .controller('laborYgfbCtrl', laborYgfbCtrl)
    .controller('laborFbzxqCtrl', laborFbzxqCtrl)
    .controller('laborMyFabuCtrl',laborMyFabuCtrl)
    .controller('laborMyShouCangCtrl',laborMyShouCangCtrl)
    .controller('laborLaunchDetailCtrl', laborLaunchDetailCtrl)
    .controller('meetingListCtrl', meetingListCtrl)
    .controller('meetingEditCtrl', meetingEditCtrl)
    .controller('meetingStatisticsCtrl', meetingStatisticsCtrl)
    .controller('connectionsHomeCtrl', connectionsHomeCtrl)
    .controller('connectionsListCtrl', connectionsListCtrl)
    .controller('connectionsDetailCtrl', connectionsDetailCtrl)
    .name;
