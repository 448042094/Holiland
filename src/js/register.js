require(["config"],function(){
	//引入模块
	require(["jquery","header","footer","cookie"],function($){
		function Register(){
			this.CheckFrom();
			this.Submit();
		}
		var result = [false,false,false,false];
		Register.prototype = {
			constructor:Register,
			CheckFrom:function(){					
				$("#phone").blur(function(){
					var phone = $("#phone").val();
					if(!(/^1[34578]\d{9}$/.test(phone))){
						$("#er_Ph").show();
					}else{
						$("#er_Ph").hide();
						result[0] = true;
					}
				});
				$("#password").blur(function(){
					var password = $("#password").val();
					if(!(/^\w{6,20}$/.test(password))){
						$("#er_Pa").show();
					}else{
						$("#er_Pa").hide();
						result[1] = true;
					}
				});
				$("#repassword").blur(function(){
					var password = $("#password").val();
					var repassword = $("#repassword").val();
					if(repassword !== password){
						$("#er_rePa").show();
					}else{
						$("#er_rePa").hide();
						result[2] = true;
					}
				});
				$("#r_check").click(function(){
					var status = $("#r_check").prop("checked");
					if(status == true){							
						result[3] = true;
					}
				});	
			},
			Submit:function(){										
				$(".register_btn").click(function(){
					var send = result.every(function(ok){
					return ok;
					});	
					if(send){
						var data = $(".re_form").serialize();
						var url = "http://localhost/Holiland/api/resigter.php";
				 		$.post(url,data,Register.prototype.reSuccess,"json");			 		
				 		return false;
					}		
		 		});	
			},
			reSuccess:function(data){
				if(data.res_code === 1){
					location = "/html/login.html";
				}else{
					alert("注册失败");
				}
			}
		}
		new Register();
	});
});