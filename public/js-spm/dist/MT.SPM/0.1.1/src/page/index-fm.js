define("MT.SPM/0.1.1/src/page/index-fm",[],function(e,n){var i=function(){function n(e){a.find("img")[0].src=e.album.blurPicUrl,c.find(".title").html(e.album.name),t.src=e.mp3Url,t.play()}function i(){t=document.createElement("audio"),$.get("/api/fm/playlist/"+PLAYLIST,function(e){e&&200===e.code&&(console.log(e),r=e.result.tracks,n(r[s]))})}var o=e("MT.SPM/0.1.1/src/page/public");o.init(),console.log("\n\n\u8fd9\u662f\u4e2a\u7535\u53f0\u3002\n\u542c\u90a3\u4e9b\u8001\u6b4c\uff0c\u60f3\u5ff5\u4f60\u3002\n\n");var t,r,s=0,a=$(".album"),c=$(".info"),d=$(".player-next"),p=$(".player-play-pause"),u=$(".player-seekbar").get(0);u.onchange=function(){t&&""!==t.src&&(t.volume=u.value/10)},d.click(function(e){e.preventDefault(),s<r.length&&(++s,n(r[s]))}),p.click(function(e){e.preventDefault(),t&&(t.paused?t.play():t.pause())}),i(),t&&(t.addEventListener("play",function(){p.children(".fa-play").hide(),p.children(".fa-pause").show()}),t.addEventListener("pause",function(){p.children(".fa-play").show(),p.children(".fa-pause").hide()}),t.addEventListener("ended",function(){++s,n(r[s])}))};n.init=i}),define("MT.SPM/0.1.1/src/page/public",[],function(e,n){n.init=function(){var n=e("MT.SPM/0.1.1/src/components/update-browser").create("",!1);n.init();var i=e("MT.SPM/0.1.1/src/components/toggle-nav").create($(".nav-ul-toggle a"),$(".nav-ul"));i.init();var o=e("MT.SPM/0.1.1/src/components/wechat").create();o.init()}}),define("MT.SPM/0.1.1/src/components/update-browser",[],function(e,n){var i={create:function(e,n){var i={},o={};o.options=e||{},o.options.versionRequied={i:10,f:23,o:12,s:6.2,n:12,c:28},o.options.versionDefault={i:9,f:23,o:12,s:6.2,n:12,c:28},o.options.versionMinimal={i:9,f:23,o:12,s:6.2,n:12,c:28},o.options.version=e.version||o.options.versionDefault;{var t;window.navigator}return i.init=function(){for(t in o.options.versionRequied)o.options.version[t]>=o.options.versionRequied[t]&&(o.options.version[t]=o.options.version[t]-.2),o.options.version[t]||(o.options.version[t]=o.options.versionDefault[t]),o.options.version[t]<o.options.versionMinimal[t]&&(o.options.version[t]=o.options.versionMinimal[t]);o.options.test=n||e.test||!1,"#test-bu"==window.location.hash&&(o.options.test=!0)},i.getBrowser=function(){var e,n,i=navigator.userAgent,o={i:"Internet Explorer",f:"Firefox",o:"Opera",s:"Apple Safari",n:"Netscape Navigator",c:"Chrome",x:"Other"};if(/bot|googlebot|facebook|slurp|wii|silk|blackberry|mediapartners|adsbot|silk|android|phone|bingbot|google web preview|like firefox|chromeframe|seamonkey|opera mini|min|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|rekonq|symbian|webos/i.test(i))e="x";else if(/Trident.*rv:(\d+\.\d+)/i.test(i))e="i";else if(/Trident.(\d+\.\d+)/i.test(i))e="io";else if(/MSIE.(\d+\.\d+)/i.test(i))e="i";else if(/OPR.(\d+\.\d+)/i.test(i))e="o";else if(/Chrome.(\d+\.\d+)/i.test(i))e="c";else if(/Firefox.(\d+\.\d+)/i.test(i))e="f";else if(/Version.(\d+.\d+).{0,10}Safari/i.test(i))e="s";else if(/Safari.(\d+)/i.test(i))e="so";else if(/Opera.*Version.(\d+\.\d+)/i.test(i))e="o";else if(/Opera.(\d+\.?\d+)/i.test(i))e="o";else{if(!/Netscape.(\d+)/i.test(i))return{n:"x",v:0,t:o[e]};e="n"}return/windows.nt.5.0|windows.nt.4.0|windows.98|os x 10.4|os x 10.5|os x 10.3|os x 10.2/.test(i)&&(e="x"),"f"==e&&24==n&&(e="x"),/linux|x11|unix|bsd/.test(i)&&"o"==e&&n>12&&(e="x"),"x"==e?{n:"x",v:0,t:o[e]}:(n=new Number(RegExp.$1),"so"==e&&(n=100>n&&1||130>n&&1.2||320>n&&1.3||520>n&&2||524>n&&3||526>n&&3.2||4,e="s"),"i"==e&&7==n&&window.XDomainRequest&&(n=8),"io"==e&&(e="i",n=n>6?11:n>5?10:n>4?9:n>3.1?8:n>3?7:9),{n:e,v:n,t:o[e]+" "+n})},i.generateInfo=function(){var n=window.devicePixelRatio>1?2:1,i=document.createElement("div");o.options.div=i,i.id="update-browser",i.className="update-browser";var t='                    <div class="update-browser-box">                        <div class="update-browser-icon"><img src="/public/images/icons/'+n+'x/icon-update-browser.png" alt=""></div>                        <div class="update-browser-info"><p>\u9a6c\u4e0a\u5347\u7ea7\u60a8\u7684\u6d4f\u89c8\u5668\uff0c\u83b7\u5f97\u66f4\u6d41\u7545\u7684\u8bbf\u95ee\u4f53\u9a8c</p></div>                        <div class="update-browser-action"><a href="/public/html/update-browser.html">\u514d\u8d39\u66f4\u65b0</a></div>                    </div>                    <div class="update-browser-close"><a id="update-browser-button-close" href="#">\u6b8b\u5fcd\u62d2\u7edd</a></div></div>';i.innerHTML=e.div||t;var r=document.createElement("style"),s=".update-browser {position: fixed;top: 0;left: 0;padding: 14px 0;width: 100%;display: table;background: #f4f4f4;box-shadow: 0 0 4px #000000;z-index: 9999;}.update-browser-box{margin: 0 auto;width: 600px;}.update-browser-box:before{content: ' ';display: table;}.update-browser-box:after{content: ' ';clear: both;display: table;}.update-browser-icon,.update-browser-info,.update-browser-action {display: inline-block;float: left;}.update-browser-icon img{width: 28px;vertical-align: middle;}.update-browser-info p{margin: 10px;display: block;font-size: 16px;color: #505050;}.update-browser-action a{padding: 10px 0;display: block;font-size: 16px;color: #2732c9;}.update-browser-close{position: absolute;top: 14px;right: 23px;}.update-browser-close a{display: block;text-decoration: none;font-size: 12px;color: #858689;}",a=e.style||s;document.body.insertBefore(i,document.body.firstChild),document.getElementsByTagName("head")[0].appendChild(r);try{r.innerText=a,r.innerHTML=a}catch(c){try{r.styleSheet.cssText=a}catch(c){return}}document.getElementById("update-browser-button-close").onclick=function(e){e.preventDefault(),o.options.div.style.display="none"}},i.appendInfo=function(){o.options.browser=i.getBrowser(),(o.options.test||o.options.browser&&o.options.browser.n&&"x"!=o.options.browser.n&&!(o.options.browser.v>o.options.version[o.options.browser.n]))&&i.generateInfo()},o.init=function(){i.init(),i.appendInfo()},o}};n.create=i.create}),define("MT.SPM/0.1.1/src/components/toggle-nav",[],function(e,n){var i={create:function(e,n){var i={},o=!1;return i.init=function(){e.click(function(){return o?n.fadeOut():n.fadeIn(),o=!o,!1})},i}};n.create=i.create}),define("MT.SPM/0.1.1/src/components/wechat",[],function(e,n){var i=e("MT.SPM/0.1.1/src/utils/jweixin-1.0.0"),o={create:function(e,n){var o={},t=n||{};return t.init=function(e){var n=e||{};try{i.config({debug:!1,appId:n.appId,timestamp:n.timestamp,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onRecordEnd","playVoice","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]}),i.ready(function(){var e='<div style="display: none;"><img src="https://www.thonatos.com/public/images/other/kira.png">';$("body").prepend(e)}),i.error(function(e){alert(e.errMsg)})}catch(o){console.error(o)}},t.getSignature=function(e){var n=window.location.href.split("#")[0];$.get("/api/wechat/signature/gen?access_token="+e+"&url="+n,function(n){n&&200===n.code?t.init(n.data):(console.log("getSignature err, we will try again in 10 seconds."),setTimeout(t.getSignature(e),1e4))})},t.getToken=function(){$.get("/api/wechat/token/get",function(e){e&&200===e.code?t.getSignature(e.data.access_token):(console.log("getToken err, we will try again in 10 seconds."),setTimeout(t.getToken,1e4))})},o.init=function(){t.getToken()},o}};n.create=o.create}),define("MT.SPM/0.1.1/src/utils/jweixin-1.0.0",[],function(e,n,i){!function(e,n){"function"==typeof define&&(define.amd||define.cmd)?i.exports=n(e):n(e,!0)}(this,function(e,n){function i(n,i,o){e.WeixinJSBridge?WeixinJSBridge.invoke(n,t(i),function(e){s(n,e,o)}):d(n,o)}function o(n,i,o){e.WeixinJSBridge?WeixinJSBridge.on(n,function(e){o&&o.trigger&&o.trigger(e),s(n,e,i)}):o?d(n,o):d(n,i)}function t(e){return e=e||{},e.appId=I.appId,e.verifyAppId=I.appId,e.verifySignType="sha1",e.verifyTimestamp=I.timestamp+"",e.verifyNonceStr=I.nonceStr,e.verifySignature=I.signature,e}function r(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,"package":e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function s(e,n,i){var o,t,r;switch(delete n.err_code,delete n.err_desc,delete n.err_detail,o=n.errMsg,o||(o=n.err_msg,delete n.err_msg,o=a(e,o,i),n.errMsg=o),i=i||{},i._complete&&(i._complete(n),delete i._complete),o=n.errMsg||"",I.debug&&!i.isInnerInvoke&&alert(JSON.stringify(n)),t=o.indexOf(":"),r=o.substring(t+1)){case"ok":i.success&&i.success(n);break;case"cancel":i.cancel&&i.cancel(n);break;default:i.fail&&i.fail(n)}i.complete&&i.complete(n)}function a(e,n){var i,o,t,r;if(n){switch(i=n.indexOf(":"),e){case m.config:o="config";break;case m.openProductSpecificView:o="openProductSpecificView";break;default:o=n.substring(0,i),o=o.replace(/_/g," "),o=o.replace(/\b\w+\b/g,function(e){return e.substring(0,1).toUpperCase()+e.substring(1)}),o=o.substring(0,1).toLowerCase()+o.substring(1),o=o.replace(/ /g,""),-1!=o.indexOf("Wcpay")&&(o=o.replace("Wcpay","WCPay")),t=g[o],t&&(o=t)}r=n.substring(i+1),"confirm"==r&&(r="ok"),"failed"==r&&(r="fail"),-1!=r.indexOf("failed_")&&(r=r.substring(7)),-1!=r.indexOf("fail_")&&(r=r.substring(5)),r=r.replace(/_/g," "),r=r.toLowerCase(),("access denied"==r||"no permission to execute"==r)&&(r="permission denied"),"config"==o&&"function not exist"==r&&(r="ok"),n=o+":"+r}return n}function c(e){var n,i,o,t;if(e){for(n=0,i=e.length;i>n;++n)o=e[n],t=m[o],t&&(e[n]=t);return e}}function d(e,n){if(!(!I.debug||n&&n.isInnerInvoke)){var i=g[e];i&&(e=i),n&&n._complete&&delete n._complete,console.log('"'+e+'",',n||"")}}function p(){if(!("6.0.2">T||x.systemType<0)){var e=new Image;x.appId=I.appId,x.initTime=k.initEndTime-k.initStartTime,x.preVerifyTime=k.preVerifyEndTime-k.preVerifyStartTime,V.getNetworkType({isInnerInvoke:!0,success:function(n){x.networkType=n.networkType;var i="https://open.weixin.qq.com/sdk/report?v="+x.version+"&o="+x.isPreVerifyOk+"&s="+x.systemType+"&c="+x.clientVersion+"&a="+x.appId+"&n="+x.networkType+"&i="+x.initTime+"&p="+x.preVerifyTime+"&u="+x.url;e.src=i}})}}function u(){return(new Date).getTime()}function l(n){y&&(e.WeixinJSBridge?n():h.addEventListener&&h.addEventListener("WeixinJSBridgeReady",n,!1))}function f(){V.invoke||(V.invoke=function(n,i,o){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,t(i),o)},V.on=function(n,i){e.WeixinJSBridge&&WeixinJSBridge.on(n,i)})}var m,g,h,w,v,y,b,S,T,k,x,I,M,_,V;return e.jWeixin?void 0:(m={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest"},g=function(){var e,n={};for(e in m)n[m[e]]=e;return n}(),h=e.document,w=h.title,v=navigator.userAgent.toLowerCase(),y=-1!=v.indexOf("micromessenger"),b=-1!=v.indexOf("android"),S=-1!=v.indexOf("iphone")||-1!=v.indexOf("ipad"),T=function(){var e=v.match(/micromessenger\/(\d+\.\d+\.\d+)/)||v.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),k={initStartTime:u(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},x={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:S?1:b?2:-1,clientVersion:T,url:encodeURIComponent(location.href)},I={},M={_completes:[]},_={state:0,res:{}},l(function(){k.initEndTime=u()}),V={config:function(e){I=e,d("config",e);var n=I.check===!1?!1:!0;l(function(){var e,o,t;if(n)i(m.config,{verifyJsApiList:c(I.jsApiList)},function(){M._complete=function(e){k.preVerifyEndTime=u(),_.state=1,_.res=e},M.success=function(){x.isPreVerifyOk=0},M.fail=function(e){M._fail?M._fail(e):_.state=-1};var e=M._completes;return e.push(function(){I.debug||p()}),M.complete=function(){for(var n=0,i=e.length;i>n;++n)e[n]();M._completes=[]},M}()),k.preVerifyStartTime=u();else{for(_.state=1,e=M._completes,o=0,t=e.length;t>o;++o)e[o]();M._completes=[]}}),I.beta&&f()},ready:function(e){0!=_.state?e():(M._completes.push(e),!y&&I.debug&&e())},error:function(e){"6.0.2">T||(-1==_.state?e(_.res):M._fail=e)},checkJsApi:function(e){var n=function(e){var n,i,o=e.checkResult;for(n in o)i=g[n],i&&(o[i]=o[n],delete o[n]);return e};i("checkJsApi",{jsApiList:c(e.jsApiList)},function(){return e._complete=function(e){if(b){var i=e.checkResult;i&&(e.checkResult=JSON.parse(i))}e=n(e)},e}())},onMenuShareTimeline:function(e){o(m.onMenuShareTimeline,{complete:function(){i("shareTimeline",{title:e.title||w,desc:e.title||w,img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareAppMessage:function(e){o(m.onMenuShareAppMessage,{complete:function(){i("sendAppMessage",{title:e.title||w,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){o(m.onMenuShareQQ,{complete:function(){i("shareQQ",{title:e.title||w,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){o(m.onMenuShareWeibo,{complete:function(){i("shareWeiboApp",{title:e.title||w,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){o(m.onMenuShareQZone,{complete:function(){i("shareQZone",{title:e.title||w,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){i("startRecord",{},e)},stopRecord:function(e){i("stopRecord",{},e)},onVoiceRecordEnd:function(e){o("onVoiceRecordEnd",e)},playVoice:function(e){i("playVoice",{localId:e.localId},e)},pauseVoice:function(e){i("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){i("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){o("onVoicePlayEnd",e)},uploadVoice:function(e){i("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){i("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){i("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){i("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(b){var n=e.localIds;n&&(e.localIds=JSON.parse(n))}},e}())},previewImage:function(e){i(m.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){i("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){i("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getNetworkType:function(e){var n=function(e){var n,i,o,t=e.errMsg;if(e.errMsg="getNetworkType:ok",n=e.subtype,delete e.subtype,n)e.networkType=n;else switch(i=t.indexOf(":"),o=t.substring(i+1)){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}return e};i("getNetworkType",{},function(){return e._complete=function(e){e=n(e)},e}())},openLocation:function(e){i("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)},getLocation:function(e){e=e||{},i(m.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())},hideOptionMenu:function(e){i("hideOptionMenu",{},e)},showOptionMenu:function(e){i("showOptionMenu",{},e)},closeWindow:function(e){e=e||{},i("closeWindow",{immediate_close:e.immediateClose||0},e)},hideMenuItems:function(e){i("hideMenuItems",{menuList:e.menuList},e)},showMenuItems:function(e){i("showMenuItems",{menuList:e.menuList},e)},hideAllNonBaseMenuItem:function(e){i("hideAllNonBaseMenuItem",{},e)},showAllNonBaseMenuItem:function(e){i("showAllNonBaseMenuItem",{},e)},scanQRCode:function(e){e=e||{},i("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){var n,i;S&&(n=e.resultStr,n&&(i=JSON.parse(n),e.resultStr=i&&i.scan_code&&i.scan_code.scan_result))},e}())},openProductSpecificView:function(e){i(m.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0},e)},addCard:function(e){var n,o,t,r,s=e.cardList,a=[];for(n=0,o=s.length;o>n;++n)t=s[n],r={card_id:t.cardId,card_ext:t.cardExt},a.push(r);i(m.addCard,{card_list:a},function(){return e._complete=function(e){var n,i,o,t=e.card_list;if(t){for(t=JSON.parse(t),n=0,i=t.length;i>n;++n)o=t[n],o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=o.is_succ?!0:!1,delete o.card_id,delete o.card_ext,delete o.is_succ;e.cardList=t,delete e.card_list}},e}())},chooseCard:function(e){i("chooseCard",{app_id:I.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())},openCard:function(e){var n,o,t,r,s=e.cardList,a=[];for(n=0,o=s.length;o>n;++n)t=s[n],r={card_id:t.cardId,code:t.code},a.push(r);i(m.openCard,{card_list:a},e)},chooseWXPay:function(e){i(m.chooseWXPay,r(e),e)}},n&&(e.wx=e.jWeixin=V),V)})});