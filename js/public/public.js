function postMessage(url, data,contentType) {
	var contentType = contentType ? contentType : "application/json"
	return $.ajax({
		url: url,
		type: "POST",
		datType: "JSON",
		cache: false,
		contentType: contentType,
		data: JSON.stringify(data)
	})
}

function getMessage(url) {
	return $.ajax({
		url: url,
		type: "GET",
		cache: false,
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


var domainUrl = "http://182.61.26.201:9101/" /* 域名修改*/