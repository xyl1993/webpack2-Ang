//表情文字符号转换为html格式
import {em} from './baseFace.js';
export function emotionsToHtml(rContent) {
	if (rContent != "" && rContent != undefined) {
		var regx = /(\[[\u4e00-\u9fa5]*\w*\]){1}/g;
		// 正则查找“[]”格式
		var rs = rContent.match(regx);
		if (rs) {
			for (var i = 0; i < rs.length; i++) {
				for (var n = 0; n < em.length; n++) {
					if (em[n].phrase == rs[i]) {
						var t = "<img src=" + em[n].url
								+ " class='emotions_img' />";
						rContent = rContent.replace(rs[i], t);
						break;
					}
				}
			}
		}
	}
	return rContent;
};