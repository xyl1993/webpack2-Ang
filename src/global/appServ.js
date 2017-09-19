import commonServ from '../commonService/commonServ.js';
import mainServ from '../tempPackage/main/serv/mainServ.js';
import indexServ from '../tempPackage/index/serv/indexServ.js';
import hotServ from '../tempPackage/index/directive/hotReserous/hotReserousServ.js';
import articleDetailServ from '../tempPackage/articleDetail/serv/indexServ.js';
import workFlowServ from '../tempPackage/resourceWorkFlow/serv/workFlowServ.js';
import teamServ from '../tempPackage/team/serv/teamServ.js';
import accountServ from '../tempPackage/account/serv/accountServ.js';
import laborServ from '../tempPackage/resourceLabor/serv/laborServ.js';
import meetingServ from '../tempPackage/resourceMeeting/serv/meetingServ.js';

import connectionsServ from '../tempPackage/connections/serv/connectionsServ.js';

export default angular
    .module( 'app.services', [] )
    .service( 'commonServ', commonServ)
    .service( 'mainServ', mainServ )
    .service( 'indexServ', indexServ )
    .service( 'hotServ', hotServ )
    .service( 'articleDetailServ', articleDetailServ )
    .service( 'articleDetailServ', articleDetailServ )
    .service( 'workFlowServ', workFlowServ )
    .service( 'teamServ', teamServ )
    .service( 'accountServ', accountServ )
    .service( 'laborServ', laborServ )
    .service( 'meetingServ', meetingServ )
    .service( 'connectionsServ', connectionsServ)
    .name;