export default ['$state',function($state){
    return {
        restrict: 'AE',
        link:function(scope,element,iAttrs){
            var current = $state.current.url;
            switch(current){
                case '/laborMaybeLike':
                    $('#navMayBeLike').addClass('active');
                    break;
                case '/laborFindPeople':
                    $('#navFindPeople').addClass('active');
                    break;
                case '/laborFindJob':
                    $('#navFindJob').addClass('active');
                    break;
                case '/auther':
                case '/info':
                    $('#navUserInfo').addClass('active');
                    break;
            }
            $(element).on('click','a',function(){
                let $a = $(element).find('a');
                $a.removeClass('active');
                $(this).addClass('active');
            })
        }
    };
}]