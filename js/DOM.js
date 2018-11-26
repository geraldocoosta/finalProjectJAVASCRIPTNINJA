(function(window,document){

	function DOM(stringCssSelector){
		this.element = document.querySelectorAll(stringCssSelector);
	}

	DOM.prototype.on = function(strEvent,callback){
		Array.prototype.forEach.call(this.element,function(item){
			item.addEventListener(strEvent,callback,false);
		});
	}

	DOM.prototype.off = function(strEvent,callback){
		Array.prototype.forEach.call(this.element,function(item){
			item.removeEventListener(strEvent,callback,false);
		});
	}

	DOM.prototype.get = function(){
		return this.element;
	}

	DOM.prototype.forEach = function forEach(){
		Array.prototype.forEach.apply(this.element,arguments);
	}

	DOM.prototype.map = function map(){
		return Array.prototype.map.apply(this.element,arguments);
	}

	DOM.prototype.reduce = function reduce(){
		return Array.prototype.reduce.apply(this.element,arguments);
	}

	DOM.prototype.reduceRight = function reduceRight(){
		return Array.prototype.reduceRight.apply(this.element,arguments);
	}

	DOM.prototype.every = function every(){
		return Array.prototype.every.apply(this.element,arguments);
	}

	DOM.prototype.some = function some(){
		return Array.prototype.some.apply(this.element,arguments);
	}

	DOM.prototype.isArray = function isArray(args){
		return abstractToString(atgs) === '[object Array]';
	}

	DOM.prototype.isObject = function isObject(args){
		return abstractToString(atgs) === '[object Object]';
	}

	DOM.prototype.isFunction = function isFunction(args){
		return abstractToString(atgs) === '[object Function]';
	}

	DOM.prototype.isNumber = function isNumber(args){
		return abstractToString(atgs) === '[object Number]';
	}

	DOM.prototype.isString = function isString(args){
		return abstractToString(atgs) === '[object String]';
	}

	DOM.prototype.isBoolean = function isBoolean(args){
		return abstractToString(atgs) === '[object Boolean]';
	}

	DOM.prototype.isNull = function isNull(args){
		return abstractToString(atgs) === '[object Null]' ||
		abstractToString(atgs) === '[object Undefined]';
	}

	function abstractToString(args){
		return Object.prototype.toString.call(args);
	}

	window.DOMLib = DOM;
})(window,document);