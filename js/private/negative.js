window.onload = function() {
	var vm = new Vue({
		el: '#negative',
		data: {
			echarts: '',
			/* 全网列表 */
			surveyList: [{"value":1,"key":"00时"},{"value":0,"key":"01时"},{"value":-1,"key":"02时"}],
			/* 五大列表 */
			headlineList: [{"value":1,"key":"00时"},{"value":0,"key":"01时"},{"value":-1,"key":"02时"}],
			surveyUrl:"",/* 全网 url */
			headlineUrl:"",/* 五大 url */
			echartsUrl:""/* 走势图 url */
		},

		created: function() {
			
		},
		mounted: function() {
			this.FnSurveyList()
			this.FnHeadlineList()
			this.FnEchartsList()
		},
		methods: {
			/* 返回主页 */
			FnReturn:function() {
				location.href = "./index.html"
			},
			/* 全网调查率 */
			FnSurveyList:function(){
				var that = this
				var surveyUrl = domainUrl + this.surveyUrl
				// getMessage(surveyUrl).then(function(){
				// 	if(res.code == 0){
				// 	  that.surveyList = res.data
				// 	}else{
				// 		alert(res.message)
				// 	}
				// })
			},
			/* 五大门户和头条 */
			FnHeadlineList:function(){
				var that = this
				var headlineUrl = domainUrl + this.headlineUrl
				// getMessage(headlineUrl).then(function(){
				// 	if(res.code == 0){
				// 	  that.headlineList = res.data
				// 	}else{
				// 		alert(res.message)
				// 	}
				// })
			},
			/* 五大门户和头条的负面走势图 */
			FnEchartsList:function(){
				var that = this
				var echartsUrl = domainUrl + this.echartsUrl
				// getMessage(echartsUrl).then(function(){
				// 	if(res.code == 0){
				// 	  that.FnEcharts(res.data.wyData,res.data.ttData,res.data.txData,res.data.xlData,res.data.shData,res.data.fhwData)
				// 	}else{
				// 		alert(res.message)
				// 	}
				// })
			},
			FnEcharts:function(wyData,ttData,txData,xlData,shData,fhwData) {
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
						data: ['00时', '01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时', '11时', '12时', '13时',
							'14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时', '24时'
						],
						axisLine: { //x轴线的颜色以及宽度
							show: true,
							lineStyle: {
								color: "#ffffff",
								width: 1,
								type: "solid"
							}
						}
					},
					yAxis: {
						type: 'value',
						
						axisLine: {
							show: true,
							lineStyle: {
								color: "#ffffff",
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
