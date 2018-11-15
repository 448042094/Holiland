require(["config"],function(){
	require(["jquery","template","header","footer"],function($,template){
		function List(){
			this.renderList();
		}
		List.prototype = {
			constructor: List,
			renderList:function(){
				$.ajax({
					url:"http://rap2api.taobao.org/app/mock/87267/example/110",
					success:function(data){
						var html = template("list_template",{list:data.res_body.list});
						$(".list_body").html(html);
					}
				})
			}
		}
		new List();
	});
});
	

