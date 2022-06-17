window.onload = function() {
	var vm = new Vue({
		el: '#datashow',
		data: {
			echarts: '',
			reachNum: 10,
			/* 达标 */
			noReachNum: 0,
			/* 不达标 */
			totalNum: 10,
			/* 详情 */
			detailUrl: "",
			/* 搜索 url */
			searchListUrl: "",
			/* 走势图 url */
			echartsUrl: "",
			/* 详情列表 */
			detailList: [{
				"label": "自身",
				"isReach": "达标",
				"labelType": 1,
				"title": "(HUAWEI Mate X2)搜狐手机"
			}],
			value: 1,
			options: [{
				label: "网易新闻客户端搜索",
				value: 1
			}],
			keyWord: "",
			timeData: ["6月12号", "6月12号", "6月12号", "6月12号", "6月12号", "6月12号", "6月12号"],
			searchList: [{
				"linkUrl": "https://www.ithome.com/0/623/001.html",
				"url": "https://www.ithome.com/0/623/001.html",
				"title": "华为 Mate Xs 2、P50 Pocket、Mate X2 折叠屏包揽 5 月份中国市场销量前三，已自建“超级材料实验室”！"
			}],
			mySwiper: null,
			searchSwiper: null,
			searchText: "网易新闻客户端搜索"
		},

		created: function() {

		},
		mounted: function() {
			this.FnDetail()
			this.FnSearchList()
		},
		methods: {
			/* 返回主页 */
			FnReturn: function() {
				location.href = "./index.html"
			},
			/* 走势图 */
			FnEchartsList: function() {
				var that = this
				var echartsUrl = domainUrl + this.echartsUrl
				/* getMessage(echartsUrl).then(function(){
					if(res.code == 0){
						that.reachNum = res.data.reachNum
						that.noReachNum = res.data.noReachNum
						that.totalNum = res.data.totalNum
					  that.FnEcharts(res.data.zsData,res.data.jpData,res.data.hyData,res.data.dbData)
					}else{
						alert(res.message)
					}
				}) */
			},
			FnEcharts: function(zsData, jpData, hyData, dbData) {
				this.echarts = echarts.init(document.getElementById("lineChart"));
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: this.timeData,
						axisLine: { //x轴线的颜色以及宽度
							show: true,
							lineStyle: {
								color: "#044B98",
								width: 1,
								type: "solid",
							}
						},
						axisLabel: {
							textStyle: {
								color: "#8EC7DC",
								fontSize: 16,
								fontWeight: "bold"
							}
						},
					},
					yAxis: {
						type: 'value',

						axisLine: {
							show: true,
							lineStyle: {
								color: "#044B98",
								width: 1,
								type: "solid"
							}
						},
						axisLabel: {
							textStyle: {
								color: "#ffffff",
								fontSize: 14,
								fontWeight: "normal"
							}
						},
					},
					series: [{
							name: '自身',
							type: 'line',
							smooth: true,
							itemStyle: {
								color: '#FF1C1C',
							},
							data: zsData
						},
						{
							name: '精品',
							type: 'line',
							smooth: true,
							itemStyle: {
								color: '#D96729',
							},
							data: jpData
						},
						{
							name: '行业',
							type: 'line',
							smooth: true,
							itemStyle: {
								color: '#BE55E1',
							},
							data: hyData
						},
						{
							name: '自身竞品对比',
							type: 'line',
							smooth: true,
							itemStyle: {
								color: '#159FFF',
							},
							data: dbData
						}

					]


				};
				this.echarts.setOption(option)
			},
			/* 详情 */
			FnDetail: function() {
				var that = this
				var detailUrl = domainUrl + this.detailUrl
				// getMessage(detailUrl).then(function(){
				// 	if(res.code == 0){
				// 	  that.detailList = res.data
				//    that.FnSwiper()
				// 	}else{
				// 		alert(res.message)
				// 	}
				// })
			},
			FnSearch: function() { 
				var that = this
				this.FnSearchList()
			},
			FnSearchList: function() {/* 搜索 */
				var that = this
				var searchListUrl = domainUrl + this.searchListUrl
				/* postMessage(searchListUrl,{
					optionValue:that.value,
					keyWord:that.keyWord
				}).then(function(res){
					if(res.code == 0){
						that.searchList = res.data
						that.FnSearchSwiper()
					}else{
						alert(res.message)
					}
				}) */
			},
			FnSwiper: function() {
				this.mySwiper = null
				this.mySwiper = new Swiper(".mySwiper", {
					direction: "vertical",
					autoplay: true,
					//loop: true, //数据需要循环就放开
					slidesPerView: 5
				})
			},
			FnSearchSwiper: function() {
				this.searchSwiper = null
				this.searchSwiper = new Swiper(".searchSwiper", {
					direction: "vertical",
					autoplay: true,
					//loop: true,//数据需要循环就放开
					slidesPerView: 5
				})
			}

		}

	})

}
