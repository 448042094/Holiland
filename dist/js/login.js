require(["config"],function(){require(["jquery","cookie","header","footer"],function(n){function e(){this.Check(),this.LoginHandler()}var i=[!1,!1];e.prototype={constructor:e,Check:function(){n("#Lphone").blur(function(){var o=n("#Lphone").val();/^1[34578]\d{9}$/.test(o)?(n(".er_ph").hide(),i[0]=!0):n(".er_ph").show()}),n(".login_password").blur(function(){var o=n(".login_password").val();/^\w{6,20}$/.test(o)?(n(".er_pa").hide(),i[1]=!0):n(".er_pa").show()})},LoginHandler:function(){n(".login_btn").click(function(){if(i.every(function(o){return o})){var o=n(".login_form").serialize();console.log(o);return n.post("http://localhost/Holiland/api/login.php",o,e.prototype.LoginSuccess,"json"),!1}})},LoginSuccess:function(o){1===o.res_code?(n.cookie.json=!0,n.cookie("login",o.res_body.phone,{expires:10,path:"/"}),location="/"):alert("账号或密码错误")}},new e})});