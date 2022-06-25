window.onload = function () {
	var vm = new Vue({
		el: '#negative',
		data: {
			echarts: '',
			/* 全网列表 */
			surveyList: [{ "value": 1, "key": "00时" }, { "value": 0, "key": "01时" }, { "value": -1, "key": "02时" }],
			/* 五大列表 */
			headlineList: [{ "value": 1, "key": "00时" }, { "value": 0, "key": "01时" }, { "value": -1, "key": "02时" }],
			surveyUrl: "/negativeRate/getAll?categoryId=",/* 全网 url */
			headlineUrl: "/negativeRate/getGateWay?categoryId=",/* 五大 url */
			echartsUrl: "/negativeRate/getGateWayRate?categoryId="/* 走势图 url */
		},

		created: function () {

		},
		mounted: function () {
			this.FnSurveyList()
			this.FnHeadlineList()
			this.FnEchartsList()
		},
		methods: {
			/* 返回主页 */
			FnReturn: function () {
				location.href = "./index.html"
			},
			/* 全网调查率 */
			FnSurveyList: function () {
				var that = this
				var surveyUrl = domainUrl + this.surveyUrl + getQuery("cid")
				getMessage(surveyUrl).then(function (res) {
					if (res.code == 200) {
						that.surveyList = res.data
					} else {
						alert(res.message)
					}
				})
			},
			/* 五大门户和头条 */
			FnHeadlineList: function () {
				var that = this
				var headlineUrl = domainUrl + this.headlineUrl + getQuery("cid")
				getMessage(headlineUrl).then(function (res) {
					if (res.code == 200) {
						that.headlineList = res.data
					} else {
						alert(res.message)
					}
				})
			},
			/* 五大门户和头条的负面走势图 */
			FnEchartsList: function () {
				var that = this
				var echartsUrl = domainUrl + this.echartsUrl + getQuery("cid")
				getMessage(echartsUrl).then(function (res) {
					if (res.code == 200) {
						that.FnEcharts(res.data.wyData, 
							res.data.ttData, res.data.txData,
							 res.data.xlData, res.data.shData, 
							 res.data.fhwData,res.data.timeData)
					} else {
						alert(res.message)
					}
				})
			},
			FnEcharts: function (wyData, ttData, txData, xlData, shData, fhwData,timeData) {
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
						data: timeData,
            axisTick: { alignWithLabel: true },
						axisLine: { //x轴线的颜色以及宽度
							show: true,
							lineStyle: {
								color: "#044B98",
								width: 1,
								type: "solid"
							}
						},
            axisLabel: {
            	textStyle: {
            		color: "#8EC7DC",
            		fontSize: 16,
            		fontWeight: "bold"
            	}
            },
            boundaryGap: true
					},
					yAxis: {
						type: 'value',
            axisLabel: {
            	textStyle: {
            		color: "#ffffff",
            		fontSize: 14,
            		fontWeight: "normal"
            	}
            },
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
					},
					series: [{
						name: '网易',
						type: 'line',
						smooth: true,
						itemStyle: {
							color: '#FF1C1C',
						},
						data: wyData
					},
					{
						name: '头条',
						type: 'line',
						smooth: true,
						itemStyle: {
							color: '#D96729',
						},
						data: ttData
					},
					{
						name: '腾讯',
						type: 'line',
						smooth: true,
						itemStyle: {
							color: '#BE55E1',
						},
						data: txData
					},
					{
						name: '新浪',
						type: 'line',
						smooth: true,
						itemStyle: {
							color: '#159FFF',
						},
						data: xlData
					},
					{
						name: '搜狐',
						type: 'line',
						smooth: true,
						itemStyle: {
							color: '#36B77F',
						},
						data: shData
					},
					{
						name: '凤凰网',
						type: 'line',
						smooth: true,
						itemStyle: {
							color: '#FAAD14',
						},
						data: fhwData
					},
					{
						name: '警戒线',
						type: 'line',
						smooth: true,
						itemStyle: {
							normal: {
								lineStyle: {
									type: 'dotted' //'dotted'虚线 'solid'实线
								}
							}
						},
						data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
					}

					]


				};
				this.echarts.setOption(option)
			}
		}

	})

}
