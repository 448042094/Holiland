define(["jquery"],function(o){function n(){this.Click(),this.Hover()}o("footer").load("/html/component/footer.html",function(){new n}),n.prototype={constructor:n,Click:function(){o("#help_btn").click(function(){o(".footmenu").is(":hidden")?(o("#help_bg").css({"background-position":"-23px -84px"}),o(".footmenu").slideDown("slow")):(o("#help_bg").css({"background-position":"0px -84px"}),o(".footmenu").slideUp("slow"))})},Hover:function(){o(".f_footer_wx").hover(function(){o(".f_fenxiang").slideDown(200)},function(){o(".f_fenxiang").slideUp(200)})}}});