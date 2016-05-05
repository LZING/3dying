api = {}
window.graph.api = api


ajax = (fn, args) ->
	graph.loading.show()
	result = fn.apply @, args
	graph.loading.hide()
	return result

# 获取全部CI分类数据
api.getCiCate = -> ajax.apply mmdb.ci.category, [mmdb.ci.category.getAllByStructure, arguments]

# 获取单个CI数据
api.getCiCateByName = -> ajax.apply mmdb.ci.category, [mmdb.ci.category.get, arguments]

# 高级查询CI
api.getCiAdvanced = -> ajax.apply mmdb.ci.information, [mmdb.ci.information.qureyByAdvanced, arguments]

# 获取单个CI数据
api.getKpiCateByName = -> ajax.apply mmdb.kpi.category, [mmdb.kpi.category.get, arguments]

# 高级查询KPI
api.getKpiAdvanced = -> ajax.apply mmdb.kpi.information, [ mmdb.kpi.information.qureyByAdvanced, arguments]

# 获取KPI类数据
api.getKpiCate = -> ajax.apply mmdb.kpi.category, [mmdb.kpi.category.getAllByStructure, arguments]

# 获取CI实例信息
api.getCiInfo = -> ajax.apply mmdb.ci.information, [mmdb.ci.information.qureyByFuzzy, arguments]

# 模糊查询视图信息
api.getViewFuzzy = -> ajax.apply mmdb.view.information, [mmdb.view.information.queryFuzzy, arguments]

# 批量获取CI关系间数据
api.getRelationCiByIds = -> ajax.apply mmdb.relation.ciinformation, [mmdb.relation.ciinformation.getRelationByIds, arguments]

# 获取CI&KPI关系
api.getRelationCiAndKpiByIds = -> ajax.apply mmdb.relation.cikpiinformation, [mmdb.relation.cikpiinformation.getKpiByCiNeoIds, arguments]

# 根据CIs关系类型和条件进行高级查询
api.getCiRelationById = -> ajax.apply mmdb.relation.ciinformation, [mmdb.relation.ciinformation.queryCiRelationById, arguments]

# 根据KPIs关系类型和条件进行高级查询
api.getKpiRelationById = -> ajax.apply mmdb.relation.ciinformation, [mmdb.relation.ciinformation.queryKpiRelationById, arguments]

# 获取私有视图分类结构
api.getPriViewCate = -> ajax.apply mmdb.view.owncategory, [mmdb.view.owncategory.getAllByStructure, arguments]

# 获取私有视图树形
api.getPriViewCateByTree = -> ajax.apply mmdb.view.owncategory, [mmdb.view.owncategory.getViewDirectoryTree, arguments]

# 获取公有视图分类结构
api.getPubViewCate = -> ajax.apply mmdb.view.category, [mmdb.view.category.getAllByStructure, arguments]

# 获取公有视图树形
api.getPubViewCateByTree = -> ajax.apply mmdb.view.category, [mmdb.view.category.getViewDirectoryTree, arguments]

# 创建公有视图分类
api.pubViewCateCreate = -> ajax.apply mmdb.view.category, [mmdb.view.category.save, arguments]

# 创建私有视图分类
api.priViewCateCreate =  -> ajax.apply mmdb.view.owncategory, [mmdb.view.owncategory.save, arguments]

# 通过ID获取某个视图信息
api.getView = -> ajax.apply mmdb.view.information, [mmdb.view.information.getByNeoId, arguments]

# 保存视图
api.saveView = -> ajax.apply mmdb.view.information, [mmdb.view.information.save, arguments]

# 获取视图阀值
api.getViewThreshol = -> ajax.apply mmdb.alarm, [mmdb.alarm.queryThresholdByView, arguments]

# 修改视图阀值
api.saveThreshol = -> ajax.apply mmdb.alarm, [mmdb.alarm.saveThreshold, arguments]

# 批量获取多个CI信息
api.getCis = -> ajax.apply mmdb.ci.information, [mmdb.ci.information.getByNeoIds, arguments]

# 获取CI信息
api.getCi = -> ajax.apply mmdb.ci.information, [mmdb.ci.information.getByNeoId, arguments]

# 更新CI信息
api.updateCi = -> ajax.apply mmdb.ci.information, [mmdb.ci.information.update, arguments]

# 创建CI
api.saveCi = -> ajax.apply mmdb.ci.information, [mmdb.ci.information.save, arguments]

# 获取组合信息数据
api.getPortfolio = -> ajax.apply mmdb.view.portfolio, [mmdb.view.portfolio.get, arguments]

# 保存组合信息数据
api.savePortfolio = -> ajax.apply mmdb.view.portfolio, [mmdb.view.portfolio.save, arguments]

# 更新视图
api.updateView = -> ajax.apply mmdb.view.information, [mmdb.view.information.updateById, arguments]

# 上传图片
api.uploadImg = -> ajax.apply mmdb.view.information, [mmdb.view.information.importBackground, arguments]

# 导出PNG图片
api.exportPng = -> ajax.apply mmdb.view.information, [mmdb.view.information.exportPng, arguments]

# 导出PNG图片
api.exportPng = -> ajax.apply mmdb.view.information, [mmdb.view.information.exportPng, arguments]

# 导出PDF文档
api.exportPdf = -> ajax.apply mmdb.view.information, [mmdb.view.information.exportPdf, arguments]

# 获取关系分类结构
api.getRelationStructure = -> ajax.apply mmdb.relation.category, [mmdb.relation.category.getAllByStructure, arguments]

# 获取关系分类
api.getRelation = -> ajax.apply mmdb.relation.category, [mmdb.relation.category.get, arguments]

# 获取CI关系
api.getCiRelation = -> ajax.apply mmdb.relation.ciinformation, [mmdb.relation.ciinformation.getById, arguments]

# 修改CI关系
api.updateCiRelation = -> ajax.apply mmdb.relation.ciinformation, [mmdb.relation.ciinformation.update, arguments]

# 创建CI关系
api.saveCiRelation = -> ajax.apply mmdb.relation.ciinformation, [mmdb.relation.ciinformation.save, arguments]

# 获取用户功能
api.getUserFunc = -> ajax.apply mmdb.security.user, [mmdb.security.user.getFunctions, arguments]

# 获取预警
api.getPerf = -> ajax.apply mmdb.alarm, [mmdb.alarm.queryPerfData, arguments]

# 批量获取预警
api.getPerfs = -> ajax.apply mmdb.alarm, [mmdb.alarm.queryPerfDatas, arguments]

# 获取事件
api.getCiEvent = -> ajax.apply mmdb.alarm, [mmdb.alarm.queryEventByCI, arguments]

# 批量获取事件
api.getCisEvent = -> ajax.apply mmdb.alarm, [mmdb.alarm.queryEventByCIs, arguments]

# 获取与CI有关系的KPIs - [可批量]
api.getViewByCiNeoIds = -> ajax.apply mmdb.relation.civiewinformation, [mmdb.relation.civiewinformation.getViewByCiNeoIds, arguments]

# 批量获取eip
api.getEips = -> ajax.apply mmdb.eip, [mmdb.eip.getByIds, arguments]

# 获取CI工单
api.getCiTicket = -> ajax.apply mmdb.alarm, [mmdb.alarm.queryTicketByCi, arguments]

# 获取CI工单
api.getCisTicket = -> ajax.apply mmdb.alarm, [mmdb.alarm.queryTicketByCis, arguments]

# 删除订阅
api.subDel = -> ajax.apply mmdb.relation.userview, [mmdb.relation.userview.deleteByNeoIds, arguments]

# 删除视图
api.delView = -> ajax.apply mmdb.view.information, [mmdb.view.information.deleteByNeo4jId, arguments]

# 根据ci数组和视图获取相关的告警
api.getCiEvents = -> ajax.apply mmdb.alarm, [mmdb.alarm.queryEvents, arguments]

# 获取订阅视图
api.getSubView = -> ajax.apply mmdb.relation.userview, [mmdb.relation.userview.getViewByUser, arguments]

# 获取自己的视图
api.getSelfView = -> ajax.apply mmdb.view.owncategory, [mmdb.view.owncategory.getViewByUser, arguments]

# 订阅视图
api.addSubView = -> ajax.apply mmdb.relation.userview, [mmdb.relation.userview.save, arguments]

# 公有视图分类名称重命名
api.pubCateRename = -> ajax.apply mmdb.view.category, [mmdb.view.category.setCategoryName, arguments]

# 私有视图分类名称重命名
api.priCateRename = -> ajax.apply mmdb.view.owncategory, [mmdb.view.category.setCategoryName, arguments]

# 公有视图分类名称删除
api.pubCateDel = -> ajax.apply mmdb.view.category, [mmdb.view.category.deleteCategory, arguments]

# 私有视图分类名称删除
api.priCateDel = -> ajax.apply mmdb.view.owncategory, [mmdb.view.category.deleteCategory, arguments]

# 视图重命名
api.viewRename = -> ajax.apply mmdb.view.information, [mmdb.view.information.setNameById, arguments]

# 视图删除
api.viewDel = -> ajax.apply mmdb.view.information, [mmdb.view.information.deleteByNeo4jId, arguments]

# 获取历史事件
api.getHistoryEvent = -> ajax.apply mmdb.alarm, [mmdb.alarm.queryHistoryEvent, arguments]

# 获取历史
api.queryEventPerfByCurrent = -> ajax.apply mmdb.eventPerf, [mmdb.eventPerf.queryEventPerfByCurrent, arguments]

# 获取气泡详情
api.queryEventDataByCI = -> ajax.apply mmdb.eventPerf, [mmdb.eventPerf.queryEventDataByCI, arguments]

# 获取KPI详情
api.queryPerfByCI = -> ajax.apply mmdb.eventPerf, [mmdb.eventPerf.queryPerfByCI, arguments]

# 获取图片列表
api.qureyForAdmin = -> ajax.apply mmdb.image, [mmdb.image.qureyForAdmin, arguments]

# 删除图片
api.deleteByNameForAdmin = -> ajax.apply mmdb.image, [mmdb.image.deleteByNameForAdmin, arguments]

# 上传SVG图片
api.importSvgForAdmin = -> ajax.apply mmdb.image, [mmdb.image.importSvgForAdmin, arguments]

# 查询告警信息
api.queryEventByCIs = -> ajax.apply mmdb.eventPerf, [mmdb.eventPerf.queryEventByCIs, arguments]



