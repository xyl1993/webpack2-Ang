import footer from '../tempPackage/main/directive/footer/footer.js';
import navbar from '../tempPackage/main/directive/navbar/navbar.js';
import finished from '../directive-utill/dataRepeatFinished.js';
import sideTool from '../directive-utill/sideTool/sideTool.js';
import hotReserous from '../tempPackage/index/directive/hotReserous/hotReserous.js';
import pagination from '../directive-utill/pagination/pagination.js';


export default angular
    .module( 'app.directives', [] )
    .directive( 'footer', footer )
    .directive( 'navbar', navbar )
    .directive( 'pagination', pagination )
    .directive( 'finished', finished )
    .directive( 'sideTool', sideTool )
    .directive( 'hotReserous', hotReserous )
    .name;