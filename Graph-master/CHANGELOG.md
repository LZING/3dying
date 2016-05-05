2014-09
- Toolbar增加cell层级排位功能
- 新增Autolayout
- alert替换为bootstrap modal
- Fix 保存视图后再点击更新出现id为空bug


2014-06-19
- 新增显示detail时列合并的功能
- openChildTree新增气泡点击事件
- 优化detail显示


2014-06-15
- openChildTree新增min与all模式，以减轻渲染压力
- tree新增纵向业务流


2014-06-14
- 新增eip关系处理


2014-06-13
- openChildTree页面默认展开层级范围改小，避免数据量过大死菜
- mxGraph添加zoomLock成员，在某些情况下锁定放大缩小
- 修复cell的value在html模式下放大或缩小时重新渲染导致动态改写的内容消失bug
- 优化在收展左右侧菜单时，自动把内容重新居中
- 调整一些页面样式
- 修复在点击历史数据的detail时，每点一次就少已列数据的bug
- 新增点击冒泡弹出详情功能
- 调整html样式的大小，避免差距过大导致edge的label被遮挡的bug


2014-06-12
- 修复openChildTree.html页面级别过滤颠倒的问题
- kpi阀值表的呈现于修改
- 修复一些bug以及优化一些页面


2014-06-11
- 优化cell渲染为html样式resize导致edge起源point仍然在旧的位置bug
- 优化一些页面效果
- tree.html右键增加修改阀值功能
- tree.html增加主题切换功能
- 删除blackTree.html页面
- 查看基础设施url增加参数neo4jid


2014-06-10
- 优化时间线
- 给tree.html页面新增收起左侧菜单的功能


2014-06-09
- 监控数据API调整
- DataTables替换表格呈现
- 继续时间线


2014-06-08
- 时间线插件前期准备工作


2014-06-07
- 添加用户页


2014-06-06
- 表格模式下可以Ajax修改CI配置信息
- 优化表格模式下切换编辑状态的一些细节，并增加disabled字段映射机制


2014-06-05
- 新增图形与表格之间切换功能
- 新增方法 setCellAttr/getCellAttr 在mxGraph
- 调整获取告警数据的数据格式


2014-06-04
- openChildTree.html新增根据告警级别过滤node机制
- openChildTree.html过滤效果由原来的隐藏改成半透明
- 在线编辑页面新增表格模式


2014-05-27
- tree.html处理如果是swimlane类型的处理
- 修改标签模式下value超出cell的边界自动换行
- 修改拖拽ci自动生成关系时关系不去重


2014-05-26
- openChildTree.html页面增加node过滤机制
- 修复ci右键配置信息的路由没有传参导致脚本错误不能正常使用
- 新增组的缩放样式调整


2014-05-25
- tree.html页面添加header
- 修改查看基础设施的展开模式
- 修复tree.html左侧树高过页面隐藏没有出现滚动条的bug
- 改版openChildTree.html页面
- 解决tree.html与openChildTree.html添加header后showDetail定位不准的bug


2014-05-23
- openChildTree.html页面cell左上角添加小圆的tips
- openChildTree.html动态写入title
- 修复tree.html更新tips的时候误把light当作tips的cell的bug
- 修改tree.html画布背景改为纯白色
- 修改tree.html与openChildTree.html双击不能修改cell value
- 修复tree.html与openChildTree.html右键菜单后clearSelection再触发菜单时cell找不到


2014-05-22 
- 新增openChildTree.html页面
- 修复click cell的时候执行addLight高亮后refresh画布导致cell里边的table td内容消失
- 优化在给cell高亮后使用orderCells方法把高亮cell移至底层以免使用挡住右上角的监控小图标
- 优化在monitor所有cell后使用orderCells把所有edges移至底层以免vertex变大后线的出处不美观
- 优化在click edge时加粗显示，以便用户知道已经点击到目标


2014-05-21
- 新增右键适应画布功能
- 新增tree.html页面
- 右侧accordion修改为配置信息与监控指标两个tab，并可以在两个tab之间来回切换


2014-05-20
- 新增右侧accordion，并把监控指标移到右侧accordion
- openView页面禁用默认设置enabled=false
- 改进ci不能拖拽进kpi的子cell
- 禁止右键kpi子cell的时候弹出菜单，并自动改为选择kpi的状态
- 新增基本图形与分类图标拖拽进cell的时候会自动改变cell的外观
- 新增标签模式与原始模式来回切换功能


2014-05-16
- 修复搜索页面IE浏览器不能显示组合视图以及显示出组合视图后不能搜索高亮的bug
- 修复搜索按钮随着左侧收起的时候自动靠左侧边界
- 修复拖拽CI或者KPI替换CELL的时候组内不管用的bug


2014-05-15
- 新增拖拽CI或者KPI到画布上的某个对象时可以捕捉到相应的对象
- 新增拖拽CI或者KPI到画布上任意一个对象时把被捕捉到的对象修改成相应的CI


2014-05-14
- 解决搜索页获取URL参数时没有decodeURIComponent的bug
- 解决IE下搜索页结果条目的图标高度超出变形
- 添加搜索ci后自动在组合视图里高亮


2014-05-13
- 继续制作搜索页
- 添加在线编辑打开视图后可以更新视图的功能


2014-05-12
- 新增主页面带query时会自动在默认展开画布打开视图
- 修复IE下outline.html/openView.html页面先执行onload而引起jQuery未定义报错
- 在线编辑画布新增更新视图功能，并把保存视图修改为创建视图
- openView打开视图页面新增一个随机告警功能
- 新增搜索页面，别把搜索结果自动生成组合视图


2014-05-09
- 可以在edge上创建关系
- 搜索结果不能全选的问题
- 添加路径搜索与单个cell搜索功能
- 在把cell上的粘贴功能转移到画布上
- 解决收起左侧面板的小按钮盖住拖拽图标预览图
- 基本图形的颜色修改为黑色


2014-05-08
- 保存、更新视图时为了解决传给后台svg数据比例错误需要恢复到原始大小，再适应大小
- 部分适应大小开始改用mxGraph自带的fit()方法
- 在线编辑画布可以打开已保存的视图
- 视图画布新增在新标签打开本视图功能
- 修改打开子节点时like关键字去掉左右两边的星号
- 修复组合视图焦点图大小比例小数点改用百分比解决无法使用HTML5控件问题
- 调整组合视图部分样式
- 拖拽多个图到画布时自动建立关系只查询第一个id的bug
- 新增导出xml文件的功能，仅支持HTML5浏览器
- 为解决占用ID修改后model.getCell查找不到cell改为遍历比对获取cell
- 新增快速随机布局、堆栈布局
- 修复视图关联出错问题
- 修改配置信息与监控指标分页时序号递增
- 左侧菜单新增展开隐藏功能


2014-05-07
- 新增清空画布功能
- 配置信息、监控指标合并到在线编辑画布


2014-05-06
- 分类属性的查看与修改
- 配置信息右键新增保存视图功能 
- 解决配置信息、监控指标下页签错乱问题
- 新增视图更新可以编辑xml以及修改公开或私有
- 修改打开子节点时kpi与ci的数据接口未区分开造成kpi错误调用ci的接口
- 新增打开本地xml文件功能
- 解决配置信息图标统一使用默认而没有根据相应分类的图标对应显示问题


2014-05-05
- 右键菜单添加删除、复制、剪切、粘贴功能
- 视图管理添加视图关联功能
- 视图管理添加查看视图URL功能
- 解决在线编辑分类图标与绘图图标鼠标移上缩略图top值计算错误导致不能显示缩略图的bug
- 解决在选中多个Cell时右键某个Cell会清楚其它Cell的选中状态，导致不能后续操作不能对原先以选中的Cell产生影响


2014-05-04
- 初始版本