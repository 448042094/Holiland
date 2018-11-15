define(["jquery","cookie"],function($){
	$("header").load("/html/component/header.html",function(){
		function Header(){
			this.cart();
			this.login();
			this.loginout();
		}
		Header.prototype = {
			constructor:Header,
			cart:function(){
				$.cookie.json = true;
				var products = this.products = $.cookie("cart") || [];
				$(".cart_num").html(products.length);
			},
			login:function(){
				$.cookie.json = true;
				var user = $.cookie("login"); // 如果不能读取到 cookie 则返回 undefined
				if (user) // 有登录用户
					$(".login_off").hide().siblings(".login_on").show(function(){
						$(".welcome").html("欢迎你"+user);
					});
			},
			loginout:function(){
				$(".loginout").click(function(){
					var out = $.cookie("login","",{expires:-1,paht:"/"});
					if(out.length === 0){
						$(".login_on").hide().siblings(".login_off").show();
					}
					location.reload();
				});
			}
		}
		new Header();
	});
});