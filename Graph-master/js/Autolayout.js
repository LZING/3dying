/**
 * Created by Lee on 2014/9/16.
 */
(function(){
	var F = function(graph){
		this.graph = graph;
		this.foldHandle();
	};

	F.prototype.foldHandle = function(){
		var foldingHandler = null,
			_this = this;

		_this.graph.foldHandle = function(cell){
			_this.expandLayout(cell);
			graph.clearSelection();
		};

		foldingHandler = function(sender, evt){
			var cells = evt.getProperty('cells');

			if(cells[0].collapsed){
				_this.collaspeLayout(cells[0]);
				_this.graph.clearSelection();
			}else{
				_this.expandLayout(cells[0]);
				_this.graph.clearSelection();
			}
		};

		_this.graph.addListener(mxEvent.FOLD_CELLS, foldingHandler);
	};


	F.prototype.collaspeLayout = function(cell){
		var f = null,
			_this = this,
			oriCell = cell,
			offsetX = Math.round((cell.geometry.alternateBounds.width - cell.geometry.width) / 2),
			offsetY = Math.round((cell.geometry.alternateBounds.height - cell.geometry.height) / 2);

		f = function(cell){
			var cells = _this.graph.getChildVertices(cell.getParent()),
				pCell = cell.getParent(),
				oriPoint = {};

			if(pCell.id !== "1"){
				pCell.geometry.width -= offsetX * 2;
				pCell.geometry.height -= offsetY * 2;

				$.each(cells, function(){
					if(cell.id == this.id){
						return true;
					}
					this.geometry.x -= offsetX;
					this.geometry.y -= offsetY;
				});

			}else{
				cell.geometry.x += offsetX;
				cell.geometry.y += offsetY;
			}

			oriPoint.x = cell.geometry.x + window.parseInt(cell.geometry.width/2, 10);
			oriPoint.y = cell.geometry.y + window.parseInt(cell.geometry.height/2, 10);

			$.each(cells, function(){
				var centerPoint = {},
					oBasePoint = null,
					oTargetPoint = null;

				if(cell.id == this.id){
					return true;
				}

				centerPoint.x = this.geometry.x + window.parseInt(this.geometry.width/2, 10);
				centerPoint.y = this.geometry.y + window.parseInt(this.geometry.height/2, 10);

				oBasePoint= new transit.util.Point(oriPoint.x,oriPoint.y);
				oTargetPoint= new transit.util.Point(centerPoint.x, centerPoint.y);

				oTargetPoint.absolute2relative(oBasePoint);

				if(oriCell.id == cell.id){
					oTargetPoint.expandIt(
						oBasePoint,
							cell.geometry.alternateBounds.width/2,
							cell.geometry.alternateBounds.height/2,
							cell.geometry.width/2,
							cell.geometry.height/2
					);
				}else{
					oTargetPoint.expandIt(
						oBasePoint,
							cell.geometry.width/2 + offsetX,
							cell.geometry.height/2 + offsetY,
							cell.geometry.width/2,
							cell.geometry.height/2
					);
				}

				this.geometry.x = Math.round(oTargetPoint.absoluteX - this.geometry.width / 2);
				this.geometry.y = Math.round(oTargetPoint.absoluteY - this.geometry.height / 2);
			});
		};

		do{
			_this.graph.refresh();
			f(cell);
			cell = cell.getParent();
		}while(cell.id !== "1");
		_this.graph.refresh();
		_this.graph.clearSelection();
		_this.graph.setSelectionCell(oriCell);
	};

	F.prototype.expandLayout = function(cell){
		var f = null,
			_this = this,
			oriCell = cell,
			offsetX = Math.round((cell.geometry.width - cell.geometry.alternateBounds.width) / 2),
			offsetY = Math.round((cell.geometry.height - cell.geometry.alternateBounds.height) / 2);

		f = function(cell){
			var cells = _this.graph.getChildVertices(cell.getParent()),
				pCell = cell.getParent(),
				oriPoint = {};

			if(pCell.id !== "1"){
				pCell.geometry.width += offsetX * 2;
				pCell.geometry.height += offsetY * 2;

				$.each(cells, function(){
					if(cell.id == this.id){
						return true;
					}
					this.geometry.x += offsetX;
					this.geometry.y += offsetY;
				});

			}else{
				cell.geometry.x -= offsetX;
				cell.geometry.y -= offsetY;
			}

			oriPoint.x = cell.geometry.x + window.parseInt(cell.geometry.width/2, 10);
			oriPoint.y = cell.geometry.y + window.parseInt(cell.geometry.height/2, 10);

			$.each(cells, function(){
				var centerPoint = {},
					oBasePoint = null,
					oTargetPoint = null;

				if(cell.id == this.id){
					return true;
				}

				centerPoint.x = this.geometry.x + window.parseInt(this.geometry.width/2, 10);
				centerPoint.y = this.geometry.y + window.parseInt(this.geometry.height/2, 10);

				oBasePoint= new transit.util.Point(oriPoint.x,oriPoint.y);
				oTargetPoint= new transit.util.Point(centerPoint.x, centerPoint.y);

				oTargetPoint.absolute2relative(oBasePoint);

				if(oriCell.id == cell.id){
					oTargetPoint.expandIt(
						oBasePoint,
							cell.geometry.alternateBounds.width/2,
							cell.geometry.alternateBounds.height/2,
							cell.geometry.width/2,
							cell.geometry.height/2
					);
				}else{
					oTargetPoint.expandIt(
						oBasePoint,
							cell.geometry.width/2 - offsetX,
							cell.geometry.height/2 - offsetY,
							cell.geometry.width/2,
							cell.geometry.height/2
					);
				}

				this.geometry.x = Math.round(oTargetPoint.absoluteX - this.geometry.width / 2);
				this.geometry.y = Math.round(oTargetPoint.absoluteY - this.geometry.height / 2);
			});
		};

		do{
			_this.graph.refresh();
			f(cell);
			cell = cell.getParent();
		}while(cell.id !== "1");
		_this.graph.refresh();
		_this.graph.clearSelection();
		_this.graph.setSelectionCell(oriCell);
	};

	var transit = (function(){
		var transit={};
		transit.util={};
		transit.util.Point = function(iX,iY){
			this.absoluteX=iX;
			this.absoluteY=iY;
			this.relativeX=0;
			this.relativeY=0;
		};

		transit.util.Point.prototype.absolute2relative = function(oBasePoint){
			this.relativeX=this.absoluteX-oBasePoint.absoluteX;
			this.relativeY=this.absoluteY-oBasePoint.absoluteY;
		};
		transit.util.Point.prototype.relative2absolute = function(oBasePoint){
			this.absoluteX=this.relativeX+oBasePoint.absoluteX;
			this.absoluteY=this.relativeY+oBasePoint.absoluteY;
		};
		transit.util.Point.prototype.expandIt = function(oPoint,iRx,iRy,iNx,iNy){
			var iTnx = iNx/iRx;
			var iTny = iNy/iRy;
			var iTlx = iNx - iRx;
			var iTly = iNy - iRy;
			this.relativeX=transit.util.math.changeIt(this.relativeX,iRx,iTnx,iTlx);
			this.relativeY=transit.util.math.changeIt(this.relativeY,iRy,iTny,iTly);
			this.relative2absolute(oPoint);
		};

		transit.util.math={};
		transit.util.math.changeIt=function(iD,iR,iN,iL){
			return (iD>=-1*iR && iD<=iR)?iD*iN:(iD<-1*iR?iD-iL:iD+iL);
		};
		transit.util.math.changeBack=function(iD,iR,iN,iL){
			return (iD>=-1*iR && iD<=iR)?iD/iN:(iD<-1*iR?iD+iL:iD-iL);
		};

		return transit;
	})();

	this.Autolayout = F;

}).call(this);