require(["config"], function() {
	require(["jquery", "template", "cookie", "zoom", "header", "footer"], function($, template) {
		function Products() {	
			this.handleData();
		}
		Products.prototype = {
			constructor: Products,		
			handleData: function() {
				$.ajax({
					url: "http://rap2api.taobao.org/app/mock/87267/products",
					success: function(data) {
						//数据渲染
						var data = {list: data.res_body.list};
						var html = template("products_template", data);				
						$(".products_box").prepend(html);
						//放大镜
						$("#prod_img").elevateZoom({
							scrollZoom:true,
							easing:true,
							zoomWindowHeight:485,
							zoomWindowWidth:485				
						});
						function add(){
							var currentProduct = {
								id: $("#prod_id").text(),
								title: $("#prod_title").text(),
								img: $("#prod_img").attr("src"),
								price: $("#prod_price").text().slice(1),
								amount:1
							};
							//console.log(currentProduct);
							$.cookie.json = true;
							var products = $.cookie("cart") || [];
							// 判断是否已有选购
							var has = products.some(function(prod) {
								if (prod.id == currentProduct.id) { // 已有选购商品
									prod.amount++; // 数量自增
									return true;
								}
								return false;
							});
							if (!has) // 未选购
								products.push(currentProduct);
			
							// 保存购物车：存回cookie
							// 数据结构：[{id,title,img,price,amout}]
							$.cookie("cart", products, {expires: 10, path:"/"});
							return false;//阻止冒泡
						}
						//添加购物车
						$(".btn_add").click(function(){
							add();
						});
						//立即购买
						$(".btn_buy").click(function(){
							add();
						});
						
					}
				})
			}
		}
		new Products();
	});
});