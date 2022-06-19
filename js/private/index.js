window.onload = function () {
	var vm = new Vue({
		el: '#index',
		data: {
			projectUrl: "/project/get",
			categoryUrl: "/category/get",
			logOutUrl: "/index/loginOut",
			list: []
		},

		created: function () {

		},
		mounted: function () {
			this.FnProject()
			//this.FnCategory()
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
				getMessage(logOutUrl).then(function(res){
					if(res.code == 200){
					  location.href = "./login.html"
					}else{
						alert(res.message)
					}
				})
			},
			FnProject: function () {
				var that = this;
				var projectUrl = domainUrl + this.projectUrl
				getMessage(projectUrl).then(function (res) {
					if (res.code == 200) {
						if (res.data != null) {

							$('title').text(res.data.name);
							$('.tit_text').text(res.data.name);
							$('.textbjt').text(res.data.name);

							that.FnCategory(res.data.id);
						}

					} else {
						alert(res.message)
					}
				})
			},
			FnCategory: function (projectId) {
				var that = this;
				var categoryUrl = domainUrl + this.categoryUrl + "?projectId=" + projectId;
				getMessage(categoryUrl).then(function (res) {
					if (res.code == 200) {
						that.list = res.data;
					} else {
						alert(res.message)
					}
				})
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
					onLoaded: function () {
						showcase.css('visibility', 'visible')
						showcase.css('display', 'none')
						setTimeout(function () {
							showcase.css('display', 'block')
						}, 500)
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
					onLoaded: function () {
						showcase1.css('visibility', 'visible')
						showcase1.css('display', 'none')
						setTimeout(function () {
							showcase1.css('display', 'block')
						}, 500)
					}
				})

			},
			FnHref: function (item) {
				location.href = "/second.html?cid="+item.id;
			},
			FnTabClick: function (e) {
				var b = $(e.target).addClass('down')
				setTimeout(function () {
					b.removeClass('down')
				}, 80)
			}

		}
	})
}
