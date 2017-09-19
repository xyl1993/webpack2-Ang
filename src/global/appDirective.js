/*底部footer模版*/
import footer from '../tempPackage/main/directive/footer/footer.js';
/*顶部菜单模版*/
import navbar from '../tempPackage/main/directive/navbar/navbar.js';
/*监听ng-repeat遍历完成*/
import finished from '../directive-utill/dataRepeatFinished.js';
/*返回顶部模版*/
import sideTool from '../directive-utill/sideTool/sideTool.js';
/*热门资讯模版*/
import hotReserous from '../tempPackage/index/directive/hotReserous/hotReserous.js';
/*分页指令模版*/
import pagination from '../directive-utill/pagination/pagination.js';
/*资源左边按钮点击样式事件*/
import flowMenuClick from '../tempPackage/resourceWorkFlow/directive/flowMenuClick/flowMenuClick.js';
/*监听file onchange事件*/
import customOnChange from '../directive-utill/customOnChange.js';
/*监听file onchange事件*/
import successDialog from '../directive-utill/successDialog/successDialog.js';
/*自定义下拉框*/
import chosen from '../directive-utill/chosen/chosen.js';
/*审批人下拉*/
import approval from '../directive-utill/approval/approval.js';
/*抄送人下拉*/
import ccDirective from '../directive-utill/cc/cc.js';
/*添加成员组件*/
import addMemberDialog from '../directive-utill/addMemberDialog/addMemberDialog.js';
/*审核通过组件*/
import spSuccess from '../directive-utill/spSuccess/spSuccess.js';
/*消息提示组件*/
import infoDialog from '../directive-utill/infoDialog/info.js';
/*流程菜单组件*/
import workFlowTitle from '../tempPackage/resourceWorkFlow/directive/workFlowTitle/workFlowTitle.js';
/*劳务菜单组件*/
import laborTitle from '../tempPackage/resourceLabor/directive/laborTitle/laborTitle.js';
/*劳务左边菜单组件*/
import laborNav from '../tempPackage/resourceLabor/directive/laborNav.js';
/*添加评论组件*/
import addComment from '../tempPackage/resourceLabor/directive/addCommentDialog/addCommentDialog.js';
/*劳务添加福利组件*/
import tjfl from '../tempPackage/resourceLabor/directive/tjfl/tjfl.js';
/*投诉组件*/
import complaintDialog from '../tempPackage/resourceLabor/directive/complaintDialog/complaintDialog.js';
/*我的页面上面菜单样式组件*/
import laborUserNav from '../tempPackage/resourceLabor/directive/laborUserNav.js';
/*错误信息显示弹窗*/
import errorDialog from '../directive-utill/errorDialog/errorDialog.js';
/*alert信息显示弹窗*/
import alertDialog from '../directive-utill/alertDialog/alert.js';
/*第三方分享*/
import shareComponent from '../directive-utill/shareComponent.js';
/*textarea自适应高度*/
import autoTextarea from '../tempPackage/connections/directive/autoTextarea.js';
/*滚动条事件*/
import pullrefresh from '../directive-utill/pullrefresh.js';
/**二维码 */
import codeDialog from '../directive-utill/codeDialog/codeDialog.js';
export default angular
    .module('app.directives', [])
    .directive('footer', footer)
    .directive('navbar', navbar)
    .directive('pagination', pagination)
    .directive('finished', finished)
    .directive('sideTool', sideTool)
    .directive('hotReserous', hotReserous)
    .directive('flowMenuClick', flowMenuClick)
    .directive('customOnChange', customOnChange)
    .directive('successDialog', successDialog)
    .directive('chosen', chosen)
    .directive('approval', approval)
    .directive('ccDirective', ccDirective)
    .directive('addMemberDialog', addMemberDialog)
    .directive('spSuccess', spSuccess)
    .directive('infoDialog', infoDialog)
    .directive('workFlowTitle', workFlowTitle)
    .directive('laborTitle', laborTitle)
    .directive('laborNav', laborNav)
    .directive('addComment', addComment)
    .directive('tjfl', tjfl)
    .directive('complaintDialog', complaintDialog)
    .directive('laborUserNav', laborUserNav)
    .directive('errorDialog', errorDialog)
    .directive('alertDialog', alertDialog)
    .directive('shareComponent', shareComponent)
    .directive('autoTextarea', autoTextarea)
    .directive('pullrefresh', pullrefresh)
    .directive('codeDialog', codeDialog)
    .name;