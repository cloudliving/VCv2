// 打卡抽奖
var rotate = function(){
	var isAnimation = false,
		turn = $('.j-rotate-content'),
		btn = $('.j-rotate-btn')

	function animation(index, callback){
		if ( !isAnimation ) {
			isAnimation = true
			btn.addClass('active')

			var angle = (5-index)*60 + 1080 + 30
			console.log(angle)
			turn.addClass("transition")
			turn.css({
				"-webkit-transform": "rotate("+angle+"deg)",
				"transform": "rotate("+angle+"deg)"
			})

			setTimeout(function(){
				callback()
			}, 2000)  // 定时器间隔与动画间隔相同
		}
	}

	function clear(){
		isAnimation = false
		btn.removeClass('active')

		turn.removeClass("transition")
		turn.css({
			"-webkit-transform": "rotate(0)",
			"transform": "rotate(0)"
		})
	}


	animation.clear = clear
	return animation
}()

// 滚屏
var marquee = function(){
	var 
		// wrap = $('.j-marquee'),
		ctn = $('.j-marquee'),
		ch = ctn.height(),
		h = 0 // 已滚动的距离
		offset = .8 // 单次滚动距离

	ctn.append(ctn.children('li').clone())

	setTimeout(function(){
		ctn.css({
			transform: 'translateY(-'+h+'px)',
			webkitTransform: 'translateY(-'+h+'px)'
		})

		if (h > ch ) {
			h = 0
		} else {
			h += offset
		}

		setTimeout(arguments.callee, 50)
	}, 50)
}

// 积分抽奖
var lottery = (function(){
	var wrap = $('.wrap'),
		items = $('.j-lottery').children('li'),
		btn = $('.j-btn'),
		speed = slowest = 500, // 初始速度及最慢速度
		fastest = 50, // 最快速度
		as = 50, // 加速度
		count = 0, // 跑过的格子数
		total, // 跑过n个格子数后进入end环节, 在call函数里初始化
		start, running, end, call,
		is_running = false,
		args = {
			id: null,
			callback: null
		}

	start = function() {
		running()

		// 如果计数达成
		if (count >= total) {
			// 减速
			// if 减速到最低
			// 进入end环节
			speed += as

			if (speed >= slowest) {
				setTimeout(function(){
					end()
				}, slowest)
			} else {
				setTimeout(arguments.callee, speed)
			}
		} 
		// 否则计数+1
		// 判断是否需要加速
		// 再次调用函数
		else {
			count++
			speed = (speed - as <= fastest) ? fastest : speed - as

			setTimeout(arguments.callee, speed)
		}


	}

	running = function(){
		var active = items.filter('.active'),
			next = active.next()


		active.removeClass('active')
		next.length ? next.addClass('active') : items.eq(0).addClass('active')
	}

	end = function(){
		console.log(items.filter('.active'))
		console.log(args.id)

		if (items.filter('.active').attr('data-id') == args.id) {
			args.callback && args.callback()
		} else {
			running()
			setTimeout(arguments.callee, slowest)
		}
	}

	call = function(id, callback){
		if (!is_running) {
			args.id = id
			args.callback = callback
			is_running = true
			total = 36+id

			// 禁止按钮点击
			btn.addClass('disabled')
			items.eq(0).addClass('active')
			start(id, callback)
		}
	}

	call.clear = function(){
		items.removeClass('active')
		is_running = false
		count = 0

		// 恢复按钮点击
		btn.removeClass('disabled')
	}

	return 	call
})()