var cursor = {
	/**
	 * 获取光标的位置
 	 * @param {Object} ele : dom的原生引用
 	 * 
	 */
	get:function(ele) {
		var rangeData = {
			text:"",  // 选择的文字
			start:0,  // 光标开始位置
			end:0     // 光标的结束位置
		}
		,	eleVal = ele.value
		;
		
		if(ele.setSelectionRange) {
			ele.focus();
			rangeData.start= ele.selectionStart;
			rangeData.end = ele.selectionEnd;
			rangeData.text = ele.value.substring(rangeData.start, rangeData.end);
		}
		// ie
		else if(document.selection) {
			ele.focus();
			var cRange = document.selection.createRange()
			,	dRange = document.body.createTextRange()
			,	i
			;
			
			dRange.moveToElementText(ele);
			rangeData.text = cRange.text;
			
			for(i=0; cRange.moveStart("character", -1)!==0; i++) {
				if(ele.value.charAt(i) == '/r') {
					i++;
				}
			}
			
			rangeData.start = i;
			rangeData.end = i + rangeData.text.length;
		}
		
		return rangeData;
	}
};
