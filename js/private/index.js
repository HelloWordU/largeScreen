window.onload = function() {
	var vm = new Vue({
		el: '#index',
		data: {
			projectUrl: "/project/get",
			categoryUrl: "/category/get",
			logOutUrl: "/index/loginOut",
			list: []
		},

		created: function() {

		},
		mounted: function() {
			this.FnProject()
			//this.FnCategory()
		},
		methods: {
			/* 修改密码 */
			FnAmend() {
				location.href = "./pwModify.html"
			},
			/* 配置 */
			FnDeploy() {

			},
			/* 退出 */
			FnLogOut() {
				var logOutUrl = domainUrl + this.logOutUrl
				getMessage(logOutUrl).then(function(res) {
					if (res.code == 200) {
						location.href = "./login.html"
					} else {
						alert(res.message)
					}
				})
			},
			FnProject: function() {
				var that = this;
				var projectUrl = domainUrl + this.projectUrl
				getMessage(projectUrl).then(function(res) {
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
			FnCategory: function(projectId) {
				var that = this;
				var categoryUrl = domainUrl + this.categoryUrl + "?projectId=" + projectId;
				getMessage(categoryUrl).then(function(res) {
					if (res.code == 200) {
						that.list = res.data;
						that.$nextTick(function() {
							if (that.list && that.list.length && that.list.length > 1) {
								var xRadius = 480
                console.log(that.list.length)
                if(that.list.length == 3 || that.list.length == 6 || that.list.length >= 9){
                  xRadius = 850
                }
                that.FnTransRote(1)
							} else {
								that.FnTransRote(0)
							}
						})
					} else {
						alert(res.message)
					}
				})
			},
			FnTransRote: function(autoplay) {
        var xRadius = null
        if(this.list.length == 3){
          xRadius = 700
        }
        if(this.list.length == 6 || this.list.length == 9 || this.list.length == 5){
          xRadius = 760
        }
        if(this.list.length == 4 || this.list.length == 8){
          xRadius = 840
        }
        if(this.list.length == 10){
           xRadius = 920
        }
        if( this.list.length == 7){
           xRadius = 880
        }
				var showcase = $("#showcase")
				var showcase1 = $("#showcase1")
        showcase.css('visibility', 'hidden')
        showcase1.css('visibility', 'hidden')
				showcase.Cloud9Carousel({
					yPos: 40,
					yRadius: 100,
          xRadius:xRadius,
					autoPlay: autoplay,
          autoPlayDelay: 4000,
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
					}
				})
				showcase1.Cloud9Carousel({
					yPos: 40,
					yRadius: 100,
          xRadius:xRadius,
					autoPlay: autoplay,
          autoPlayDelay: 4000,
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
					}
				})
			},
			FnHref: function(item) {
				location.href = "./second.html?cid=" + item.id;
			},
			FnTabClick: function(e) {
				var b = $(e.target).addClass('down')
				setTimeout(function() {
					b.removeClass('down')
				}, 80)
			}

		}
	})
}
