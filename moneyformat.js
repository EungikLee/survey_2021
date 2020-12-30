(function (jQuery) {
	jQuery.fn.simpleMoneyFormat = function() {
		this.each(function(index, el) {		
			var elType = null; // input or other
			var value = null;
			// get value
			if(jQuery(el).is('input') || jQuery(el).is('textarea')){
				value = jQuery(el).val().replace(/\./g, '');
				elType = 'input';
			} else {
				value = jQuery(el).text().replace(/\./g, '');
				elType = 'other';
			}
			// if value changes
			jQuery(el).on('paste keyup', function(){
				value = jQuery(el).val().replace(/\./g, '');
				formatElement(el, elType, value); // format element
			});
			formatElement(el, elType, value); // format element
		});
		function formatElement(el, elType, value){
			var result = '';
			var valueArray = value.split('');
			var resultArray = [];
			var counter = 0;
			var temp = '';
			for (var i = valueArray.length - 1; i >= 0; i--) {
				temp += valueArray[i];
				counter++
				if(counter == 3){
					resultArray.push(temp);
					counter = 0;
					temp = '';
				}
			};
			if(counter > 0){
				resultArray.push(temp);				
			}
			for (var i = resultArray.length - 1; i >= 0; i--) {
				var resTemp = resultArray[i].split('');
				for (var j = resTemp.length - 1; j >= 0; j--) {
					result += resTemp[j];
				};
				if(i > 0){
					result += '.'
				}
			};
			if(elType == 'input'){
				jQuery(el).val(result);
			} else {
				jQuery(el).empty().text(result);
			}
		}
	};
}(jQuery));