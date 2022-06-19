window.onload = function() {
	var vm = new Vue({
		el: '#datashow',
		data: {
			echarts: '',
			reachNum: 0,
			/* 达标 */
			noReachNum: 0,
			/* 不达标 */
			totalNum: 0,
			categoryName: "",
			/* 详情 */
			detailUrl: "/monitoringPlantformStatistic/getByCategoryId?categoryId=",
			/* 搜索 url */
			searchListUrl: "/monitoringPlantformArticle/getByPlantformIdAndKey",
			/* 走势图 url */
			echartsUrl: "/monitoringPlantformStatistic/getPageDataByCategoryId?categoryId=",
			/* 详情列表 */
			detailList: [],
			value: 1,
			options: [{
				label: "网易新闻客户端搜索",
				value: 1
			}],
			keyWord: "",
			timeData: [],
			searchList: [],
			mySwiper: null,
			searchSwiper: null,
			searchText: "网易新闻客户端搜索"
		},

		created: function() {

		},
		mounted: function() {
			this.FnEchartsList();
			this.FnDetail()
			this.FnSearchList()

		},
		methods: {
			// // 查询监控平台
			// FnPlantQuery:function(){
			// 	var plantUrl = domainUrl + this.echartsUrl
			// },
			/* 返回主页 */
			FnReturn: function() {
				location.href = "./index.html"
			},
			/* 走势图 */
			FnEchartsList: function() {
				var that = this
				var echartsUrl = domainUrl + this.echartsUrl + getQuery("cid")
				getMessage(echartsUrl).then(function(res) {
					if (res.code == 200) {

						that.options = [];
						res.data.plantformData.forEach(item => {
							that.options.push({
								label: item.name,
								value: item.id
							});
						});
						that.timeData = res.data.timeData
						that.reachNum = res.data.reachNum
						that.noReachNum = res.data.noReachNum
						that.totalNum = res.data.totalNum
						that.categoryName = res.data.categoryName;
						that.keyWord = res.data.categoryName;
						that.FnEcharts(res.data.zsData, res.data.jpData, res.data.hyData, res.data.dbData)
					} else {
						alert(res.message)
					}
				})
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
				var detailUrl = domainUrl + this.detailUrl + getQuery("cid")
				getMessage(detailUrl).then(function(res) {
					if (res.code == 200) {
						that.detailList = []
						res.data.forEach(item => {
							that.detailList.push({
								"label": "自身",
								"isReach": "达标",
								"labelType": 1,
								"title": "(" + item.categoryName + ")" + item.plantformName + "(" + item.categoryName + ")"
							})
						})
						that.$nextTick(function() {
							that.FnSwiper()
						})
					} else {
						alert(res.message)
					}
				})
			},
			FnSearch: function() {
				var that = this
				this.FnSearchList()
			},
			FnSearchList: function() { /* 搜索 */
				var that = this
				var searchListUrl = domainUrl + this.searchListUrl
				postMessage(searchListUrl, {
					optionValue: that.value,
					keyWord: that.keyWord
				}).then(function(res) {
					if (res.code == 200) {
						that.searchList = [];
						res.data.forEach(item => {
							that.searchList.push({
								"linkUrl": item.url,
								"url": item.url,
								"title": item.title
							});
						})
						that.$nextTick(function() {
							that.FnSearchSwiper()
						})
					} else {
						alert(res.message)
					}
				})
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
