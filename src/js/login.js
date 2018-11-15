require(["config"],function(){
	//引入模块
	require(["jquery","cookie","header","footer"],function($){
		function Login(){
			this.Check();
			this.LoginHandler();
		}
		var result = [false,false];
		Login.prototype = {
			constructor:Login,
			Check:function(){
				$("#Lphone").blur(function(){
					var phone = $("#Lphone").val();
					if(!(/^1[34578]\d{9}$/.test(phone))){
						$(".er_ph").show();
					}else{
						$(".er_ph").hide();
						result[0] = true;
					}
				});
				$(".login_password").blur(function(){
					var password = $(".login_password").val();
					if(!(/^\w{6,20}$/.test(password))){
						$(".er_pa").show();
					}else{
						$(".er_pa").hide();
						result[1] = true;
					}
				});
			},
			LoginHandler:function(){
				$(".login_btn").click(function(){
					var send = result.every(function(ok){
					return ok;
					});	
					if(send){
						// 获取表单中待提交的数据，序列化
						var data = $(".login_form").serialize();
						// ajax 提交登录数据
						console.log(data)
						var url = "http://localhost/Holiland/api/login.php";
						$.post(url, data, Login.prototype.LoginSuccess, "json");
						return false;
					}
				});
				
			},
			LoginSuccess:function(data){
				if (data.res_code === 1) { // 登录成功
					// 将登录成功的用户信息保存到 cookie 中
					$.cookie.json = true;
					$.cookie("login", data.res_body.phone, {expires:10,path: "/"});
					// 跳转页面
					location = "/";
				} else {
					alert("账号或密码错误")
				}
			}
		}
		
		new Login();
	});
});