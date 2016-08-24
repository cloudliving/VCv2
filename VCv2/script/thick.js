(function(){

	function thick(){
		var links = Zepto('a[data-thick]').not('.add-thick');

		if (!links.length){return};

		links.on('click',function(e){
			e.preventDefault();
		});

		links.on('tap',function(e){
			location.href = Zepto(this).attr('href');
		});

		links.addClass('add-thick')
	};

	window.addEventListener('load',thick);
	window.addEventListener('DOMSubtreeModified',thick);

})();