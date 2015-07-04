define("MT.SPM/0.1.0/src/page/index-mood-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/6/12.
 */

exports.init = function () {

    var _protected = {};

    var blogTimeLine = {};

    // For timeline items(DOM) & mood items(Json);

    var currentPage = 1,
        pageCount = 1;

    var $cleanItem = $('.item');
    var $queryMoreBtn = $('.query-more');


    // Protected Functions

    _protected.initPublic = function () {
        var public = require("MT.SPM/0.1.0/src/page/public-debug");
        public.init();
    };

    _protected.queryMood = function(cPage,callback){

        $.get('/api/moods/gets/'+cPage,function(data) {

            if(data && data.code === 200){

                console.log(data);

                callback(data.data)

            }else{
                console.log('err');
            }
        });
    };

    _protected.initTimeline = function () {

        var timeline = require("MT.SPM/0.1.0/src/utils/timeline-debug");

        blogTimeLine = timeline('.timeline',{
            item   : '.item',
            margin : 60, //左右之间的间距
            top    : 20 ,  //距离上一个item的间距
            minTop : 10,  //如在手机下显示，可以将上下间距适当缩小
            resize : true, //监听窗口变化
            minScreen : 640 //当窗口小于640时，单列显示
        });

        blogTimeLine.render();
    };

    // Call Protected Methods;

    _protected.initPublic();
    _protected.initTimeline();

    _protected.queryMood(currentPage, function (data) {

        currentPage = data.currentPage;
        pageCount = data.pageCount;
        var showMoreBtn = pageCount > currentPage;

        if(showMoreBtn){
            // show nextPage btn;
            $queryMoreBtn.show();

        }else{
            // hide nextPage btn;
            $queryMoreBtn.hide();
        }

        $('.item').remove();

        var _moods = data.moods;

        for (var i = _moods.length - 1; i >= 0; i--) {
            var _mood = _moods[i];

            var _tMood = $cleanItem.clone();
            $(_tMood).find('.post-content').html(_mood.content);
            $(_tMood).find('.post-date').html(_mood.datetime);

            $('.timeline').append(_tMood);

            blogTimeLine.render();
        }
    });

    $queryMoreBtn.click(function(e){
        e.preventDefault();

        if(pageCount > currentPage){
            _protected.queryMood(currentPage+1);
        }else{
            alert('No more to load...');
        }

    });

};
});
define("MT.SPM/0.1.0/src/page/public-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/18.
 */

exports.init = function () {

    var updateBrowser = require("MT.SPM/0.1.0/src/components/update-browser-debug").create('',false);
    updateBrowser.init();

    var toggleNav = require("MT.SPM/0.1.0/src/components/toggle-nav-debug").create($('.nav-ul-toggle a'),$('.nav-ul'));
    toggleNav.init();

    var wechat = require("MT.SPM/0.1.0/src/components/wechat-debug").create();
    wechat.init();

};
});
define("MT.SPM/0.1.0/src/components/update-browser-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/16.
 */


var updateBrowser = {

    create: function (options, test) {
        
        var _protected = {};

        var obj = {};

        obj.options = options || {};

        obj.options.versionRequied = {i: 10, f: 23, o: 12, s: 6.2, n: 12, c: 28};
        obj.options.versionDefault = {i: 9, f: 23, o: 12, s: 6.2, n: 12, c: 28};
        obj.options.versionMinimal = {i: 9, f: 23, o: 12, s: 6.2, n: 12, c: 28};

        obj.options.version = options.version || obj.options.versionDefault;

        // Options

        var _navigator = window.navigator, _browser;

        _protected.init = function () {

            // Loop
            for (_browser in obj.options.versionRequied) {
                if (obj.options.version[_browser] >= obj.options.versionRequied[_browser])
                    obj.options.version[_browser] = obj.options.version[_browser] - 0.2;
                if (!obj.options.version[_browser])
                    obj.options.version[_browser] = obj.options.versionDefault[_browser];
                if (obj.options.version[_browser] < obj.options.versionMinimal[_browser])
                    obj.options.version[_browser] = obj.options.versionMinimal[_browser];
            }

            obj.options.test = test || options.test || false;

            if (window.location.hash == "#test-bu") {
                obj.options.test = true;
            }

        };

        _protected.getBrowser = function () {

            var n, v, t, ua = navigator.userAgent;
            var names = {
                i: 'Internet Explorer',
                f: 'Firefox',
                o: 'Opera',
                s: 'Apple Safari',
                n: 'Netscape Navigator',
                c: "Chrome",
                x: "Other"
            };
            if (/bot|googlebot|facebook|slurp|wii|silk|blackberry|mediapartners|adsbot|silk|android|phone|bingbot|google web preview|like firefox|chromeframe|seamonkey|opera mini|min|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|rekonq|symbian|webos/i.test(ua)) n = "x";
            else if (/Trident.*rv:(\d+\.\d+)/i.test(ua)) n = "i";
            else if (/Trident.(\d+\.\d+)/i.test(ua)) n = "io";
            else if (/MSIE.(\d+\.\d+)/i.test(ua)) n = "i";
            else if (/OPR.(\d+\.\d+)/i.test(ua)) n = "o";
            else if (/Chrome.(\d+\.\d+)/i.test(ua)) n = "c";
            else if (/Firefox.(\d+\.\d+)/i.test(ua)) n = "f";
            else if (/Version.(\d+.\d+).{0,10}Safari/i.test(ua))    n = "s";
            else if (/Safari.(\d+)/i.test(ua)) n = "so";
            else if (/Opera.*Version.(\d+\.\d+)/i.test(ua)) n = "o";
            else if (/Opera.(\d+\.?\d+)/i.test(ua)) n = "o";
            else if (/Netscape.(\d+)/i.test(ua)) n = "n";
            else return {n: "x", v: 0, t: names[n]};

            //do not notify ver old systems since their is no up-to-date browser available
            if (/windows.nt.5.0|windows.nt.4.0|windows.98|os x 10.4|os x 10.5|os x 10.3|os x 10.2/.test(ua)) n = "x";

            //do not notify firefox ESR
            if (n == "f" && v == 24)
                n = "x";
            //do not notify opera 12 on linux since it is the latest version
            if (/linux|x11|unix|bsd/.test(ua) && n == "o" && v > 12)
                n = "x";

            if (n == "x") return {n: "x", v: 0, t: names[n]};

            v = new Number(RegExp.$1);
            if (n == "so") {
                v = ((v < 100) && 1.0) || ((v < 130) && 1.2) || ((v < 320) && 1.3) || ((v < 520) && 2.0) || ((v < 524) && 3.0) || ((v < 526) && 3.2) || 4.0;
                n = "s";
            }
            if (n == "i" && v == 7 && window.XDomainRequest) {
                v = 8;
            }
            if (n == "io") {
                n = "i";
                if (v > 6) v = 11;
                else if (v > 5) v = 10;
                else if (v > 4) v = 9;
                else if (v > 3.1) v = 8;
                else if (v > 3) v = 7;
                else v = 9;
            }
            return {n: n, v: v, t: names[n] + " " + v};
        };

        _protected.generateInfo = function () {

            // Div

            var _PixRatio = (window.devicePixelRatio > 1)?2:1;

            var div = document.createElement("div");
            obj.options.div = div;

            div.id = "update-browser";
            div.className = "update-browser";

            var _rawHTML = '\
                    <div class="update-browser-box">\
                        <div class="update-browser-icon"><img src="/public/images/icons/'+_PixRatio+'x/icon-update-browser.png'+'" alt=""></div>\
                        <div class="update-browser-info"><p>马上升级您的浏览器，获得更流畅的访问体验</p></div>\
                        <div class="update-browser-action"><a href="/labs/update-browser">免费更新</a></div>\
                    </div>\
                    <div class="update-browser-close"><a id="update-browser-button-close" href="#">残忍拒绝</a></div></div>';

            div.innerHTML = options.div || _rawHTML;

            // Style
            var sheet = document.createElement("style");

            var _rawCSS =  '.update-browser {position: fixed;top: 0;left: 0;padding: 14px 0;width: 100%;display: table;background: #f4f4f4;box-shadow: 0 0 4px #000000;z-index: 9999;}\
.update-browser-box{margin: 0 auto;width: 600px;}\
.update-browser-box:before{content: \' \';display: table;}\
.update-browser-box:after{content: \' \';clear: both;display: table;}\
.update-browser-icon,.update-browser-info,.update-browser-action {display: inline-block;float: left;}\
.update-browser-icon img{width: 28px;vertical-align: middle;}\
.update-browser-info p{margin: 10px;display: block;font-size: 16px;color: #505050;}\
.update-browser-action a{padding: 10px 0;display: block;font-size: 16px;color: #2732c9;}\
.update-browser-close{position: absolute;top: 14px;right: 23px;}\
.update-browser-close a{display: block;text-decoration: none;font-size: 12px;color: #858689;}';

            var style = options.style || _rawCSS;

            // Insert
            document.body.insertBefore(div, document.body.firstChild);
            document.getElementsByTagName("head")[0].appendChild(sheet);

            // Append
            try {
                sheet.innerText = style;
                sheet.innerHTML = style;
            }
            catch (e) {
                try {
                    sheet.styleSheet.cssText = style;
                }
                catch (e) {
                    return;
                }
            }

            document.getElementById('update-browser-button-close').onclick = function (e) {
                e.preventDefault();

                obj.options.div.style.display = "none";

            }
        };

        _protected.appendInfo = function () {

            // GetBrowser
            obj.options.browser = _protected.getBrowser();

            // Detect
            if (!obj.options.test && (!obj.options.browser || !obj.options.browser.n || obj.options.browser.n == "x" || obj.options.browser.v > obj.options.version[obj.options.browser.n])){
                return;
            }

            _protected.generateInfo();
            
        };


        obj.init = function () {
            _protected.init();

            _protected.appendInfo();
        };

        return obj;

    }
};

exports.create = updateBrowser.create;

});
define("MT.SPM/0.1.0/src/components/toggle-nav-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/18.
 */


var toggleNav = {
    create: function ($toggle, $container) {

        var obj = {};

        var active = false;

        obj.init = function () {

            $toggle.click(function (e) {


                if(active){
                    $container.fadeOut();
                }else{
                    $container.fadeIn();
                }

                active = !active;

                return false;
            });
        };

        return obj;
    }
};

exports.create = toggleNav.create;


});
define("MT.SPM/0.1.0/src/components/wechat-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/7/4.
 */

var wx = require("MT.SPM/0.1.0/src/utils/jweixin-1.0.0-debug");

var Wechat = {

    create : function(bundleInterface, bundleProtected){

        var obj = {};

        var _interface = bundleInterface || {};
        var _protected = bundleProtected || {};

        _protected.init = function(options){

            var _options = options || {} ;

            try {

                wx.config({
                    debug: false,
                    appId: _options.appId,
                    timestamp: _options.timestamp,
                    nonceStr: _options.nonceStr,
                    signature: _options.signature ,
                    jsApiList: ['checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'getNetworkType',
                        'openLocation',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'openProductSpecificView',
                        'addCard',
                        'chooseCard',
                        'openCard']
                });

                wx.ready(function(){

                    var $img = '<div style="display: none;"><img src="https://www.thonatos.com/public/images/other/kira.png">';
                    $('body').prepend($img);

                });


                wx.error(function (res) {
                    alert(res.errMsg);
                });


            } catch (err) {
                console.error(err);
            }



        };


        _protected.getSignature = function(token){

            var _url = window.location.href.split('#')[0];

            $.get('/api/wechat/signature/gen?access_token='+token+'&url='+ _url ,function(data) {

                if(data && data.code === 200){

                    _protected.init(data.data);

                }else{
                    console.log('getSignature err, we will try again in 10 seconds.');

                    setTimeout(_protected.getSignature(token),10000);
                }
            });
        };

        _protected.getToken = function(){

            $.get('/api/wechat/token/get',function(data) {

                if(data && data.code === 200){

                    _protected.getSignature(data.data.access_token);

                }else{

                    console.log('getToken err, we will try again in 10 seconds.');

                    setTimeout(_protected.getToken,10000);
                }
            });

        };
        
        obj.init = function () {
            _protected.getToken();
        };

        return obj;
    }
};

exports.create = Wechat.create;
});
define("MT.SPM/0.1.0/src/utils/jweixin-1.0.0-debug", [], function(require, exports, module){
! function(a, b) {
    "function" == typeof define && (define.amd || define.cmd) ? module.exports=b(a) : b(a, !0)
}(this, function(a, b) {
    function c(b, c, d) {
        a.WeixinJSBridge ? WeixinJSBridge.invoke(b, e(c), function(a) {
            g(b, a, d)
        }) : j(b, d)
    }

    function d(b, c, d) {
        a.WeixinJSBridge ? WeixinJSBridge.on(b, function(a) {
            d && d.trigger && d.trigger(a), g(b, a, c)
        }) : d ? j(b, d) : j(b, c)
    }

    function e(a) {
        return a = a || {}, a.appId = z.appId, a.verifyAppId = z.appId, a.verifySignType = "sha1", a.verifyTimestamp = z.timestamp + "", a.verifyNonceStr = z.nonceStr, a.verifySignature = z.signature, a
    }

    function f(a) {
        return {
            timeStamp: a.timestamp + "",
            nonceStr: a.nonceStr,
            "package": a.package,
            paySign: a.paySign,
            signType: a.signType || "SHA1"
        }
    }

    function g(a, b, c) {
        var d, e, f;
        switch (delete b.err_code, delete b.err_desc, delete b.err_detail, d = b.errMsg, d || (d = b.err_msg, delete b.err_msg, d = h(a, d, c), b.errMsg = d), c = c || {}, c._complete && (c._complete(b), delete c._complete), d = b.errMsg || "", z.debug && !c.isInnerInvoke && alert(JSON.stringify(b)), e = d.indexOf(":"), f = d.substring(e + 1)) {
            case "ok":
                c.success && c.success(b);
                break;
            case "cancel":
                c.cancel && c.cancel(b);
                break;
            default:
                c.fail && c.fail(b)
        }
        c.complete && c.complete(b)
    }

    function h(a, b) {
        var d, e, f, g;
        if (b) {
            switch (d = b.indexOf(":"), a) {
                case o.config:
                    e = "config";
                    break;
                case o.openProductSpecificView:
                    e = "openProductSpecificView";
                    break;
                default:
                    e = b.substring(0, d), e = e.replace(/_/g, " "), e = e.replace(/\b\w+\b/g, function(a) {
                        return a.substring(0, 1).toUpperCase() + a.substring(1)
                    }), e = e.substring(0, 1).toLowerCase() + e.substring(1), e = e.replace(/ /g, ""), -1 != e.indexOf("Wcpay") && (e = e.replace("Wcpay", "WCPay")), f = p[e], f && (e = f)
            }
            g = b.substring(d + 1), "confirm" == g && (g = "ok"), "failed" == g && (g = "fail"), -1 != g.indexOf("failed_") && (g = g.substring(7)), -1 != g.indexOf("fail_") && (g = g.substring(5)), g = g.replace(/_/g, " "), g = g.toLowerCase(), ("access denied" == g || "no permission to execute" == g) && (g = "permission denied"), "config" == e && "function not exist" == g && (g = "ok"), b = e + ":" + g
        }
        return b
    }

    function i(a) {
        var b, c, d, e;
        if (a) {
            for (b = 0, c = a.length; c > b; ++b) d = a[b], e = o[d], e && (a[b] = e);
            return a
        }
    }

    function j(a, b) {
        if (!(!z.debug || b && b.isInnerInvoke)) {
            var c = p[a];
            c && (a = c), b && b._complete && delete b._complete, console.log('"' + a + '",', b || "")
        }
    }

    function k() {
        if (!("6.0.2" > w || y.systemType < 0)) {
            var b = new Image;
            y.appId = z.appId, y.initTime = x.initEndTime - x.initStartTime, y.preVerifyTime = x.preVerifyEndTime - x.preVerifyStartTime, C.getNetworkType({
                isInnerInvoke: !0,
                success: function(a) {
                    y.networkType = a.networkType;
                    var c = "https://open.weixin.qq.com/sdk/report?v=" + y.version + "&o=" + y.isPreVerifyOk + "&s=" + y.systemType + "&c=" + y.clientVersion + "&a=" + y.appId + "&n=" + y.networkType + "&i=" + y.initTime + "&p=" + y.preVerifyTime + "&u=" + y.url;
                    b.src = c
                }
            })
        }
    }

    function l() {
        return (new Date).getTime()
    }

    function m(b) {
        t && (a.WeixinJSBridge ? b() : q.addEventListener && q.addEventListener("WeixinJSBridgeReady", b, !1))
    }

    function n() {
        C.invoke || (C.invoke = function(b, c, d) {
            a.WeixinJSBridge && WeixinJSBridge.invoke(b, e(c), d)
        }, C.on = function(b, c) {
            a.WeixinJSBridge && WeixinJSBridge.on(b, c)
        })
    }
    var o, p, q, r, s, t, u, v, w, x, y, z, A, B, C;
    if (!a.jWeixin) return o = {
        config: "preVerifyJSAPI",
        onMenuShareTimeline: "menu:share:timeline",
        onMenuShareAppMessage: "menu:share:appmessage",
        onMenuShareQQ: "menu:share:qq",
        onMenuShareWeibo: "menu:share:weiboApp",
        onMenuShareQZone: "menu:share:QZone",
        previewImage: "imagePreview",
        getLocation: "geoLocation",
        openProductSpecificView: "openProductViewWithPid",
        addCard: "batchAddCard",
        openCard: "batchViewCard",
        chooseWXPay: "getBrandWCPayRequest"
    }, p = function() {
        var b, a = {};
        for (b in o) a[o[b]] = b;
        return a
    }(), q = a.document, r = q.title, s = navigator.userAgent.toLowerCase(), t = -1 != s.indexOf("micromessenger"), u = -1 != s.indexOf("android"), v = -1 != s.indexOf("iphone") || -1 != s.indexOf("ipad"), w = function() {
        var a = s.match(/micromessenger\/(\d+\.\d+\.\d+)/) || s.match(/micromessenger\/(\d+\.\d+)/);
        return a ? a[1] : ""
    }(), x = {
        initStartTime: l(),
        initEndTime: 0,
        preVerifyStartTime: 0,
        preVerifyEndTime: 0
    }, y = {
        version: 1,
        appId: "",
        initTime: 0,
        preVerifyTime: 0,
        networkType: "",
        isPreVerifyOk: 1,
        systemType: v ? 1 : u ? 2 : -1,
        clientVersion: w,
        url: encodeURIComponent(location.href)
    }, z = {}, A = {
        _completes: []
    }, B = {
        state: 0,
        res: {}
    }, m(function() {
        x.initEndTime = l()
    }), C = {
        config: function(a) {
            z = a, j("config", a);
            var b = z.check === !1 ? !1 : !0;
            m(function() {
                var a, d, e;
                if (b) c(o.config, {
                    verifyJsApiList: i(z.jsApiList)
                }, function() {
                    A._complete = function(a) {
                        x.preVerifyEndTime = l(), B.state = 1, B.res = a
                    }, A.success = function() {
                        y.isPreVerifyOk = 0
                    }, A.fail = function(a) {
                        A._fail ? A._fail(a) : B.state = -1
                    };
                    var a = A._completes;
                    return a.push(function() {
                        z.debug || k()
                    }), A.complete = function() {
                        for (var c = 0, d = a.length; d > c; ++c) a[c]();
                        A._completes = []
                    }, A
                }()), x.preVerifyStartTime = l();
                else {
                    for (B.state = 1, a = A._completes, d = 0, e = a.length; e > d; ++d) a[d]();
                    A._completes = []
                }
            }), z.beta && n()
        },
        ready: function(a) {
            0 != B.state ? a() : (A._completes.push(a), !t && z.debug && a())
        },
        error: function(a) {
            "6.0.2" > w || (-1 == B.state ? a(B.res) : A._fail = a)
        },
        checkJsApi: function(a) {
            var b = function(a) {
                var c, d, b = a.checkResult;
                for (c in b) d = p[c], d && (b[d] = b[c], delete b[c]);
                return a
            };
            c("checkJsApi", {
                jsApiList: i(a.jsApiList)
            }, function() {
                return a._complete = function(a) {
                    if (u) {
                        var c = a.checkResult;
                        c && (a.checkResult = JSON.parse(c))
                    }
                    a = b(a)
                }, a
            }())
        },
        onMenuShareTimeline: function(a) {
            d(o.onMenuShareTimeline, {
                complete: function() {
                    c("shareTimeline", {
                        title: a.title || r,
                        desc: a.title || r,
                        img_url: a.imgUrl || "",
                        link: a.link || location.href
                    }, a)
                }
            }, a)
        },
        onMenuShareAppMessage: function(a) {
            d(o.onMenuShareAppMessage, {
                complete: function() {
                    c("sendAppMessage", {
                        title: a.title || r,
                        desc: a.desc || "",
                        link: a.link || location.href,
                        img_url: a.imgUrl || "",
                        type: a.type || "link",
                        data_url: a.dataUrl || ""
                    }, a)
                }
            }, a)
        },
        onMenuShareQQ: function(a) {
            d(o.onMenuShareQQ, {
                complete: function() {
                    c("shareQQ", {
                        title: a.title || r,
                        desc: a.desc || "",
                        img_url: a.imgUrl || "",
                        link: a.link || location.href
                    }, a)
                }
            }, a)
        },
        onMenuShareWeibo: function(a) {
            d(o.onMenuShareWeibo, {
                complete: function() {
                    c("shareWeiboApp", {
                        title: a.title || r,
                        desc: a.desc || "",
                        img_url: a.imgUrl || "",
                        link: a.link || location.href
                    }, a)
                }
            }, a)
        },
        onMenuShareQZone: function(a) {
            d(o.onMenuShareQZone, {
                complete: function() {
                    c("shareQZone", {
                        title: a.title || r,
                        desc: a.desc || "",
                        img_url: a.imgUrl || "",
                        link: a.link || location.href
                    }, a)
                }
            }, a)
        },
        startRecord: function(a) {
            c("startRecord", {}, a)
        },
        stopRecord: function(a) {
            c("stopRecord", {}, a)
        },
        onVoiceRecordEnd: function(a) {
            d("onVoiceRecordEnd", a)
        },
        playVoice: function(a) {
            c("playVoice", {
                localId: a.localId
            }, a)
        },
        pauseVoice: function(a) {
            c("pauseVoice", {
                localId: a.localId
            }, a)
        },
        stopVoice: function(a) {
            c("stopVoice", {
                localId: a.localId
            }, a)
        },
        onVoicePlayEnd: function(a) {
            d("onVoicePlayEnd", a)
        },
        uploadVoice: function(a) {
            c("uploadVoice", {
                localId: a.localId,
                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
            }, a)
        },
        downloadVoice: function(a) {
            c("downloadVoice", {
                serverId: a.serverId,
                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
            }, a)
        },
        translateVoice: function(a) {
            c("translateVoice", {
                localId: a.localId,
                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
            }, a)
        },
        chooseImage: function(a) {
            c("chooseImage", {
                scene: "1|2",
                count: a.count || 9,
                sizeType: a.sizeType || ["original", "compressed"],
                sourceType: a.sourceType || ["album", "camera"]
            }, function() {
                return a._complete = function(a) {
                    if (u) {
                        var b = a.localIds;
                        b && (a.localIds = JSON.parse(b))
                    }
                }, a
            }())
        },
        previewImage: function(a) {
            c(o.previewImage, {
                current: a.current,
                urls: a.urls
            }, a)
        },
        uploadImage: function(a) {
            c("uploadImage", {
                localId: a.localId,
                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
            }, a)
        },
        downloadImage: function(a) {
            c("downloadImage", {
                serverId: a.serverId,
                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
            }, a)
        },
        getNetworkType: function(a) {
            var b = function(a) {
                var c, d, e, b = a.errMsg;
                if (a.errMsg = "getNetworkType:ok", c = a.subtype, delete a.subtype, c) a.networkType = c;
                else switch (d = b.indexOf(":"), e = b.substring(d + 1)) {
                    case "wifi":
                    case "edge":
                    case "wwan":
                        a.networkType = e;
                        break;
                    default:
                        a.errMsg = "getNetworkType:fail"
                }
                return a
            };
            c("getNetworkType", {}, function() {
                return a._complete = function(a) {
                    a = b(a)
                }, a
            }())
        },
        openLocation: function(a) {
            c("openLocation", {
                latitude: a.latitude,
                longitude: a.longitude,
                name: a.name || "",
                address: a.address || "",
                scale: a.scale || 28,
                infoUrl: a.infoUrl || ""
            }, a)
        },
        getLocation: function(a) {
            a = a || {}, c(o.getLocation, {
                type: a.type || "wgs84"
            }, function() {
                return a._complete = function(a) {
                    delete a.type
                }, a
            }())
        },
        hideOptionMenu: function(a) {
            c("hideOptionMenu", {}, a)
        },
        showOptionMenu: function(a) {
            c("showOptionMenu", {}, a)
        },
        closeWindow: function(a) {
            a = a || {}, c("closeWindow", {
                immediate_close: a.immediateClose || 0
            }, a)
        },
        hideMenuItems: function(a) {
            c("hideMenuItems", {
                menuList: a.menuList
            }, a)
        },
        showMenuItems: function(a) {
            c("showMenuItems", {
                menuList: a.menuList
            }, a)
        },
        hideAllNonBaseMenuItem: function(a) {
            c("hideAllNonBaseMenuItem", {}, a)
        },
        showAllNonBaseMenuItem: function(a) {
            c("showAllNonBaseMenuItem", {}, a)
        },
        scanQRCode: function(a) {
            a = a || {}, c("scanQRCode", {
                needResult: a.needResult || 0,
                scanType: a.scanType || ["qrCode", "barCode"]
            }, function() {
                return a._complete = function(a) {
                    var b, c;
                    v && (b = a.resultStr, b && (c = JSON.parse(b), a.resultStr = c && c.scan_code && c.scan_code.scan_result))
                }, a
            }())
        },
        openProductSpecificView: function(a) {
            c(o.openProductSpecificView, {
                pid: a.productId,
                view_type: a.viewType || 0
            }, a)
        },
        addCard: function(a) {
            var e, f, g, h, b = a.cardList,
                d = [];
            for (e = 0, f = b.length; f > e; ++e) g = b[e], h = {
                card_id: g.cardId,
                card_ext: g.cardExt
            }, d.push(h);
            c(o.addCard, {
                card_list: d
            }, function() {
                return a._complete = function(a) {
                    var c, d, e, b = a.card_list;
                    if (b) {
                        for (b = JSON.parse(b), c = 0, d = b.length; d > c; ++c) e = b[c], e.cardId = e.card_id, e.cardExt = e.card_ext, e.isSuccess = e.is_succ ? !0 : !1, delete e.card_id, delete e.card_ext, delete e.is_succ;
                        a.cardList = b, delete a.card_list
                    }
                }, a
            }())
        },
        chooseCard: function(a) {
            c("chooseCard", {
                app_id: z.appId,
                location_id: a.shopId || "",
                sign_type: a.signType || "SHA1",
                card_id: a.cardId || "",
                card_type: a.cardType || "",
                card_sign: a.cardSign,
                time_stamp: a.timestamp + "",
                nonce_str: a.nonceStr
            }, function() {
                return a._complete = function(a) {
                    a.cardList = a.choose_card_info, delete a.choose_card_info
                }, a
            }())
        },
        openCard: function(a) {
            var e, f, g, h, b = a.cardList,
                d = [];
            for (e = 0, f = b.length; f > e; ++e) g = b[e], h = {
                card_id: g.cardId,
                code: g.code
            }, d.push(h);
            c(o.openCard, {
                card_list: d
            }, a)
        },
        chooseWXPay: function(a) {
            c(o.chooseWXPay, f(a), a)
        }
    }, b && (a.wx = a.jWeixin = C), C
});

});
define("MT.SPM/0.1.0/src/utils/timeline-debug", [], function(require, exports, module){
/**
 * smohanTimeLine
 * Author:Smohan
 * Version:3.0.1
 * url: http://www.smohan.net/lab/smohan_timeline.html
 * 使用请保留以上信息
 */

!function (a) {
    "use strict";

    function b(b, c) {
        this.version = "3.0.1";
        var d = this.config;
        return this.config = a.extend({}, d, c), "string" == typeof b && (b = a(b)), this.el = b, this.render(), this.config.resize && this.resize(), this
    }

    b.prototype.config = {
        item: ".item",
        margin: 120,
        top: 20,
        minTop: 10,
        resize: !0,
        minScreen: 640
    }, b.prototype.calculate = function () {
        var a = this,
            b = a.config,
            c = a.el;
        c.css({
            position: "relative"
        }), c.find(b.item);
        var f, e = c[0].offsetWidth;
        return f = a.isSmallScreen() ? e : Math.round((e - b.margin) / 2), {
            el: e,
            item: f
        }
    }, b.prototype.render = function () {
        var a = this,
            b = a.config,
            c = a.el,
            d = c.find(b.item),
            e = a.methods,
            f = [],
            g = a.calculate();
        d.css({
            width: g.item + "px",
            margin: 0,
            padding: 0,
            overflow: "visible"
        });
        var h = d[0].offsetHeight;
        if (a.isSmallScreen()) d.css({
            position: "static",
            marginTop: b.minTop + "px"
        }), c.find(".lines").length && c.find(".lines").hide(), d.find(".point,.corner").hide();
        else {
            d.css("position", "absolute"), c.find(".lines").length ? c.find(".lines").show() : c.append('<div class="lines"></div>'), d.find(".point").length ? d.find(".point").show() : d.append('<div class="point"></div>'), d.find(".corner").length ? d.find(".corner").show() : d.append('<div class="corner"></div>');
            for (var i = d.find(".point"), j = i[0].offsetWidth, k = 0, l = d.length; l > k; k++) {
                var m = d[k].offsetHeight;
                if (2 > k) {
                    f[k] = m;
                    var n = k * (g.item + b.margin),
                        o = 0 === n ? "isLeft" : "isRight",
                        p = 0 === n ? {
                            left: Math.round((b.margin - j) / 2 + g.item) + "px"
                        } : {
                            left: -Math.round((b.margin + j) / 2) + "px"
                        };
                    d.eq(k).css({
                        top: 0,
                        left: n + "px"
                    }).removeClass("isLeft isRight").addClass(o).find(".point").css(p)
                } else {
                    h = e.getMin(f);
                    var q = e.getKey(f, h);
                    f[q] += m + b.top;
                    var n = q * (g.item + b.margin),
                        o = 0 === n ? "isLeft" : "isRight",
                        p = 0 === n ? {
                            left: Math.round((b.margin - j) / 2 + g.item) + "px"
                        } : {
                            left: -Math.round((b.margin + j) / 2) + "px"
                        };
                    d.eq(k).css({
                        top: h + b.top + "px",
                        left: n + "px"
                    }).removeClass("isLeft isRight").addClass(o).find(".point").css(p)
                }
                var r = e.getKey(f, e.getMax(f));
                c.css({
                    height: f[r] + 60
                })
            }
            var s = c.find(".lines").width();
            c.find(".lines").css({
                left: "50%",
                "margin-left": -(s / 2) + "px"
            }).animate({
                height: "100%"
            }, {
                queue: !1,
                duration: 2e3
            })
        }
    }, b.prototype.resize = function () {
        var a = this,
            b = a.el,
            c = a.config;
        b.find(c.item), window.onresize = function () {
            return a.render()
        }
    }, b.prototype.methods = {
        getKey: function (a, b) {
            for (var c in a)
                if (a[c] === b) return c
        },
        getMin: function (a) {
            return Math.min.apply(Math, a)
        },
        getMax: function (a) {
            return Math.max.apply(Math, a)
        }
    }, b.prototype.isSmallScreen = function () {
        var b = this,
            c = b.config;
        return c.resize === !0 && c.minScreen && a(window).width() <= Math.round(c.minScreen)
    }, window.smohanTimeLine = function (a, c) {
        return new b(a, c)
    }, a.fn.smohanTimeLine = function (a) {
        return new b(this, a)
    }


    if (typeof define === "function" && define.cmd) {
        // 有 Sea.js 等 CMD 模块加载器存在

        module.exports = function (a, c) {
            return new b(a,c);
        };
    }

}(jQuery);
});
