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
// import workFlowDataCtrl from '../tempPackage/resourceWorkFlow/ctrl/workFlowDateCtrl.js';
import accountCtrl from '../tempPackage/account/ctrl/accountCtrl.js';
import loginCtrl from '../tempPackage/account/ctrl/loginCtrl.js';
import registerCtrl from '../tempPackage/account/ctrl/registerCtrl.js';
import forgetPassWordCtrl from '../tempPackage/account/ctrl/forgetPassWordCtrl.js';
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
    .controller( 'accountCtrl', accountCtrl)
    .controller( 'loginCtrl', loginCtrl)
    .controller( 'registerCtrl', registerCtrl)
    .controller( 'forgetPassWordCtrl', forgetPassWordCtrl)
    .controller( 'workFlowGzhbListCtrl', workFlowGzhbListCtrl )
    .controller( 'workFlowGzhbDetailCtrl', workFlowGzhbDetailCtrl )
    .controller( 'workFlowDefaultCtrl', workFlowDefaultCtrl)
    .name;
