window.onload = function() {
	var vm = new Vue({
		el: '#login',
		data: {
			ruleForm: {
				userName: '',/* 用户名 */
				passWord: '',/* 密码 */
				code: ''/* 验证码 */
			},
			rules: {
				userName: [{
					required: true,
					message: '请输入登录ID',
					trigger: 'blur'
				}],
				passWord: [{
					required: true,
					message: '请输入密码',
					trigger: 'blur'
				}],
				code: [{
					required: true,
					message: '请输入验证码',
					trigger: 'blur'
				}]
			},
			codeWord: "",
			loginUrl: 'http://182.61.26.201:9101/index/login',/* 登录地址 */
			codeUrl: '/index/captcha'/* 获取验证码地址 */
		},

		created: function() {

		},
		mounted: function() {
			this.FnCode()
		},
		methods: {
			submitForm: function(formName) {
				var that = this
				var loginUrl = this.loginUrl
				this.$refs[formName].validate((valid) => {
					if (valid) {
						postMessage(loginUrl,{
							userName:that.ruleForm.userName,
							password:that.ruleForm.passWord,
							checkCode:that.ruleForm.code
						},"application/x-www-form-urlencoded").then(function(res){
							if(res.code == 0){
								alert("登录成功")
								location.href = "./index.html"
							}else{
								alert(res.message)
							}
						})
					} else {
						return false;
					}
				});
			},
			FnCode: function() {
				var that = this
				var date = new Date()
				var codeUrl = domainUrl + this.codeUrl+'?date='+date.getTime()
				getMessage(codeUrl).then(function(res){
					that.codeWord = res
				})
			}
		}

	})
}
