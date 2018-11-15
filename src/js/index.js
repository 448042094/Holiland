require(["config"], function() {
			//引入模块
			require(["jquery","template", "footer" ,"header"], function($,template,footer) {
					function Index() {
						this.loadCarousel();
						this.renderList();
					}
					Index.prototype = {
						constructor: Index,
						loadCarousel: function() {
							//轮播图
							var $imgs = $(".banner ul li"),
								$btns = $(".banner ol li");

							var index = 0; //当前播放的图片下标
							var flag = false; //默认没有开始播放
							var timer = null;

							$btns.click(function() {
								if(!flag) {
									flag = true;
									$(this).addClass("ac").siblings().removeClass("ac");
									$imgs.eq(index).fadeOut();
									index = $(this).index();
									$imgs.eq(index).fadeIn(function() {
										flag = false;
									});
								}
							})

							$("#goPrev").click(function() {
								if(!flag) {
									flag = true;
									$imgs.eq(index).fadeOut();
									if(--index < 0) {
										index = $imgs.length - 1;
									}
									$btns.eq(index).addClass("ac").siblings().removeClass("ac");
									$imgs.eq(index).fadeIn(function() {
										flag = false;
									});
								}
							})

							$("#goNext").click(function() {
								if(!flag) {
									flag = true;
									$imgs.eq(index).fadeOut();
									if(++index >= $imgs.length) {
										index = 0;
									}
									$btns.eq(index).addClass("ac").siblings().removeClass("ac");
									$imgs.eq(index).fadeIn(function() {
										flag = false;
									});
								}
							})
							$(".banner").hover(function() {
								clearInterval(timer);
							}, (function autoPlay() {
								timer = setInterval(function() {
									$("#goNext").trigger("click");
								}, 4000);
								return autoPlay;
							}));
						},
						renderList: function() {
							$.ajax({
								url:"http://rap2api.taobao.org/app/mock/87267/example/1539246690468",
								success: function(data){
								var html = template("index_template",{list: data.res_body.list});						
								$(".else").html(html);
								}							
							});
						}
						
					};
					new Index();
			});
});			