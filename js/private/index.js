window.onload = function() {
	var vm = new Vue({
		el: '#index',
		data: {
			projectUrl: "/project/get",
			categoryUrl: "/category/get",
			list: [{
					"title": "华为P50",
					"linkUrl": "second.html"
				},{
					"title": "华为P501",
					"linkUrl": "dataShow.html"
				},{
					"title": "华为P50",
					"linkUrl": "second.html"
				},{
					"title": "P501",
					"linkUrl": "index.html"
				},{
					"title": "华为P50",
					"linkUrl": "second.html"
				},{
					"title": "华为P50",
					"linkUrl": "second.html"
				},{
					"title": "华为P50",
					"linkUrl": "second.html"
				},{
					"title": "华为P50",
					"linkUrl": "second.html"
				},]
		},

		created: function() {

		},
		mounted: function() {
			this.FnProject()
			this.FnCategory()
		},
		methods: {
			/* 修改密码 */
			FnAmend() {

			},
			/* 配置 */
			FnDeploy() {

			},
			/* 退出 */
			FnLogOut() {
				var logOutUrl = domainUrl + this.logOutUrl
				// getMessage(logOutUrl).then(function(){
				// 	if(res.code == 0){
				// 	  location.href = "./login.html"
				// 	}else{
				// 		alert(res.message)
				// 	}
				// })
			},
			FnProject: function() {
				var that = this
				var projectUrl = domainUrl + this.projectUrl
				// getMessage(projectUrl).then(function(){
				// 	if(res.code == 0){
				// 	  that.FnCategory()
				// 	}else{
				// 		alert(res.message)
				// 	}
				// })
			},
			FnCategory: function() {
				var categoryUrl = domainUrl + this.categoryUrl
				// getMessage(categoryUrl).then(function(){
				// 	if(res.code == 0){
				// 	  this.list = res.data
				// 	}else{
				// 		alert(res.message)
				// 	}
				// })
				var showcase = $("#showcase")
				var showcase1 = $("#showcase1")

				showcase.Cloud9Carousel({
					yPos: 40,
					yRadius: 80,
					autoPlay: 1,
					mirrorOptions: {
						gap: 10,
						height: 0.2
					},
					itemClass: "img_con",
					buttonLeft: $("#left"),
					buttonRight: $("#right"),
					bringToFront: true,
					onLoaded: function() {
						showcase.css('visibility', 'visible')
						showcase.css('display', 'none')
						setTimeout(function(){
							showcase.css('display', 'block')
						},500)
					}
				})
				showcase1.Cloud9Carousel({
					yPos: 40,
					yRadius: 100,
					autoPlay: 1,
					mirrorOptions: {
						gap: 10,
						height: 0.2
					},
					itemClass: "trans",
					buttonLeft: $("#left"),
					buttonRight: $("#right"),
					bringToFront: true,
					onLoaded: function() {
						showcase1.css('visibility', 'visible')
						showcase1.css('display', 'none')
						setTimeout(function(){
							showcase1.css('display', 'block')
						},500)
					}
				})

			},
			FnHref:function(item){
				location.href = item.linkUrl
			},
			FnTabClick:function(e){
				var b = $(e.target).addClass('down')
				setTimeout(function() {
					b.removeClass('down')
				}, 80)
			}

		}
	})
}
