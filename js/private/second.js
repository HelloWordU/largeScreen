window.onload = function() {
	var vm = new Vue({
		el: '#second',
		data: {
			userName: "负责人",
			picList: [{
				title: "评论区维护红路灯大屏",
				label: "修改标题",
				editFlag: "false",
				icon: "img/second/edit.png",
				src: "img/second/pic.png",
				linkUrl: "",
				id: 1
			}, {
				title: "评论区维护红路灯大屏",
				label: "修改标题",
				editFlag: "false",
				linkUrl: "",
				icon: "img/second/edit.png",
				src: "img/second/pic.png",
				id: 2
			}],
			logOutUrl: "",
			/* 退出接口路径 */
			listUrl: "",
			/* 列表接口路径 */
			useUrl: "",
			/* 获取当前用户接口路径 */
			saveUrl: "",
		},

		created: function() {

		},
		mounted: function() {
			this.FnList()
		},
		methods: {
			/* 退出 */
			FnLogOut: function() {
				var logOutUrl = domainUrl + this.logOutUrl
				// getMessage(logOutUrl).then(function(){
				// 	if(res.code == 0){
				// 	  location.href = "./login.html"
				// 	}else{
				// 		alert(res.message)
				// 	}
				// })
			},
			/* 修改标题保存接口 */
			FnFlag: function(val) {
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
					// getMessage(saveUrl).then(function(){
					// 	if(res.code == 0){
					// 	  that.FnList()
					// 	}else{
					// 		alert(res.message)
					// 	}
					// })
				}
			},
			/* 获取列表 */
			FnList: function() {
				var that = this
				var listUrl = domainUrl + this.listUrl
				// getMessage(listUrl).then(function(){
				// 	if(res.code == 0){
				// 	  that.picList = res.data
				// 	}else{
				// 		alert(res.message)
				// 	}
				// })
			},
			FnLink: function(link) {
				location.href = link
			},
			/* 获取当前用户 */
			FnUser: function() {
				var that = this
				var useUrl = domainUrl + this.useUrl
				// getMessage(useUrl).then(function(){
				// 	if(res.code == 0){
				// 	  that.userName = res.data.userName
				// 	}else{
				// 		alert(res.message)
				// 	}
				// })
			}
		}

	})

}
