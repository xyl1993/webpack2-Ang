/*工作流程左边目录点击样式控制*/
export default ['$state',function($state){
    return {
        restrict: 'AE',
        link:function(scope,element,iAttrs){
            var current = $state.current.url;
            switch(current){
                case '/flowGzhb':
                    $('.workFlow_menu .gzhbList').addClass('active');
                    break;
                case '/flowLeave':
                    $('.workFlow_menu .qj').addClass('active');
                    break;
                case '/flowApproval':
                    $('.workFlow_menu .swsp').addClass('active');
                    break;
                case '/flowWjxxqf':
                    $('.workFlow_menu .wjxxqf').addClass('active');
                    break;
                case '/flowBx':
                    $('.workFlow_menu .bx').addClass('active');
                    break; 
                case '/flowCc':
                    $('.workFlow_menu .cc').addClass('active');
                    break;
                case '/flowYy':
                    $('.workFlow_menu .yy').addClass('active');
                    break;   
                case '/flowBgyply':
                    $('.workFlow_menu .bgyply').addClass('active');
                    break; 
                case '/flowCgsq':
                    $('.workFlow_menu .cgsq').addClass('active');
                    break;
                case '/flowZjsq':
                    $('.workFlow_menu .zjsq').addClass('active');
                    break; 
                case '/flowZsjy':
                    $('.workFlow_menu .zsjy').addClass('active');
                    break;    
            }
            $(element).on('click','li',function(){
                $('.workFlow_menu li.active').removeClass('active');
                $(this).addClass('active')
            })
        }
    };
}]