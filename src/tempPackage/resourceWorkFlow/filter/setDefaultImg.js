import defaultImg from '../../../resources/images/default_img1.png';
export default [function(){
    return function(img,userId) {
		if(!userId){
            return defaultImg;
        }else{
            return img;
        }
	};
}]