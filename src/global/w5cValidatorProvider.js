/*
 * w5c验证配置
*/

export default ['w5cValidatorProvider',function( w5cValidatorProvider){

    // 全局配置
    w5cValidatorProvider.config({
        blurTrig   : false,
        showError  : true,
        removeError: true

    });
    w5cValidatorProvider.setRules({
        email   : {
            required: "输入的邮箱地址不能为空",
            email   : "输入邮箱地址格式不正确"
        },
        teamName : {
            required:"团队名称不能为空",
        },
        realName:{
            required:"请填写用户姓名",
        },
        tel : {
            required:"请填写手机号码",
            pattern:"手机号码格式不正确"
        },
        password : {
            required:"密码不能为空"
        },
        validCode : {
            required:"验证码不能为空"
        }

    });
}]
