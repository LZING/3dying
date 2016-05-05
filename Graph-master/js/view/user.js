/**
 * Created by zhong on 2014/6/7.
 */
(function(self){

	"use strict";

	var initMyViews = null,
		getMyViewsData = null,
		initEditor = null,
		resize = null,
		initSubViews = null,
		getSubViewsData = null,
		draw = null,
		subObj = {},
		subHandle = {},
		subRemove = null,
		myViewRemove = null,
		selectView = null,
		refreshHandle = null,
		getCiId = null,
		initEvents = null,
		initPerf = null,
		initTicket = null,
		initRight = null,
		initAccordion = null,
		isInitRight = false,
		boxHeight = null,
		myViewObj = {};

	initAccordion = function(){
		var $main = $(".rightmain"),
			$head = $main.find(".panel-heading"),
			maxHeight = $(window).height() - $head.outerHeight() * 3 - $("#rightTitle").outerHeight() - 50;
		$main.find(".panel-body").css("max-height", maxHeight + "px");
	};

	initRight = function(obj){
		$("#rightTitle").html([obj.data._category_, obj.data.name].join(" - "));
		initEvents(obj.events);
		initPerf(obj.perf);
		initTicket(obj.ticket);
	};

	initEvents = function(obj){
		var $main = $("#collapseOne").find(".panel-body"),
			list = [];

		if(obj && graph.utils.isTrueRet(obj)){
			$.each(obj.data, function(){
				var o = {};
				if(this.length >= 1){
					o.ciname = this[0]["CI名称"];
					o.value = [];
					$.each(this, function(){
						o.value.push(this["详细信息"]);
					});
					o.value = o.value.join("<br />");
					list.push(o);
				}
			});

			list.length ? $main.html(graph.utils.render("user/table.html", {list: list})) : $main.html("无数据");
		}else{
			obj ? $main.html(obj.message) : $main.html("无数据");
		}
	};

	initPerf = function(obj){
		var $main = $("#collapseTwo").find(".panel-body"),
			list = [];

		if(obj && graph.utils.isTrueRet(obj)){
			$.each(obj.data, function(){
				var o = {};
				if(this.length >= 1){
					o.ciname = this[0]["CI名称"];
					o.value = [];
					$.each(this, function(){
						o.value.push(["(" + this["指标类别"] + ")" + this["指标"], this["当前值"]].join(" : "));
					});
					o.value = o.value.join("<br />");
					list.push(o);
				}
			});
			list.length ? $main.html(graph.utils.render("user/table.html", {list: list})) : $main.html("无数据");
		}else{
			obj ? $main.html(obj.message) : $main.html("无数据");
		}
	};

	initTicket = function(obj){
		var $main = $("#collapseThree").find(".panel-body"),
			list = [];

		if(obj && graph.utils.isTrueRet(obj)){
			$.each(obj.data, function(){
				var o = {};
				if(this.length >= 1){
					o.ciname = this[0]["CINAME"];
					o.value = [];
					$.each(this, function(){
						o.value.push([this['SUMMARY'], this["ASSIGNMENT"]].join(" - "));
					});
					o.value = o.value.join("<br />");
					list.push(o);
				}
			});
			list.length ? $main.html(graph.utils.render("user/table.html", {list: list})) : $main.html("无数据");
		}else{
			obj ? $main.html(obj.message) : $main.html("无数据");
		}
	};

	getCiId = function(editor){
		var cells = editor.graph.getDepCells(),
			ids = [];

		$.each(cells, function(){
			if(this.id.indexOf("ci_") === 0){
				ids.push(this.id.split("_")[1]);
			}
		});

		return ids;
	};

	selectView = function(fun){
		var jstree = null,
			viewid = null;

		graph.dialog("选择需要订阅的视图", graph.utils.render("user/selectView.html"), function($elt, dialog){
			if(viewid){
				dialog.hide();
				fun(viewid);
			}else{
				graph.utils.alert("请选择一个视图");
			}
		});
		jstree = function($container, data){
			$.each(data, function(){
				if(typeof this.view === "undefined"){
					if(!this.state){
						this.state = {};
					}
					this.state.disabled = true;
				}
			});
			$container.jstree({
				core : { data : data },
				plugins: ["wholerow"]
			}).bind('select_node.jstree', function(event, data) {
				viewid = data.node.id;
			});
		};
		jstree($("#publicTab").find(".tree-main"), graph.viewManagement.getTreeDataPub());
	};

	subRemove = function(viewid, $box){
		var result = graph.api.subDel(viewid);
		if(graph.utils.isTrueRet(result)){
			$box.fadeOut(200, function(){
				$(this).remove();
			});
		}else{
			graph.utils.alert(result.message);
		}
	};

	myViewRemove = function(viewid, $box){
		graph.utils.confirm("删除后将不能恢复，确山删除此视图？", function(){
			var result = graph.api.delView(viewid);
			if(graph.utils.isTrueRet(result)){
				$box.fadeOut(200, function(){
					$(this).remove();
				});
			}else{
				graph.utils.alert(result.message);
			}
		});
	};

	draw = function(obj, $main, data, removeHandle){
		var graphContainer,
			outlineContainer,
			$box = null,
			suee = null;

		$main.append(graph.utils.render("user/box.html", data));
		$("body").append(graph.utils.render("user/suee.html", data));
		outlineContainer = $main.find(".graphcontainer:last");
		$box = $main.find(".graphbox:last");
		resize($box);
		graphContainer = $(".sueeGraph:last .graphcontainer");
		suee = $(".sueeGraph:last");
		obj[data._neo4jid_] = {};
		obj[data._neo4jid_].data =  data;
		obj[data._neo4jid_].editor = initEditor(graphContainer[0], data.xml);
		obj[data._neo4jid_].outline = initEditor(outlineContainer[0], data.xml);
		obj[data._neo4jid_].graphContainer = graphContainer;
		obj[data._neo4jid_].ciIds = getCiId(obj[data._neo4jid_].outline);
		/*
		if(obj[data._neo4jid_].ciIds.length >= 1){
			obj[data._neo4jid_].events = graph.api.getCiEvents(obj[data._neo4jid_].ciIds);
			obj[data._neo4jid_].perf = graph.api.getPerfs(obj[data._neo4jid_].ciIds, data._neo4jid_);
			obj[data._neo4jid_].ticket = graph.api.getCisTicket(obj[data._neo4jid_].ciIds);
			if(!isInitRight){
				isInitRight = true;
				initRight(obj[data._neo4jid_]);
			}
		}
		*/

		$box.find("*[action=full]").click(function(){
			suee.removeClass("sueeHide");
			suee.addClass("sueeShow");
		});

		$(".sueeGraph:last button").click(function(){
			suee.removeClass("sueeShow");
			suee.addClass("sueeHide");
		});

		$box.find("*[action=remove]").click(function(){
			removeHandle(data._neo4jid_, $box);
		});

		$box.find(".mask").click(function(){
			initRight(obj[data._neo4jid_]);
		});
	};

	resize = function($box){
		boxHeight = boxHeight ? boxHeight : $box.width() * 0.7;
		$box.height(boxHeight);
		$box.find(".graphcontainer").height(boxHeight - $box.find(".tips").height());
	};

	getSubViewsData = function(){
		var result = graph.api.getSubView(),
			ret = [];

		if(graph.utils.isTrueRet(result)){
			return result.data;
		}else{
			graph.alert.alert(result.message);
			return ret;
		}
	};

	getMyViewsData = function(){
		var result = graph.api.getSelfView(),
			ret = [];

		if(graph.utils.isTrueRet(result)){
			return result.data;
		}else{
			graph.alert.alert(result.message);
			return ret;
		}
	};

	initEditor = function(container, xml){
		var editor = graph.utils.getEditor(container);
		container.style.backgroundImage = "";
		graph.utils.openXml(editor, xml);
		editor.graph.setEnabled(false);
		editor.zoomLock = true;
		return editor;
	};

	initSubViews = function(){
		var data = getSubViewsData();
		$("#subViews").html("");
		$.each(data, function(){
			this.tip = "取消订阅";
			draw(subObj, $("#subViews"), this, subRemove);
		});
	};

	initMyViews = function(){
		var data = getMyViewsData();
		$("#myViews").html("");
		$.each(data, function(){
			this.tip = "删除视图";
			draw(myViewObj, $("#myViews"), this, myViewRemove);
		});
	};

	refreshHandle = function(){

		$("#subRefresh").click(function(){
			$("#subViews").html("刷新中...");
			window.setTimeout(initSubViews, 200);
		});

		$("#myViewRefresh").click(function(){
			$("#myViews").html("刷新中...");
			window.setTimeout(initMyViews, 200);
		});
	};

	subHandle = function(){
		$("#subBtn").click(function(){
			selectView(function(viewid){
				var result = graph.api.addSubView(viewid);
				if(graph.utils.isTrueRet(result)){
					result.data.view.tip = "取消订阅";
					draw(subObj, $("#subViews"), result.data.view, subRemove);
				}else{
					graph.utils.alert(result.message);
				}
			});
		});
	};

	self.graph = self.graph || {};
	self.graph.onload = function(){
		self.graph.header("用户中心");
		initAccordion();
		initSubViews();
		initMyViews();
		subHandle();
		refreshHandle();
	};

})(this);