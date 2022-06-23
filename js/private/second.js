window.onload = function () {
	var vm = new Vue({
		el: '#second',
		data: {
			userName: "负责人",
			picList: [],
			logOutUrl: "/index/loginOut",
			/* 退出接口路径 */
			listUrl: "/categoryScreenConfig/get?categoryId=",
			/* 列表接口路径 */
			useUrl: "/user/getCurrentUser",
			/* 获取当前用户接口路径 */
			saveUrl: "/categoryScreenConfig/save",
			/* 保存大屏配置路径 */
			queryCategoryUrl: "/category/get",
			categoryUrl:"/category/getById",
			num: 0,
			categoryName: "",
		},

		created: function () {

		},
		mounted: function () {
			this.FnList()
			this.FnUser()
			this.FnCategory()
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
				val.editFlag = 2
				val.label = "确定"
				val.icon = "img/second/finsh.png"
			},
			FnFlagTrue: function (val) {
				var that = this
				var saveUrl = domainUrl + this.saveUrl
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
			},
			/* 获取列表 */
			FnList: function () {
				var that = this
				var listUrl = domainUrl + this.listUrl + getQuery("cid");
				getMessage(listUrl).then(function (res) {
					if (res.code == 200) {
						that.picList = [];
						res.data.forEach(item => {
							var linkUrlData = "./datashow.html?cid=" + getQuery("cid"); //核心数据daping 
							if (item.type == 2) {
								linkUrlData = "./negative.html?cid=" + getQuery("cid"); //全网舆情数据大屏
							} else if (item.type == 3) {
								linkUrlData = "./remark.html?cid=" + getQuery("cid"); //整个分发数据大屏
							}
							that.picList.push({
								title: item.name,
								label: "修改标题",
								editFlag: 1,
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
			},
			FnCategory: function () {
				var that = this;
				var categoryUrl = domainUrl + this.categoryUrl + "?categoryId=" + getQuery("cid");
				getMessage(categoryUrl).then(function (res) {
					if (res.code == 200) {
						that.categoryName = res.name;
					} else {
						alert(res.message)
					}
				})
			},
		}

	})

}
