require('./navbar.scss');
import template from './navbar.html'

export default ($state)=> {
    return {
        restrict: 'EA',
        template: template,
        link:(scope,element,iAttrs)=>{
            var state_name = $state.current.name.split('.')[1];
            $('#'+state_name).siblings('.active').removeClass('active');
            $('#'+state_name).addClass('active');
        	$(element).find('.list-row').click(function(){
        		if(!$(this).hasClass('active')){
					$(this).siblings('.active').removeClass('active');
	        		$(this).addClass('active');
	        		var tag = $(this).data('tag');
	        		switch(tag){
	        			case 0:$state.go('main.index');
	        			break;
                        case 1:$state.go('main.resources');
                        break;
	        		}
        		}
        	})
        }
    };
}
