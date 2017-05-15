import mainServ from '../tempPackage/main/serv/mainServ.js';
import indexServ from '../tempPackage/index/serv/indexServ.js';
import hotServ from '../tempPackage/index/directive/hotReserous/hotReserousServ.js';
import articleDetailServ from '../tempPackage/articleDetail/serv/indexServ.js';
export default angular
    .module( 'app.services', [] )
    .service( 'mainServ', mainServ )
    .service( 'indexServ', indexServ )
    .service( 'hotServ', hotServ )
    .service( 'articleDetailServ', articleDetailServ )
    .name;