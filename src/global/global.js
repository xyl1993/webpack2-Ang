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
		// 第三方登录回调地址
		third_redirect_url : 'http://www.yunzhujia.cn/#/zxqd/0/',
		// 第三方登录取消授权地址
		third_cancel_power_url : 'http://www.yunzhujia.cn',
		
		// QQ  client_id
		qq_client_id : '101221829',
		// QQ 登录回调地址
		qq_redirect_uri : 'http://www.yunzhujia.cn',
		//微信appid
		wx_app_id: "wxa015ace57a6236f9",
		//微信登录地址
		wx_redirect_url :"http://www.yunzhujia.cn",
		// 小助手id
		friend_user_id : 0,
        token : 'EoNAuKmc34wpj9cTYKK1dVE3yE8=',
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
        deviceSystem : 0,
        teamId : 519,      //测试团队 
        //base_api_host : 'http://192.168.60.136:8080/platform'   //http://192.168.60.136:8080/platform
        base_api_host : '/platform',   //http://192.168.60.136:8080/platform
        base_http_ip:'http://localhost:3000/',
        white_resource_url:'www.yunzhujia.cn/platform/**',  //白名单,添加ng信任
        article_detail_url : '#!/main/articleDetail/',
        zixun_list_url : '#!/main/index/',
        work_flow: '#!/main/workFlow',
        team_set_url : '#!/main/teamSet'      //团队设置url
    } )
    .name;