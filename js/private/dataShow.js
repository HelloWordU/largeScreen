window.onload = function () {
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
			listUrl: "/categoryScreenConfig/get?categoryId=",
			/* 详情 */
			detailUrl: "/monitoringPlantformStatistic/getByCategoryId?categoryId=",
			/* 搜索 url */
			searchListUrl: "/monitoringPlantformArticle/getByPlantformIdAndKey",
			/* 走势图 url */
			echartsUrl: "/monitoringPlantformStatistic/getPageDataByCategoryId?categoryId=",
			/* 详情列表 */
			detailList: [],
			keyWord: "",
			timeData: [],
			searchList: [],
			mySwiper: null,
			searchSwiper: null,
			searchText: "",
			changeFlag: false,
			keyWordEdit: '',
			pageTitle: '',
		},
		watch: {
			keyWord: function (val) {
				this.changeFlag = false
			}
		},
		created: function () {

		},
		mounted: function () {
			this.FnEchartsList();
			this.FnDetail()

		},
		methods: {
			// // 查询监控平台
			// FnPlantQuery:function(){
			// 	var plantUrl = domainUrl + this.echartsUrl
			// },
			/* 返回主页 */
			FnReturn: function () {
				location.href = "./index.html"
			},
			/* 走势图 */
			FnEchartsList: function () {
				var that = this
				var echartsUrl = domainUrl + this.echartsUrl + getQuery("cid")
				getMessage(echartsUrl).then(function (res) {
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
			FnEcharts: function (zsData, jpData, hyData, dbData) {
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
            axisTick: { alignWithLabel: true },
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
            boundaryGap: true, 
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
            splitLine:{
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
			/* 获取列表 */
			FnList: function () {
				var that = this
				var listUrl = domainUrl + this.listUrl + getQuery("cid");
				getMessage(listUrl).then(function (res) {
					if (res.code == 200) {
						res.data.forEach(item => {
							if(item.type == 1)
							{
								$('title').text(item.name);
								that.pageTitle = item.name;
							}
							// var linkUrlData = "./datashow.html?cid=" + getQuery("cid"); //核心数据daping 
							// if (item.type == 2) {
							// 	linkUrlData = "./negative.html?cid=" + getQuery("cid"); //全网舆情数据大屏
							// } else if (item.type == 3) {
							// 	linkUrlData = "./remark.html?cid=" + getQuery("cid"); //整个分发数据大屏
							// }
							// that.picList.push({
							// 	title: item.name,
							// 	label: "修改标题",
							// 	editFlag: 1,
							// 	linkUrl: linkUrlData,
							// 	icon: "img/second/edit.png",
							// 	src: "img/second/screen" + item.type + ".jpg",
							// 	id: item.id,
							// 	type: item.type,
							// 	categoryId: item.categoryId
							// });
						});
					} else {
						alert(res.message)
					}
				})
			},
			/* 详情 */
			FnDetail: function () {
				var that = this
				var detailUrl = domainUrl + this.detailUrl + getQuery("cid")
				getMessage(detailUrl).then(function (res) {
					if (res.code == 200) {
						that.detailList = []
						var isReach = ''
						res.data.forEach(item => {
							if (item.isReachingStandard) {
								isReach = '达标'
							} else {
								isReach = '不达标'
							}
							that.detailList.push({
								"label": "自身",
								"isReach": isReach,
								"labelType": 1,
								"id": item.id,
								"title": "(" + item.categoryName + ")" + item.plantformName + "(" + item.categoryName + ")",
								"plantformName": item.plantformName
							})
						})
						that.FnSearchList(that.detailList[0].id)
						that.searchText = that.detailList[0].plantformName
						that.$nextTick(function () {
							that.FnSwiper()
							that.FnSetTime()
						})
					} else {
						alert(res.message)
					}
				})
			},
			FnSearch: function () {
				this.changeFlag = true
				this.keyWordEdit = this.keyWord
				this.FnSearchList()
			},
			FnSetTime: function () {
				var that = this
				var num = 1
				$('.detail_list').eq(0).addClass('selected')
				setInterval(function () {
					that.FnSearchList(that.detailList[num].id)
					if (num < that.detailList.length) {
						$('.detail_list').eq(num).addClass('selected').siblings().removeClass('selected')
						that.searchText = that.detailList[num].plantformName
						num++
						if (num == that.detailList.length) {
							num = 0
						}
					}
				}, 20000)
			},
			FnSearchList: function (id) { /* 搜索 */
				var that = this
				var searchListUrl = domainUrl + this.searchListUrl
				keyWord = this.changeFlag ? this.keyWordEdit : ''
				postMessage(searchListUrl, {
					keyWord: keyWord,
					optionValue: id
				}).then(function (res) {
					if (res.code == 200) {
						that.searchList = [];
						res.data.forEach(item => {
							that.searchList.push({
								"linkUrl": item.url,
								"url": item.url,
								"title": item.title
							});
						})
						that.$nextTick(function () {
							that.FnSearchSwiper()
						})
					} else {
						alert(res.message)
					}
				})
			},
			FnSwiper: function () {
				this.mySwiper = null
				this.mySwiper = new Swiper(".mySwiper", {
					direction: "vertical",
					autoplay: 20000,
					//loop: true, //数据需要循环就放开
					slidesPerView: 5
				})
			},
			FnSearchSwiper: function () {
				if(this.searchSwiper){
				  this.searchSwiper.destroy(false)
				  this.searchSwiper = null
				}
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
