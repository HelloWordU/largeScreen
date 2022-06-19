window.onload = function() {
	var vm = new Vue({
		el: '#remark',
		data: {
			/* 华为发布 */
			publishDataUrl: "/categoryMaintenance/get?categoryId=",
			/* 近期热点 */
			hotListUrl: "/categoryHotWord/get?categoryId=",
			/* 近期行业热词 */
			wordListUrl: "/categoryIndustryHotWord/get?categoryId=",
			/* 本周亮点文章 */
			articleUrl: "/categoryArticle/get?categoryId=",
			/* 本周亮点文章列表 */
			articleList: [{
				"author": "作者",
				"source": "来源",
				"readNum": "9999",
				"interactionNum": "12213",
				"title": "(HUAWEI Mate X2)搜狐手机"
			}],
			/* 近期行业热词 */
			wordList: [{
				"title": "(HUAWEI Mate X2)新浪手机新闻客户端(HUAWEI Mate X2)"
			}],
			/*近期热点列表 */
			hotList: [{
				"title": "(HUAWEI Mate X2)新浪手机新闻客户端(HUAWEI Mate X2)"
			}],
			hotSwiper: null,
			wordSwiper: null,
			articleSwiper: null,
			/* 华为发布 */
			publishData: {
				write: 90000,
				haveRrite: 90000,
				publish: 90000,
				havepublish: 90000,
				read: 90000,
				haveRead: 90000,
			}
		},

		created: function() {

		},
		mounted: function() {
			this.FnPublishData()
			this.FnHotList()
			this.FnWordList()
			this.FnArticleList()
		},
		methods: {
			/* 返回主页 */
			FnReturn: function() {
				location.href = "./index.html"
			},
			FnPublishData: function() {
				var that = this
				var publishDataUrl = domainUrl + this.publishDataUrl + getQuery("cid")
				getMessage(publishDataUrl).then(function(res){
					if(res.code == 200){
					  that.publishData = res.data
					}else{
						alert(res.message)
					}
				})
			},
			/* 近期热点 */
			FnHotList: function() {
				var that = this
				var hotListUrl = domainUrl + this.hotListUrl + getQuery("cid")
				getMessage(hotListUrl).then(function(res){
					if(res.code == 200){
					  that.hotList = res.data
				   that.FnHotSwiper()
					}else{
						alert(res.message)
					}
				})
			},
			/* 近期行业热词 */
			FnWordList: function() {
				var that = this
				var wordListUrl = domainUrl + this.wordListUrl + getQuery("cid")
				getMessage(wordListUrl).then(function(res){
					if(res.code == 200){
					  that.wordList = res.data
				   that.FnWordSwiper()
					}else{
						alert(res.message)
					}
				})
			},
			/* 本周亮点文章 */
			FnArticleList: function() {
				var that = this
				var articleUrl = domainUrl + this.articleUrl + getQuery("cid")
				getMessage(articleUrl).then(function(res){
					if(res.code == 200){
					  that.articleList = res.data
				   that.FnArticleSwiper()
					}else{
						alert(res.message)
					}
				})
			},
			FnHotSwiper: function() {
				this.hotSwiper = new Swiper(".mySwiper", {
					direction: "vertical",
					slidesPerView: 5,
					mousewheel: true,
					//loop:true
				});
			},
			FnWordSwiper: function() {
				this.wordSwiper = new Swiper(".wordSwiper", {
					direction: "vertical",
					slidesPerView: 5,
					mousewheel: true,
					//loop:true
				});
			},
			FnArticleSwiper: function() {
				this.articleSwiper = new Swiper(".articleSwiper", {
					direction: "vertical",
					slidesPerView: 5,
					autoplay: true,
					//loop: true
				});
			},
		}

	})

}
