define(["jquery"],function($){	
	$("footer").load("/html/component/footer.html",function(){
		new Footer();
	});
	function Footer(){
		this.Click();
		this.Hover();
		
	}
	Footer.prototype = {
		constructor:Footer,
		Click:function(){
			$("#help_btn").click(function(){			
				if($(".footmenu").is(":hidden")){
					$("#help_bg").css({"background-position":"-23px -84px"});
					$(".footmenu").slideDown("slow");
				}else{
					$("#help_bg").css({"background-position":"0px -84px"});
					$(".footmenu").slideUp("slow");
				}	
			});
		},
		Hover:function(){		
			$(".f_footer_wx").hover(
				function(){
				$(".f_fenxiang").slideDown(200);
				},
				function(){
				$(".f_fenxiang").slideUp(200);
				}
			)
		}
	}
	
});

