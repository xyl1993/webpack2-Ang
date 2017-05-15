/**
 * Created by xyl on 2017/4/27.
 * 全局常量
 */
export default angular
    .module( 'app.APPBASE', [] )
    .constant( 'APPBASE', {
        sysErrors : {
            9001 : '服务器状态异常',
            9002 : '资源不存在',
            9003 : '不可删除的数据'
        },
        //base_api_host : 'http://192.168.60.136:8080/platform'   //http://192.168.60.136:8080/platform
        base_api_host : 'http://www.yunzhujia.cn',   //http://192.168.60.136:8080/platform
        white_resource_url:'http://www.yunzhujia.cn/**',  //白名单,添加ng信任
        article_detail_url : 'http://localhost:3000/#!/main/articleDetail/'
    } )
    .name;