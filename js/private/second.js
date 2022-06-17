window.onload = function () {
	var vm = new Vue({
		el: '#second',
		data: {
			userName: "负责人",
			picList: [
				// {
				// 	title: "核心数据大屏",
				// 	label: "修改标题",
				// 	editFlag: "false",
				// 	icon: "img/second/edit.png",
				// 	src: "img/second/screen1.jpg",
				// 	linkUrl: "",
				// 	id: 1
				// }, {
				// 	title: "全网舆情数据大屏",
				// 	label: "修改标题",
				// 	editFlag: "false",
				// 	linkUrl: "",
				// 	icon: "img/second/edit.png",
				// 	src: "img/second/screen2.jpg",
				// 	id: 2
				// },
				// {
				// 	title: "整个分发数据大屏",
				// 	label: "修改标题",
				// 	editFlag: "false",
				// 	linkUrl: "",
				// 	icon: "img/second/edit.png",
				// 	src: "img/second/screen3.jpg",
				// 	id: 2
				// }
			],
			logOutUrl: "/index/loginOut",
			/* 退出接口路径 */
			listUrl: "/categoryScreenConfig/get?categoryId=",
			/* 列表接口路径 */
			useUrl: "/user/getCurrentUser",
			/* 获取当前用户接口路径 */
			saveUrl: "/categoryScreenConfig/save",
			/* 保存大屏配置路径 */
			queryCategoryUrl: "/category/get",
		},

		created: function () {

		},
		mounted: function () {
			this.FnList()
			this.FnUser()
		},
		methods: {
			/* 退出 */
			FnLogOut: function () {
				var logOutUrl = domainUrl + this.logOutUrl
				getMessage(logOutUrl).then(function (res) {
					if (res.code == 200) {
						location.href = "./login.html"
					} else {
						alert(res.message)
					}
				})
			},
			/* 修改标题保存接口 */
			FnFlag: function (val) {
				var that = this
				var saveUrl = domainUrl + this.saveUrl
				if (val.editFlag) {
					val.label = "确定"
					val.icon = "img/second/finsh.png"
				} else {
					val.label = "修改标题"
					val.icon = "img/second/edit.png"
				}
				val.editFlag = !val.editFlag
				if (val.label == "确定") {
					postMessage(saveUrl, {
						id: val.id,
						categoryId: val.categoryId,
						name: val.title,
						type: val.type

					}, "application/json").then(function (res) {
						if (res.code == 200) {
							that.FnList()
						} else {
							alert(res.message)
						}
					})
				}
			},
			/* 获取列表 */
			FnList: function () {
				var that = this
				var listUrl = domainUrl + this.listUrl + getQuery("id");
				getMessage(listUrl).then(function (res) {
					if (res.code == 200) {
						that.picList = [];
						res.data.forEach(item => {
							var linkUrlData = "/datashow.html";//核心数据daping 
							if (item.type == 2) {
								linkUrlData = "/negative.html";//全网舆情数据大屏
							} else if (item.type == 3) {
								linkUrlData = "/remark.html";//整个分发数据大屏
							}
							that.picList.push({
								title: item.name,
								label: "修改标题",
								editFlag: "false",
								linkUrl: linkUrlData,
								icon: "img/second/edit.png",
								src: "img/second/screen" + item.type + ".jpg",
								id: item.id,
								type: item.type,
								categoryId: item.categoryId
							});
						});
					} else {
						alert(res.message)
					}
				})
			},
			FnLink: function (link) {
				location.href = link
			},
			/* 获取当前用户 */
			FnUser: function () {
				var that = this
				var useUrl = domainUrl + this.useUrl
				getMessage(useUrl).then(function (res) {
					if (res.code == 200) {
						that.userName = res.data
					} else {
						alert(res.message)
					}
				})
			}
		}

	})

}
