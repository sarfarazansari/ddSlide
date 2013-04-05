/*
 * ddslide
 * Copyright 2013 Sarfaraz Ansari
 * website url -- http://visualdecoder.com/
 * Plugin location url -- http://visualdecoder.com/plugins/ddSlide/
 * download location file url -- https://github.com/sarfarazansari/ddSlide
 *
 * Version 1  
 *
 * This pluggin animate target div by it's css properties.
 * It is extremely lightweight and very smart it detects how to animate it from which side.
 * In this pluggin pass parameters for example target div id, direction from where to animate (top, right, bottom, left), animation speed
 * 
 * 
 * It is completely customizable as well via CSS.
 *
 * This ddSlide jQuery plug-in is licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($){
    $.fn.ddSlide = function(options){
  	
		var defaults = { 
			activation: 'click',
			animationSpeed: 2000,
			position: '',
			target: '',
			autoclose:true,
			//autoclose:false,
			//delay: 400,
			//fadeIn: 200,
			//fadeOut: 200,
		  	before: function(){},
		  	complete: function(){}
	  	};
	 	var opts = $.extend(defaults, options);
		
		//console.log(opts.position);
		
		return this.each(function(){
			var elem = $(this);
			
			if(opts.activation == "click"){
				elem.click(function(){
					active_ddSlide();
					return false;
				});
			}
			
			else if(opts.activation == "hover"){
				
			}
			
			else if(opts.activation == "focus"){
				
			}
			
		
		function css(a){
			var sheets = document.styleSheets, o = {};
			for(var i in sheets) {
				var rules = sheets[i].rules || sheets[i].cssRules;
				for(var r in rules) {
					if(a.is(rules[r].selectorText)) {
						o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
					}
				}
			}
			return o;
		}
		
		function css2json(css){
			var s = {};
			if(!css) return s;
			if(css instanceof CSSStyleDeclaration) {
				for(var i in css) {
					if((css[i]).toLowerCase) {
						s[(css[i]).toLowerCase()] = (css[css[i]]);
					}
				}
			} 
			else if(typeof css == "string") {
				css = css.split("; ");          
				for (var i in css) {
					var l = css[i].split(": ");
					s[l[0].toLowerCase()] = (l[1]);
				};
			}
			return s;
		}
		var style= css($(opts.target));
		//console.log(style, opts.position);
		
		function active_ddSlide(){
			
			
			var optionObj1 = {}, optionObj2 = {};
			//console.log(style.left.substring(0,4));
			if(typeof style.left !='undefined'   && style.left.substring(0,4)<0 ){
				optionObj1[opts.position] = style.left;
			}
				
			else if(typeof style.right !='undefined'   && style.right.substring(0,4)<0 ){
				optionObj1[opts.position] = style.right;
			}
				
			else if(typeof style.bottom !='undefined'   && style.bottom.substring(0,4)<0 ){
				optionObj1[opts.position] = style.bottom;
			}
				
			else if(typeof style.top !='undefined'   && style.top.substring(0,4)<0 ){
				optionObj1[opts.position] = style.top;
			}
			
			
			
				
			
			optionObj2[opts.position] = 0;
			
			//console.log(opts.position);
			//console.log(optionObj1, optionObj2);

			if ($(opts.target).is(':visible')) {
				
				$(opts.target).animate(
					optionObj1,
					opts.animationSpeed,
					function(){
						$(opts.target).hide();
					}
				);
			} 
			else {
				$(opts.target).show().animate(
					optionObj2,
					opts.animationSpeed,
					function(){
						
					}
				);
			}
			
			$(opts.target).mouseup(function(e){
				e.preventDefault();
				return false;
			});
			
			$(document).unbind('mouseup');	
			
			$(document).mouseup(function(e){
				//console.log(opts.autoclose);
				$(document).unbind('mouseup');	
				if(opts.autoclose){
					$(opts.target).animate(
						optionObj1,
						opts.animationSpeed,
						function(){
							$(opts.target).hide();
						}
					);
				}
				else{
					//console.log('clicked');
				}
				
			});
		}
		
	
	});	
		
    }
})(jQuery);


