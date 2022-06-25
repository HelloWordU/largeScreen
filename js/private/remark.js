window.onload = function() {
	var vm = new Vue({
		el: '#remark',
		data: {
			listUrl: "/categoryScreenConfig/get?categoryId=",
			/* 华为发布 */
			publishDataUrl: "/categoryMaintenance/get?categoryId=",
			/* 近期热点 */
			hotListUrl: "/categoryHotWord/get?categoryId=",
			/* 近期行业热词 */
			wordListUrl: "/categoryIndustryHotWord/get?categoryId=",
			/* 本周亮点文章 */
			articleUrl: "/categoryArticle/get?categoryId=",
			/* 本周亮点文章列表 */
			articleList: [],
			/* 近期行业热词 */
			wordList: [{

			}],
			/*近期热点列表 */
			hotList: [{

			}],
			pageTitle: '',
			hotSwiper: null,
			wordSwiper: null,
			articleSwiper: null,
			/* 华为发布 */
			publishData: {
				write: 0,
				haveRrite: 0,
				publish: 0,
				havepublish: 0,
				read: 0,
				haveRead: 0,
			}
		},

		created: function() {

		},
		mounted: function() {
			this.FnPublishData()
			this.FnHotList()
			this.FnWordList()
			this.FnArticleList()
			this.FnList()
		},
		methods: {
			/* 返回主页 */
			FnReturn: function() {
				location.href = "./index.html"
			},
			FnPublishData: function() {
				var that = this
				var publishDataUrl = domainUrl + this.publishDataUrl + getQuery("cid")
				getMessage(publishDataUrl).then(function(res) {
					if (res.code == 200) {
						that.publishData = res.data
					} else {
						alert(res.message)
					}
				})
			},
			/* 近期热点 */
			FnHotList: function() {
				var that = this
				var hotListUrl = domainUrl + this.hotListUrl + getQuery("cid")
				getMessage(hotListUrl).then(function(res) {
					if (res.code == 200) {
						that.hotList = res.data
						if (that.hotList.length > 5) {
							that.$nextTick(function() {
								that.FnHotSwiper()
							})
						}

					} else {
						alert(res.message)
					}
				})
			},
			/* 近期行业热词 */
			FnWordList: function() {
				var that = this
				var wordListUrl = domainUrl + this.wordListUrl + getQuery("cid")
				getMessage(wordListUrl).then(function(res) {
					if (res.code == 200) {
						that.wordList = res.data
						if (that.wordList.length > 5) {
							that.$nextTick(function() {
								that.FnWordSwiper()
							})
						}

					} else {
						alert(res.message)
					}
				})
			},
			/* 本周亮点文章 */
			FnArticleList: function() {
				var that = this
				var articleUrl = domainUrl + this.articleUrl + getQuery("cid")
				getMessage(articleUrl).then(function(res) {
					if (res.code == 200) {
						that.articleList = res.data
						if (that.articleList.length > 5) {
							that.$nextTick(function() {
								that.FnArticleSwiper()
							})
						}

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
						res.data.forEach(item => {
							if(item.type == 2)
							{
								$('title').text(item.name);
								that.pageTitle = item.name;
							}
						});
					} else {
						alert(res.message)
					}
				})
			},
			FnHotSwiper: function() {
				this.hotSwiper = new Swiper(".mySwiper", {
					direction: "vertical",
					slidesPerView: 5,
					mousewheel: true,
					autoplay: true,
					loop: true
				});
			},
			FnWordSwiper: function() {
				this.wordSwiper = new Swiper(".wordSwiper", {
					direction: "vertical",
					slidesPerView: 5,
					mousewheel: true,
					autoplay: true,
					loop: true
				});
			},
			FnArticleSwiper: function() {
				this.articleSwiper = new Swiper(".articleSwiper", {
					direction: "vertical",
					slidesPerView: 5,
					autoplay: true,
					loop: true
				});
			},
		}

	})

}
