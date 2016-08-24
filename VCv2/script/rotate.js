var rotate = function(){
	var isAnimation = false;
	var btn = $('.j-rotate-btn');
	var turn = $('.j-rotate-content');
	var unit = $({});

	function animation(){
		if ( !isAnimation ) {
			isAnimation = true;
			turn.addClass("transition");
			turn.css({
				"-webkit-transform": "rotate(1274deg)",
				"transform": "rotate(1274deg)"
			})

			setTimeout(function(){

				// 创建自定义事件
				unit.trigger("rotate",{
					"key":"value"  // 传参
				});

				clear()
			}, 2000)  // 定时器间隔与动画间隔相同
		}
	}

	function clear(){
		isAnimation = false;
		turn.removeClass("transition")
		turn.css({
			"-webkit-transform": "rotate(0)",
			"transform": "rotate(0)"
		})
	}

	// 返回公共接口
	unit.init = function(){
		btn.on('tap',animation);
	}

	return unit
}()