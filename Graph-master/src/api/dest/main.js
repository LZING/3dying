(function() {
  var ajax, api;

  api = {};

  window.graph.api = api;

  ajax = function(fn, args) {
    var result;
    graph.loading.show();
    result = fn.apply(this, args);
    graph.loading.hide();
    return result;
  };

  api.getCiCate = function() {
    return ajax.apply(mmdb.ci.category, [mmdb.ci.category.getAllByStructure, arguments]);
  };

  api.getCiCateByName = function() {
    return ajax.apply(mmdb.ci.category, [mmdb.ci.category.get, arguments]);
  };

  api.getCiAdvanced = function() {
    return ajax.apply(mmdb.ci.information, [mmdb.ci.information.qureyByAdvanced, arguments]);
  };

  api.getKpiCateByName = function() {
    return ajax.apply(mmdb.kpi.category, [mmdb.kpi.category.get, arguments]);
  };

  api.getKpiAdvanced = function() {
    return ajax.apply(mmdb.kpi.information, [mmdb.kpi.information.qureyByAdvanced, arguments]);
  };

  api.getKpiCate = function() {
    return ajax.apply(mmdb.kpi.category, [mmdb.kpi.category.getAllByStructure, arguments]);
  };

  api.getCiInfo = function() {
    return ajax.apply(mmdb.ci.information, [mmdb.ci.information.qureyByFuzzy, arguments]);
  };

  api.getViewFuzzy = function() {
    return ajax.apply(mmdb.view.information, [mmdb.view.information.queryFuzzy, arguments]);
  };

  api.getRelationCiByIds = function() {
    return ajax.apply(mmdb.relation.ciinformation, [mmdb.relation.ciinformation.getRelationByIds, arguments]);
  };

  api.getRelationCiAndKpiByIds = function() {
    return ajax.apply(mmdb.relation.cikpiinformation, [mmdb.relation.cikpiinformation.getKpiByCiNeoIds, arguments]);
  };

  api.getCiRelationById = function() {
    return ajax.apply(mmdb.relation.ciinformation, [mmdb.relation.ciinformation.queryCiRelationById, arguments]);
  };

  api.getKpiRelationById = function() {
    return ajax.apply(mmdb.relation.ciinformation, [mmdb.relation.ciinformation.queryKpiRelationById, arguments]);
  };

  api.getPriViewCate = function() {
    return ajax.apply(mmdb.view.owncategory, [mmdb.view.owncategory.getAllByStructure, arguments]);
  };

  api.getPriViewCateByTree = function() {
    return ajax.apply(mmdb.view.owncategory, [mmdb.view.owncategory.getViewDirectoryTree, arguments]);
  };

  api.getPubViewCate = function() {
    return ajax.apply(mmdb.view.category, [mmdb.view.category.getAllByStructure, arguments]);
  };

  api.getPubViewCateByTree = function() {
    return ajax.apply(mmdb.view.category, [mmdb.view.category.getViewDirectoryTree, arguments]);
  };

  api.pubViewCateCreate = function() {
    return ajax.apply(mmdb.view.category, [mmdb.view.category.save, arguments]);
  };

  api.priViewCateCreate = function() {
    return ajax.apply(mmdb.view.owncategory, [mmdb.view.owncategory.save, arguments]);
  };

  api.getView = function() {
    return ajax.apply(mmdb.view.information, [mmdb.view.information.getByNeoId, arguments]);
  };

  api.saveView = function() {
    return ajax.apply(mmdb.view.information, [mmdb.view.information.save, arguments]);
  };

  api.getViewThreshol = function() {
    return ajax.apply(mmdb.alarm, [mmdb.alarm.queryThresholdByView, arguments]);
  };

  api.saveThreshol = function() {
    return ajax.apply(mmdb.alarm, [mmdb.alarm.saveThreshold, arguments]);
  };

  api.getCis = function() {
    return ajax.apply(mmdb.ci.information, [mmdb.ci.information.getByNeoIds, arguments]);
  };

  api.getCi = function() {
    return ajax.apply(mmdb.ci.information, [mmdb.ci.information.getByNeoId, arguments]);
  };

  api.updateCi = function() {
    return ajax.apply(mmdb.ci.information, [mmdb.ci.information.update, arguments]);
  };

  api.saveCi = function() {
    return ajax.apply(mmdb.ci.information, [mmdb.ci.information.save, arguments]);
  };

  api.getPortfolio = function() {
    return ajax.apply(mmdb.view.portfolio, [mmdb.view.portfolio.get, arguments]);
  };

  api.savePortfolio = function() {
    return ajax.apply(mmdb.view.portfolio, [mmdb.view.portfolio.save, arguments]);
  };

  api.updateView = function() {
    return ajax.apply(mmdb.view.information, [mmdb.view.information.updateById, arguments]);
  };

  api.uploadImg = function() {
    return ajax.apply(mmdb.view.information, [mmdb.view.information.importBackground, arguments]);
  };

  api.exportPng = function() {
    return ajax.apply(mmdb.view.information, [mmdb.view.information.exportPng, arguments]);
  };

  api.exportPng = function() {
    return ajax.apply(mmdb.view.information, [mmdb.view.information.exportPng, arguments]);
  };

  api.exportPdf = function() {
    return ajax.apply(mmdb.view.information, [mmdb.view.information.exportPdf, arguments]);
  };

  api.getRelationStructure = function() {
    return ajax.apply(mmdb.relation.category, [mmdb.relation.category.getAllByStructure, arguments]);
  };

  api.getRelation = function() {
    return ajax.apply(mmdb.relation.category, [mmdb.relation.category.get, arguments]);
  };

  api.getCiRelation = function() {
    return ajax.apply(mmdb.relation.ciinformation, [mmdb.relation.ciinformation.getById, arguments]);
  };

  api.updateCiRelation = function() {
    return ajax.apply(mmdb.relation.ciinformation, [mmdb.relation.ciinformation.update, arguments]);
  };

  api.saveCiRelation = function() {
    return ajax.apply(mmdb.relation.ciinformation, [mmdb.relation.ciinformation.save, arguments]);
  };

  api.getUserFunc = function() {
    return ajax.apply(mmdb.security.user, [mmdb.security.user.getFunctions, arguments]);
  };

  api.getPerf = function() {
    return ajax.apply(mmdb.alarm, [mmdb.alarm.queryPerfData, arguments]);
  };

  api.getPerfs = function() {
    return ajax.apply(mmdb.alarm, [mmdb.alarm.queryPerfDatas, arguments]);
  };

  api.getCiEvent = function() {
    return ajax.apply(mmdb.alarm, [mmdb.alarm.queryEventByCI, arguments]);
  };

  api.getCisEvent = function() {
    return ajax.apply(mmdb.alarm, [mmdb.alarm.queryEventByCIs, arguments]);
  };

  api.getViewByCiNeoIds = function() {
    return ajax.apply(mmdb.relation.civiewinformation, [mmdb.relation.civiewinformation.getViewByCiNeoIds, arguments]);
  };

  api.getEips = function() {
    return ajax.apply(mmdb.eip, [mmdb.eip.getByIds, arguments]);
  };

  api.getCiTicket = function() {
    return ajax.apply(mmdb.alarm, [mmdb.alarm.queryTicketByCi, arguments]);
  };

  api.getCisTicket = function() {
    return ajax.apply(mmdb.alarm, [mmdb.alarm.queryTicketByCis, arguments]);
  };

  api.subDel = function() {
    return ajax.apply(mmdb.relation.userview, [mmdb.relation.userview.deleteByNeoIds, arguments]);
  };

  api.delView = function() {
    return ajax.apply(mmdb.view.information, [mmdb.view.information.deleteByNeo4jId, arguments]);
  };

  api.getCiEvents = function() {
    return ajax.apply(mmdb.alarm, [mmdb.alarm.queryEvents, arguments]);
  };

  api.getSubView = function() {
    return ajax.apply(mmdb.relation.userview, [mmdb.relation.userview.getViewByUser, arguments]);
  };

  api.getSelfView = function() {
    return ajax.apply(mmdb.view.owncategory, [mmdb.view.owncategory.getViewByUser, arguments]);
  };

  api.addSubView = function() {
    return ajax.apply(mmdb.relation.userview, [mmdb.relation.userview.save, arguments]);
  };

  api.pubCateRename = function() {
    return ajax.apply(mmdb.view.category, [mmdb.view.category.setCategoryName, arguments]);
  };

  api.priCateRename = function() {
    return ajax.apply(mmdb.view.owncategory, [mmdb.view.category.setCategoryName, arguments]);
  };

  api.pubCateDel = function() {
    return ajax.apply(mmdb.view.category, [mmdb.view.category.deleteCategory, arguments]);
  };

  api.priCateDel = function() {
    return ajax.apply(mmdb.view.owncategory, [mmdb.view.category.deleteCategory, arguments]);
  };

  api.viewRename = function() {
    return ajax.apply(mmdb.view.information, [mmdb.view.information.setNameById, arguments]);
  };

  api.viewDel = function() {
    return ajax.apply(mmdb.view.information, [mmdb.view.information.deleteByNeo4jId, arguments]);
  };

  api.getHistoryEvent = function() {
    return ajax.apply(mmdb.alarm, [mmdb.alarm.queryHistoryEvent, arguments]);
  };

  api.queryEventPerfByCurrent = function() {
    return ajax.apply(mmdb.eventPerf, [mmdb.eventPerf.queryEventPerfByCurrent, arguments]);
  };

  api.queryEventDataByCI = function() {
    return ajax.apply(mmdb.eventPerf, [mmdb.eventPerf.queryEventDataByCI, arguments]);
  };

  api.queryPerfByCI = function() {
    return ajax.apply(mmdb.eventPerf, [mmdb.eventPerf.queryPerfByCI, arguments]);
  };

  api.qureyForAdmin = function() {
    return ajax.apply(mmdb.image, [mmdb.image.qureyForAdmin, arguments]);
  };

  api.deleteByNameForAdmin = function() {
    return ajax.apply(mmdb.image, [mmdb.image.deleteByNameForAdmin, arguments]);
  };

  api.importSvgForAdmin = function() {
    return ajax.apply(mmdb.image, [mmdb.image.importSvgForAdmin, arguments]);
  };

  api.queryEventByCIs = function() {
    return ajax.apply(mmdb.eventPerf, [mmdb.eventPerf.queryEventByCIs, arguments]);
  };

}).call(this);
