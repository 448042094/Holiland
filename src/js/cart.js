require(["config"],function(){
	//引入模块
	require(["jquery","template","cookie","header","footer"],function($,template){
		function Cart(){
			this.products = null;
			this.load();
			this.addListener();
			this.LastPrice();
		}
		Cart.prototype = {
			constructor:Cart,
			load:function(){
				$.cookie.json = true;
				var products = this.products = $.cookie("cart") || [];
				if (products.length === 0) { // 购物车为空
					$(".cart_no").show().siblings(".cart_has").hide();
					return;
				}
				// 购物车非空
				$(".cart_no").hide().siblings(".cart_has").removeClass("hidden");
				// 渲染模板
				var data = {products: products}
				var html = template("cart-body-template", data);
				$("#tbody").html(html);
			},
			//事件监听
			addListener:function(){
				$("#tbody").on("click",".btn_del",$.proxy(this.delHandler,this));
				$("#tbody").on("click",".btn_down,.btn_up",$.proxy(this.AddLose,this));				
				$("#tbody").on("blur",".cart_num",$.proxy(this.inputHandler,this));				
				
				$(".ckAll").on("click",$.proxy(this.ckAll,this));
				$("#tbody").on("click",".btn_check",$.proxy(this.ckSome,this));
				$("#delAll").on("click",$.proxy(this.delAll,this));
				
			},
			//删除单行cookie
			delHandler:function(event){
				var src = event.target;
				var tr = $(src).parents("tr");
				var id = tr.find(".cart_id").html();
				this.products = this.products.filter(function(prod){
					return !(prod.id == id);
				});
				$.cookie("cart",this.products,{expires:10,path:"/"})
				tr.remove();
				this.LastPrice();
				if (this.products.length === 0) { // 购物车为空
					$(".cart_no").show().siblings(".cart_has").hide();
				}
				
			},
			AddLose:function(event){
				var src = event.target;
				var tr = $(src).parents("tr");
				var id = tr.find(".cart_id").html();
				var product = this.products.filter(function(prod){
					return prod.id == id;
				})[0];
				if($(src).is(".btn_down")){
					if(product.amount <= 1)
						return;
					product.amount--;
				}else{
					product.amount++;
				}
				
				$.cookie("cart",this.products,{expires:10,path:"/"});
				tr.find(".cart_num").val(product.amount);
				tr.find(".cart_price").html("￥"+product.amount*product.price);
				this.LastPrice();
			},
			inputHandler:function(event){
				var src = event.target;
				var tr = $(src).parents("tr");
				var id = tr.find(".cart_id").html();
				var product = this.products.filter(function(prod){
					return prod.id == id;
				})[0];
				var amount = $(src).val();
				var reg = /^[1-9]\d*$/;
				if(!reg.test(amount)){
					$(src).val(product.amount);
					return;
				}
				product.amount = amount;
				$.cookie("cart",this.products,{expires:10,path:"/"});
				tr.find(".cart_price").html("￥"+product.amount*product.price);
				this.LastPrice();
			},
			ckAll:function(event){
				var status = $(event.target).prop("checked");
				$(".btn_check").prop("checked",status);
				this.LastPrice();
			},
			ckSome:function(event){
				// 获取购物车主体中选中的复选框个数
				var count = $(".btn_check:checked").length;
				// 设置全选复选框选中状态
				var status = count === this.products.length;
				$(".ckAll").prop("checked", status);
				this.LastPrice();
			},
			LastPrice:function(){
				var sum = 0;
				$(".btn_check:checked").each(function(){
					sum += Number($(this).parents("tr").find(".cart_price").text().slice(1));
				})				
				$(".lastPrice").html("总计￥"+sum);
			},
			delAll:function(){		
				$.cookie("cart",this.products,{expires:-1,path:"/"});
				location.reload();
				if (this.products.length === 0) { // 购物车为空
					$(".cart_no").show().siblings(".cart_has").hide();
				}
			}
			
		}
		new Cart();
	});
});