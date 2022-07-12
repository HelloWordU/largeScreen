window.onload = function () {
	var vm = new Vue({
		el: '#negative',
		data: {
			pageTitle: '评论区维护红绿灯预警',
			linkSum: {
				normalCount: 0,
				negetiveCount: 0,
				noCommentCount: 0
			},
			pageData: [
				{
					title: "最近2小时",
					showDate: "15:30:14-17:30:14",
					normalCount: 1000,
					negetiveCount: 0,
					noCommentCount: 0,
					comment:[]
				}, {
					title: "最近5小时",
					showDate: "12:30:14-17:30:14",
					normalCount: 10,
					negetiveCount: 0,
					noCommentCount: 0,
					comment:[]
				},
				{
					title: "最近12小时",
					showDate: "05:30:14-17:30:14",
					normalCount: 20,
					negetiveCount: 0,
					noCommentCount: 0,
					comment:[]
				},
				{
					title: "最近24小时",
					showDate: "05:30:14-17:30:14",
					normalCount: 30,
					negetiveCount: 0,
					noCommentCount: 0,
					comment:[]
				}
			],
			commentNegativeConfigUrl: "/commentNegativeConfig/get?categoryId=",
			// echarts: '',
			// pageTitle: '',
			// /* 全网列表 */
			// surveyList: [{ "value": 1, "key": "00时" }, { "value": 0, "key": "01时" }, { "value": -1, "key": "02时" }],
			// /* 五大列表 */
			// headlineList: [{ "value": 1, "key": "00时" }, { "value": 0, "key": "01时" }, { "value": -1, "key": "02时" }],
			// surveyUrl: "/negativeRate/getAll?categoryId=",/* 全网 url */
			// headlineUrl: "/negativeRate/getGateWay?categoryId=",/* 五大 url */
			// echartsUrl: "/negativeRate/getGateWayRate?categoryId=",/* 走势图 url */
			// listUrl: "/categoryScreenConfig/get?categoryId=",
		},

		created: function () {

		},
		mounted: function () {
			this.FnCommentNegativeConfig()
			// this.FnHeadlineList()
			// this.FnEchartsList()
			// this.FnList()
		},
		methods: {
			/* 返回主页 */
			FnReturn: function () {
				location.href = "./index.html"
			},
			/* 评论负面配置 */
			FnCommentNegativeConfig: function () {
				var that = this
				var surveyUrl = domainUrl + this.commentNegativeConfigUrl + getQuery("cid")
				getMessage(surveyUrl).then(function (res) {
					if (res.code == 200) {
						//	that.surveyList = res.data
						that.linkSum.normalCount = res.data.normalCount;
						that.linkSum.negetiveCount = res.data.negetiveCount;
						that.linkSum.noCommentCount = res.data.noCommentCount;

						var curTime = new Date();
						var hour = curTime.getHours();//得到小时数
						var minute = curTime.getMinutes();//得到分钟数
						var second = curTime.getSeconds();//得到秒数
						var last2Hour = new Date(curTime.getTime()- 2*60*60*1000);


						that.pageData[0].showDate = last2Hour.getHours() + ":" + last2Hour.getMinutes() + ":" 
						+ last2Hour.getSeconds() + "-" +  curTime.getHours() + ":" + curTime.getMinutes() + ":" 
						+ curTime.getSeconds();
						that.pageData[0].normalCount = res.data.last2HourNormalCount;
						that.pageData[0].negetiveCount = res.data.last2HourNegetiveCount;
						that.pageData[0].noCommentCount = res.data.last2HourNoCommentCount;

						for(var i=0;i<that.pageData[0].normalCount;i++)
						{
							that.pageData[0].comment.push({isNormal:true});
						}

						for(var i=0;i<that.pageData[0].negetiveCount;i++)
						{
						    var index =	Math.floor(Math.random() * (that.pageData[0].comment.length - 0)) + 0;
							that.pageData[0].comment.splice(index,0,{isNegetive:true});
						}
						
						for(var i=0;i<that.pageData[0].noCommentCount;i++)
						{
							var index =	Math.floor(Math.random() * (that.pageData[0].comment.length - 0)) + 0;
							that.pageData[0].comment.splice(index,0,{isNoComment:true});
						}

						var	last5Hour = new Date(curTime.getTime()- 5*60*60*1000);
						that.pageData[1].showDate =  last5Hour.getHours() + ":" + last5Hour.getMinutes() + ":" 
						+ last5Hour.getSeconds() + "-" +  curTime.getHours() + ":" + curTime.getMinutes() + ":" 
						+ curTime.getSeconds();
						that.pageData[1].normalCount = res.data.last5HourNormalCount;
						that.pageData[1].negetiveCount = res.data.last5HourNegetiveCount;
						that.pageData[1].noCommentCount = res.data.last5HourNoCommentCount;
						for(var i=0;i<that.pageData[1].normalCount;i++)
						{
							that.pageData[1].comment.push({isNormal:true});
						}

						for(var i=0;i<that.pageData[1].negetiveCount;i++)
						{
						    var index =	Math.floor(Math.random() * (that.pageData[1].comment.length - 0)) + 0;
							that.pageData[1].comment.splice(index,0,{isNegetive:true});
						}
						
						for(var i=0;i<that.pageData[1].noCommentCount;i++)
						{
							var index =	Math.floor(Math.random() * (that.pageData[1].comment.length - 0)) + 0;
							that.pageData[1].comment.splice(index,0,{isNoComment:true});
						}

						var	last12Hour = new Date(curTime.getTime()- 12*60*60*1000);
						that.pageData[2].showDate =  last12Hour.getHours() + ":" + last12Hour.getMinutes() + ":" 
						+ last12Hour.getSeconds() + "-" +  curTime.getHours() + ":" + curTime.getMinutes() + ":" 
						+ curTime.getSeconds();
						that.pageData[2].normalCount = res.data.last12HourNormalCount;
						that.pageData[2].negetiveCount = res.data.last12HourNegetiveCount;
						that.pageData[2].noCommentCount = res.data.last12HourNoCommentCount;
						for(var i=0;i<that.pageData[2].normalCount;i++)
						{
							that.pageData[2].comment.push({isNormal:true});
						}

						for(var i=0;i<that.pageData[2].negetiveCount;i++)
						{
						    var index =	Math.floor(Math.random() * (that.pageData[2].comment.length - 0)) + 0;
							that.pageData[2].comment.splice(index,0,{isNegetive:true});
						}
						
						for(var i=0;i<that.pageData[2].noCommentCount;i++)
						{
							var index =	Math.floor(Math.random() * (that.pageData[2].comment.length - 0)) + 0;
							that.pageData[2].comment.splice(index,0,{isNoComment:true});
						}



						var	last24Hour = new Date(curTime.getTime()- 24*60*60*1000);
						that.pageData[3].showDate =  last24Hour.getHours() + ":" + last24Hour.getMinutes() + ":" 
						+ last24Hour.getSeconds() + "-" +  curTime.getHours() + ":" + curTime.getMinutes() + ":" 
						+ curTime.getSeconds();
						that.pageData[3].normalCount = res.data.last24HourNormalCount;
						that.pageData[3].negetiveCount = res.data.last24HourNegetiveCount;
						that.pageData[3].noCommentCount = res.data.last24HourNoCommentCount;
						for(var i=0;i<that.pageData[3].normalCount;i++)
						{
							that.pageData[3].comment.push({isNormal:true});
						}

						for(var i=0;i<that.pageData[3].negetiveCount;i++)
						{
						    var index =	Math.floor(Math.random() * (that.pageData[3].comment.length - 0)) + 0;
							that.pageData[3].comment.splice(index,0,{isNegetive:true});
						}
						
						for(var i=0;i<that.pageData[3].noCommentCount;i++)
						{
							var index =	Math.floor(Math.random() * (that.pageData[3].comment.length - 0)) + 0;
							that.pageData[3].comment.splice(index,0,{isNoComment:true});
						}


					} else {
						alert(res.message)
					}
				})
			}
		}

	})

}
