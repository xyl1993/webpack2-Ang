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

export default angular
    .module( 'app.directives', [] )
    .directive( 'footer', footer )
    .directive( 'navbar', navbar )
    .directive( 'pagination', pagination )
    .directive( 'finished', finished )
    .directive( 'sideTool', sideTool )
    .directive( 'hotReserous', hotReserous )
    .directive( 'flowMenuClick', flowMenuClick )
    .directive( 'customOnChange', customOnChange )
    .directive( 'successDialog', successDialog )
    .directive( 'chosen', chosen )
    .directive( 'approval', approval )
    .directive( 'ccDirective', ccDirective )
    .directive( 'addMemberDialog', addMemberDialog)
    .directive( 'spSuccess', spSuccess)
    .directive( 'infoDialog',infoDialog)
    .name;