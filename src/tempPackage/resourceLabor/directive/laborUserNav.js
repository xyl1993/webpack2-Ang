export default ['$state',function($state){
    return {
        restrict: 'AE',
        link:function(scope,element,iAttrs){
            var current = $state.current.url;
            switch(current){
                case '/info':
                    $('#nav-xiaoxi').addClass('active');
                    break;
                case '/auther':
                    $('#nav-ca').addClass('active');
                    break;
                case '/chat':
                    $('#nav-chat').addClass('active');
                    break;
            }
            $(element).on('click','a',function(){
                let $a = $(element).find('a');
                let $this = $(this);
                $a.removeClass('active');
                $this.addClass('active');
            })
        }
    };
}]