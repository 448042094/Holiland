require.config({
	baseUrl: "/",
	paths: {
		"header": "module/header",
		"footer": "module/footer",
		"jquery": "libs/jquery/jquery-1.12.4.min",
		"bootstrap": "libs/bootstrap/js/bootstrap",
		"cookie":"libs/jquery-plugins/jquery.cookie",
		"zoom": "libs/jquery-plugins/jquery.elevatezoom",
		"template": "libs/art-template/template-web"
	},
	//垫片
	shim:{
		"bootstrap": {
			deps: ["jquery"]
		},
		"zoom": { // 为放大镜插件指明依赖关系
			deps: ["jquery"]
		}
		
	}
})