import logo from '../tempPackage/main/directive/navbar/images/logo.png';
require ('../../bower_components/qrcode/jquery.qrcode.min.js');
export default ['$timeout','exitfxService','$stateParams','APPBASE',
function($timeout,exitfxService,$stateParams,APPBASE){
    return {
        restrict: 'AE',
        link: (scope, element, attr)=> {
            var id,url,dynamicId;
            id = $stateParams.id;
            var nm;
            let fxzxMethod = function(url,fxtype,picUrl,title){
                if(fxtype==='qq'){
                    // qq好友
                    window.open("http://connect.qq.com/widget/shareqq/index.html?url="+encodeURIComponent(url)+"&summary="+encodeURIComponent(url));
                }else if(fxtype==='sina'){
                    //新浪微博
                    window.open("http://service.weibo.com/share/share.php?pic=" +encodeURIComponent(picUrl) +"&title=" +   
                            encodeURIComponent(title.replace(/&nbsp;/g, " ").replace(/<br \/>/g, " "))+ "&url=" + encodeURIComponent(url));  
                }else if(fxtype==='tx'){
                    //腾讯微博
                    window.open('http://v.t.qq.com/share/share.php?url='+encodeURIComponent(url)+  
                            '&title='+encodeURI(title)+'&appkey='+encodeURI("aa"));       
                }else{
                    //朋友圈
                    $('#ifriendCloseBtn').bind('click',function(){
                        $('#ifriend-dialog').hide();
                        $('#qrcode').remove();
                    });
                    $("div#friend").html("<div id='qrcode'></div>");
                    $('#qrcode').qrcode({width: 164,height:164,text: url});
                    $('#ifriend-dialog').show();
                }
            };
            $(element).click(function(){
                //分享的详情
                var dytype = element.attr('name').split('+')[0];
                name = dytype;
                //分享类型
                var fxtype = element.attr('name').split('+')[1];
                var title = "来自云筑加的分享";
                var picUrl = logo;
                //根据资讯id，判断资讯是否存在
                if(dytype=="laborfbxq"){
                    exitfxService.query(id,dytype).success(function(res){
                        if(res.code === 0){
                            let url=APPBASE.share_laborActical+id;
                            fxzxMethod(url,fxtype,picUrl,title);
                        }
                    })
                }
            })
        }
    };
}]