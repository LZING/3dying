

(function(self){
	
	"use strict";
	
	var openOutline = null,
		searchCi = null,
		initTableCi = null,
		initTableView = null,
		cilib = {},
		viewlib = {},
		tableContainer = null,
		queryValue = "",
		searchView = null,
		writeTalbeView = null,
		xmlo,
		writeTalbeCi = null;
	
	self.graph = self.graph || {};
	
	self.graph.onload = function(){
		var height = $(window).height(),
			searchCiInput = null;

		graph.header("搜索");

		searchCiInput = $("input[name=searchCi]");
		
		$("#searchci").click(function(){
			searchCi(searchCiInput.val());
		});

		$("#searchview").click(function(){
			searchView(searchCiInput.val());
		});

		if(urlParams.s){
			if(urlParams.type && urlParams.type == "view"){
				searchView(decodeURIComponent(urlParams.s));
				searchCiInput.val(decodeURIComponent(urlParams.s));
			}else{
				searchCi(decodeURIComponent(urlParams.s));
				searchCiInput.val(decodeURIComponent(urlParams.s));
			}
		}
	};
	
	openOutline = function(container, list, dict){
		var iframe;
		
		iframe = document.createElement("iframe");
		iframe.src = "outlineSearch.html";
		iframe.style.cssText = [
			"width: 100%",
			"height: 100%"
		].join(";");
		
		iframe.setAttribute("frameborder", 0);
		iframe.setAttribute("scrolling", "no");
		
		container.html(iframe);
		
		iframe.contentWindow.oData = {
			list: list,
			dict: dict,
			cell: queryValue
		};
	};
	
	searchCi = function(value){
		var query = {},
			result;

		query["*"] = value.trim() === "" ? "*" : "*" + value + "*";
		result = graph.api.getCiInfo(query, 1, 100000);
		if(graph.utils.isTrueRet(result)){
			writeTalbeCi(result.data);
			
			result.data.datas.each(function(){
				cilib[this._neo4jid_] = this;
			});
		}
	};

	searchView = function(value){
		var result;
		result = graph.api.getViewFuzzy("*"+value+"*", 1, 1000);

		if(graph.utils.isTrueRet(result)){
			writeTalbeView(result.data);

			result.data.datas.each(function(){
				viewlib[this._neo4jid_] = this;
			});
		}
	};

	writeTalbeView = function(data){
		var id;

		id = graph.utils.randstr();
		graph.utils.render("search/item2.html", {
			list : data.datas,
			id : id
		}, function(html){
			var $main = $("#search_result");
			$main.html(html);
			tableContainer = $main.find("#" + id);
			initTableView();
		});
	};

	initTableView = function(){
		/* Formatting function for row details */
		function fnFormatDetails ( oTable, nTr )
		{
			var key = "",
				ret;

			key = $(nTr).attr("viewid");
			ret = graph.utils.render("search/detail.html");

			window.setTimeout(function() {
				var container,
					editor;

				container = $(nTr).next().find(".outline-graph");
				editor = graph.utils.getEditor(container[0]);
				container[0].style.backgroundImage = "";
				graph.utils.openXml(editor, viewlib[key].xml);
				editor.zoomLock = true;
				editor.graph.setEnabled(false);
			}, 500);
			return ret;
		}

		/*
		 * Insert a 'details' column to the table
		 */
		var nCloneTh = document.createElement( 'th' );
		var nCloneTd = document.createElement( 'td' );
		nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

		tableContainer.find('thead tr').each( function () {
			this.insertBefore( nCloneTh, this.childNodes[0] );
		} );

		tableContainer.find('tbody tr').each( function () {
			this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
		} );

		/*
		 * Initialize DataTables, with no sorting on the 'details' column
		 */
		var oTable = tableContainer.dataTable( {
			"aoColumnDefs": [
				{"bSortable": false, "aTargets": [ 0 ] }
			],
			"aaSorting": [[1, 'asc']],
			"aLengthMenu": [
				[5, 15, 20, -1],
				[5, 15, 20, "All"] // change per page values here
			],
			// set the initial value
			"iDisplayLength": 10
		});

		jQuery('#sample_1_wrapper .dataTables_filter input').addClass("form-control input-small"); // modify table search input
		jQuery('#sample_1_wrapper .dataTables_length select').addClass("form-control input-small"); // modify table per page dropdown
		jQuery('#sample_1_wrapper .dataTables_length select').select2(); // initialize select2 dropdown

		/* Add event listener for opening and closing details
		 * Note that the indicator for showing which row is open is not controlled by DataTables,
		 * rather it is done here
		 */
		tableContainer.on('click', ' tbody td .row-details', function () {
			var nTr = $(this).parents('tr')[0];
			if ( oTable.fnIsOpen(nTr) )
			{
				/* This row is already open - close it */
				$(this).addClass("row-details-close").removeClass("row-details-open");
				oTable.fnClose( nTr );
			}
			else
			{
				/* Open this row */
				$(this).addClass("row-details-open").removeClass("row-details-close");
				oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
			}
		});
	};
	
	writeTalbeCi = function(data){
		var id;
		id = graph.utils.randstr();
		graph.utils.render("search/item.html", {
			list : data.datas,
			id : id
		}, function(html){
			var $main = $("#search_result");
			$main.html(html);
			tableContainer = $main.find("#" + id);
			initTableCi();
		});
	};
	
    initTableCi = function() {

        /* Formatting function for row details */
        function fnFormatDetails ( oTable, nTr ){
        	var key = "",
        		i,
        		attr = {},
        		allow,
        		result = null,
        		ret;
        	
        	allow = {
        		"一级分类" : true,
        		"二级分类" : true,
        		"三级分类" : true,
        		"icon"	: true
        	};
        	
			key = $(nTr).attr("ciid");


			for(i in cilib[key]){
				if(i.substr(0, 1) != "_" && !allow[i]){
					attr[i] = cilib[key][i];
				}	
			}

			ret = graph.utils.render("search/detail.html", {
				attr : attr,
				icon : "../" + cilib[key].icon
			});
			
			result = graph.api.getViewByCiNeoIds(key);
			if(graph.utils.isTrueRet(result) && result.data[key].length >= 1){
				queryValue = $(nTr).find("td:eq(1)").html().trim();
				window.setTimeout(function(){
					var container,
						list = [],
						dict;
						
					container = $(nTr).next().find(".outline-graph");
					container.height(container.width() * 0.4);
					container.css("position", "relative");
					
					result.data[key].each(function(){
						list.push({
							catename: this._category_,
							viewid: this._neo4jid_,
							viewname: this.name
						});
					});
					
					dict = {
						btnColor: "#FFFFFF",
						count: result.data[key].length > 4 ? 4 : result.data[key].length,
						layout: "left",
						outLineSize: 0.9,
						toolbarBgColor: "#D9EDF7",
						toolbarSize: 130,
						viewName: "333"
					};
					
					openOutline(container, list, dict);
					
				}, 500);
			}

            return ret;
        }

        /*
         * Insert a 'details' column to the table
         */
        var nCloneTh = document.createElement( 'th' );
        var nCloneTd = document.createElement( 'td' );
        nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';
         
        tableContainer.find('thead tr').each( function () {
            this.insertBefore( nCloneTh, this.childNodes[0] );
        } );
         
        tableContainer.find('tbody tr').each( function () {
            this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
        } );
         
        /*
         * Initialize DataTables, with no sorting on the 'details' column
         */
        var oTable = tableContainer.dataTable( {
            "aoColumnDefs": [
                {"bSortable": false, "aTargets": [ 0 ] }
            ],
            "aaSorting": [[1, 'asc']],
             "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 10
        });

        jQuery('#sample_1_wrapper .dataTables_filter input').addClass("form-control input-small"); // modify table search input
        jQuery('#sample_1_wrapper .dataTables_length select').addClass("form-control input-small"); // modify table per page dropdown
        jQuery('#sample_1_wrapper .dataTables_length select').select2(); // initialize select2 dropdown
         
        /* Add event listener for opening and closing details
         * Note that the indicator for showing which row is open is not controlled by DataTables,
         * rather it is done here
         */
        tableContainer.on('click', ' tbody td .row-details', function () {
            var nTr = $(this).parents('tr')[0];
            if ( oTable.fnIsOpen(nTr) )
            {
                /* This row is already open - close it */
                $(this).addClass("row-details-close").removeClass("row-details-open");
                oTable.fnClose( nTr );
            }
            else
            {
                /* Open this row */                
                $(this).addClass("row-details-open").removeClass("row-details-close");
                oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
            }
        });
    };
	
})(this);