/**
 * Created by zhong on 2014/6/7.
 */
(function(self){
	"use strict";

	var initSelect = null,
		initTable = null,
		initSearch = null,
		CI_LIB = null,
		selectDefaultVal = "全部",
		initEvent = null,
		addItem = null,
		initGo = null,
		$goBtn = null,
		$col2 = null,
		$col3 = null,
		$addTable = null,
		$cateSelect = null,
		$attrSelect = null,
		$searchBtn = null,
		$filterInput = null;

	initGo = function(){
		$goBtn.click(function(){
			var ids = [],
				url = "";

			$addTable.find("tbody tr").each(function(){
				ids.push($(this).attr("nid"));
			});

			if(ids.length >= 1){
				url = "openChildTreeUp.html?ids=" + ids.join("_");
				window.open(url);
			}else{
				graph.utils.alert("错误：至少添加一项");
			}
		});
	};

	addItem = function(o){
		var html = "";
		if($addTable.find("*[nid="+ o.id +"]").length == 0){
			html = graph.utils.render("share/addItemTable.html", o);
			$addTable.find("tbody").append(html);

			$addTable.find("tbody tr:last").find("button").click(function(){
				$(this).closest("tr").remove();
			});
		}
	};

	initTable = function(data){
		var html = "",
			$table = null;

		html = graph.utils.render("ci/ciTable.html", {
			list: data
		});

		$col2.html(html);
		$table = $col2.find("table");
		$table.DataTable({
			paging:false,
			stateSave:true,
			oLanguage:{
				sInfo: "共找到 _TOTAL_ 条记录，当前显示(_START_ 到 _END_)",
				sSearch: "在结果中查找： _INPUT_"
			}
		});

		$table.find("tr").each(function(){
			var _this = this;
			$(_this).find("button").click(function(){
				var url = "openChildTree.html?level=5&type=min&id=" + $(_this).attr("nid");
				window.open(url);
			});
		});
	};

	initSearch = function(){
		var handle = function(){
			var cateid = "",
				key = "",
				value = "",
				result = null,
				where = {};

			cateid = $cateSelect.val();
			key = $attrSelect.val() === selectDefaultVal ? "*" : $attrSelect.val();
			value = $filterInput.val() === "" ? "*" : "*" + $filterInput.val() + "*";
			where[key] = value;

			result =  graph.api.getCiAdvanced(cateid, where, 1,  100000);

			if(graph.utils.isTrueRet(result)){
				initTable(result.data.datas);
			}else{
				graph.utils.alert(result.message);
				throw new Error(result.message);
			}
		};

		$searchBtn.click(handle);
	};

	initEvent = function(){
		var update = null;

		update = function(name){
			var result = null,
				arr = null;

			$attrSelect.html("");
			result = graph.api.getCiCateByName(name);
			if(graph.utils.isTrueRet(result)){
				if(result.data && Array.isArray(result.data.attributes)){
					arr = result.data.attributes;
					arr.unshift({name: selectDefaultVal});
					$.each(arr, function(){
						var option = document.createElement("option");
						option.innerHTML = this.name;
						$attrSelect.append(option);
					});
				}
			}else{
				graph.utils.alert(result.message);
			}
		};

		$cateSelect.change(function(){
			update(this.value);
		});
		update($cateSelect.val());
	};

	initSelect = function(){
		var result = null,
			depName = [],
			split = " > ",
			getName = null,
			loop = null,
			data = null;

		result = graph.api.getCiCate();
		CI_LIB = result.data;
		data = result.data;
		getName = function(name){
			if(depName.length >= 1){
				return [depName.join(split), name].join(split);
			}else{
				return name;
			}
		};

		loop = function(list){
			$.each(list, function(){
				var option = document.createElement("option");
				option.innerHTML = getName(this.id);
				option.value = this.id;
				option.selected = this.id === "bizservice";
				$cateSelect.append(option);
				if(this.childrenNode){
					depName.push(this.id);
					loop(this.childrenNode);
					depName.pop();
				}
			});
		};

		loop(data);

	};

	self.graph = self.graph || {};
	self.graph.onload = function(){
		graph.header("基础设施状态可视");
		$cateSelect = $("#cate");
		$attrSelect = $("#attr");
		$filterInput = $("#filter");
		$searchBtn = $("#searchBtn");
		$addTable = $("#addtable");
		$col2 = $("#col2");
		$col3 = $("#col3");
		$goBtn = $("#goBtn");
		initSelect();
		initEvent();
		initSearch();
		initGo();
	};

})(this);