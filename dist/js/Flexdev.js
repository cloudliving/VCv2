(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        reCalc = function() {
            //根据clientWidth计算根元素大小
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
        },
        optiImg = function() {
            //判断设备的dpr值
            var dpr = 0;
            if (!dpr) {
                var isAndroid = win.navigator.appVersion.match(/android/gi);
                var isIPhone = win.navigator.appVersion.match(/iphone/gi);
                var devicePixelRatio = win.devicePixelRatio;

                if (isIPhone || isAndroid) {
                    // iOS和安卓下，区分不同dpr，其余设备用1倍方案
                    if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                        dpr = 3;
                    } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                        dpr = 2;
                    } else {
                        dpr = 1;
                    }
                } else {
                    dpr = 1;
                };
            };

            //判断设备是否支持WebP
            var webP = new Image(),
                flexImg = doc.querySelectorAll('img'),
                leng = flexImg.length,
                URL = 'http://cloudliving-img.b0.upaiyun.com/static/Home/',
                status = '';
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            webP.onload = webP.onerror = function() {
                //判断是否支持WebP来添加对应标识符
                (webP.height === 2) ? status = 'w': status = 'x';
                //通过dpr判断使用几倍图
                for (var i = 0; i < leng; i++) {
                    var flexSrc = flexImg[i].getAttribute('data-img');
                    if (dpr === 1) {
                        flexSrc = URL + flexSrc + '!1' + status;
                    } else if (dpr === 2 || dpr === 3) {
                        flexSrc = URL + flexSrc + '!2' + status;
                    };
                    flexImg[i].setAttribute('src', flexSrc);
                };
            };
        };

    //防止不支持绑定事件
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, reCalc, false);
    doc.addEventListener('DOMContentLoaded', reCalc, false);
    doc.addEventListener('DOMContentLoaded', optiImg, false);
    
})(document, window);
