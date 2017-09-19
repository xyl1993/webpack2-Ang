import defaultImg from '../tempPackage/resourceWorkFlow/filter/setDefaultImg.js';
import fileSubstring from '../tempPackage/resourceWorkFlow/filter/fileSubstring.js';
import dateDivision from '../tempPackage/resourceLabor/filter/dateDivision.js';
import mathCeil from '../tempPackage/resourceLabor/filter/mathCeil.js';
import textSplitFilter from '../tempPackage/resourceLabor/filter/textSplitFilter.js';
import mopReplaceFilter from '../tempPackage/resourceLabor/filter/mopReplaceFilter.js';
import hystatesfilter from '../tempPackage/resourceMeeting/filter/hystatesfilter.js';
import emotionsToHtml from '../tempPackage/connections/filter/emotionsToHtml.js';
import dateFilter from '../tempPackage/connections/filter/dateFilter.js';
export default angular
    .module( 'app.filters', [] )
    .filter( 'defaultImg', defaultImg )
    .filter( 'fileSubstring', fileSubstring )
    .filter( 'dateDivision', dateDivision)
    .filter( 'mathCeil', mathCeil)
    .filter( 'textSplitFilter', textSplitFilter)
    .filter( 'mopReplaceFilter', mopReplaceFilter)
    .filter( 'hystatesfilter', hystatesfilter)
    .filter( 'emotionsToHtml', emotionsToHtml)
    .filter( 'dateFilter', dateFilter)
    .name;