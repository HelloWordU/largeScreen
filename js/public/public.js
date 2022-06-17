function postMessage(url, data,contentType) {
	var contentType = contentType ? contentType : "application/json"
	return $.ajax({
		url: url,
		type: "POST",
		datType: "JSON",
		cache: false,
		contentType: contentType,
		beforeSend: function(request) {
            request.setRequestHeader("accessToken",getCookie("accessToken"));
         },
		data: JSON.stringify(data)
	})
}

function getMessage(url) {
	return $.ajax({
		url: url,
		type: "GET",
		cache: false,
		beforeSend: function(request) {
            request.setRequestHeader("accessToken",getCookie("accessToken"));
         },
		datType: "JSON"
	})
}

//适配
var windowWidth = $(window).width();
var windowHeight = $(window).height();

function elementFit(ele, isScale) {
	var _s = windowWidth / 1920;
	_s = Math.max(_s, windowHeight / 1080);
	if(_s>1){
		_s = 1
	}
	if (screen.width != window.innerWidth || screen.height != window.innerHeight) {
		if (isScale) {
			$(ele).css({
				"transform": 'scale(' + _s + ')'
			});
		} else {
			$(ele).css("zoom", _s);
		}
		$('.pub_class .title').addClass("title_add")
		$('.pub_class .tit_text').addClass("tit_textadd")
		$('.pub_class .content').addClass("content_top")
		$('.pub_class .pic_div').addClass("pic_divbot")
		$('.pub_class .traffic_pub').addClass("traffic_pubt")
	} else {
		$('.pub_class .title').removeClass("title_add")
		$('.pub_class .tit_text').removeClass("tit_textadd")
		$('.pub_class .content').removeClass("content_top")
		$('.pub_class .pic_div').removeClass("pic_divbot")
		$('.pub_class .traffic_pub').removeClass("traffic_pubt")
	}
}
$(window).on('resize', function() {
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	onResize();
});

function onResize() {
	elementFit('.login', true);
	elementFit('.index', true);
	elementFit('.second', true);
	elementFit('.negative', true);
	elementFit('.datashow', true);
	elementFit('.remark', true);
}
onResize();


var domainUrl = "http://182.61.26.201:9101"; /* 域名修改*/
//var domainUrl = "http://127.0.0.1:9101"; 

function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

function getQuery(key) {
	var query = window.location.search.substring(1);
	var map = query.split("&");
	for (var i = 0; i < map.length; i++) {
	  var pair = map[i].split("=");
	  if (pair[0] == key) {
		return pair[1];
	  }
	}
  }