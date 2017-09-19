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
        // 新浪微博client_id
		sina_client_id : '3744892205',
		// 腾讯微博appkey
		sina_txwb_appkey : '801566482',
		// QQ  client_id
		qq_client_id : '101221829',
		//微信appid
		wx_app_id: "wxa015ace57a6236f9",
		// 小助手id
		friend_user_id : 0,
        // token : 'EoNAuKmc34wpj9cTYKK1dVE3yE8=',
        allowUrls : "/\/exportDayReport|\/meeting|\/version|\/userLogin|\/selectPathByCompany|"+
                    "\/sendValidCode|\/userWebLogin|\/userWebRegist|\/images|\/api.weibo.com|"+
                    "\/image|\/getAnonymousDetailNoToken|\/getNormalDetailNoToken|\/ueditor|"+
                    "\/selectRankForApp|\/selectRecruitForApp|\/selectArticleDetails|\/upArticleReadCt|"+
                    "\/upArticlePraiseCt|\/findPortraitByLoginId|\/findSinainfoByCode|\/getTokenByThired"+
                    "|\/freemarker|\/oauthServlet|\/wbQQLogin|\/wxLogin|\/sendMessage|\/selectVoteDetail"+
                    "|\/infoList|\/infoCategory|\/selectInfoDetails|\/hot|\/resource|\/userLoginResource"+
                    "|\/userWebLoginResource|\/userWebRegistResource|\/userWebRegistResource|\/infoAppList"+
                    "|\/contact|\/op|\/findHasNewsDynamicById|\/findHasBussDynamicById|\/findHasRecruitDynamicById"+
                    "|\/upArticleReadCt/",
        requireToeknStates : /workFlow/,              //需要token的页面
        resourcesView : /workFlow|resources|labor/,         //菜单焦点定位在资源上的视图
        deviceSystem : 0,
        teamId : 519,      //测试团队 
        //base_api_host : 'http://192.168.60.136:8080/platform'   //http://192.168.60.136:8080/platform
        base_api_host : '/platform',   ///platform
        //base_http_ip:'http://localhost:3000/',
        white_resource_url:'http://www.yunzhujia.cn/platform/**',  //白名单,添加ng信任
        login_path: '#!/account/login',
        app_login_path: '#!/main/login',
        article_detail_url : '#!/main/articleDetail/',
        zixun_list_url : '#!/main/index/',
        work_flow: '#!/main/workFlow',
        team_set_url : '#!/main/teamSet',      //团队设置url
        share_laborActical : 'http://www.yunzhujia.cn/#!/main/labor/laborfbxq/',   //分享的资源发布详情地址
        game_url:'http://www.yunzhujia.cn/game/index.html#/joinGame/'    //加入游戏房间
    } )
    .name;