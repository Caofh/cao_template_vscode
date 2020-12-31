const vscode = require('vscode');

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
exports.activate = function (context) {
	require('./template/createTem')(context); // 获取当前路径
	require('./tpCli/tpCli')(context); // 获取当前路径


};

/**
 * 插件被释放时触发
 */
exports.deactivate = function () {
	console.log('您的扩展已被释放！')
};