
const vscode = require('vscode');
const fs = require('fs');
const utils = require('../utils');

/**
 * 从某个HTML文件读取能被Webview加载的HTML内容
 * @param {*} context 上下文
 * @param {*} templatePath 相对于插件根目录的html文件相对路径
 */
function getWebViewContent(context, templatePath) {



  const resourcePath = utils.getExtensionFileAbsolutePath(context, templatePath);
  let html = fs.readFileSync(resourcePath, 'utf-8');

  return html;
}

function getWebviewContent1() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
</body>
</html>`;
}

module.exports = function (context) {

  // 注册命令，可以给命令配置快捷键或者右键菜单
  // 回调函数参数uri：当通过资源管理器右键执行命令时会自动把所选资源URI带过来，当通过编辑器中菜单执行命令时，会将当前打开的文档URI传过来
  context.subscriptions.push(vscode.commands.registerCommand('extension.openTpCli', function (uri) {

    const panel = vscode.window.createWebviewPanel(
      'testWebview', // viewType
      "WebView演示", // 视图标题
      vscode.ViewColumn.One, // 显示在编辑器的哪个部位
      {
        enableScripts: true, // 启用JS，默认禁用
        retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
      }
    );

    // And set its HTML content
    panel.webview.html = getWebViewContent(context, 'src/tpCli/tpCli.html');
    // panel.webview.html = getWebviewContent1();

  }));
};