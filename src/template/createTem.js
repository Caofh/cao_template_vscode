const vscode = require('vscode');
const exec = require('child_process').exec;
const fs = require('fs')

// 获取组件目录(模版池子)
var template = require('./common/templateList')

var connectText = '-文件类型:'

// 展示模版列表方法
function showTemList(list, path) {
  vscode.window.showQuickPick([...list]).then(selectedMatch => {
    // 如果没有选择任何一项，selectedMatch为undefined
    if (!selectedMatch) { return }

    let temName = selectedMatch.label
    if (temName === '选择自定义私有模版') {

      // 获取用户输入
      getInput('请输入私有模版名称').then((name) => {
        createTem(name, path)
      })

    } else {
      createTem(temName, path)
    }

  });
}

// 生成模版方法
function createTem(name, path) {
  const nameOrigin = name.split(connectText)[0]

  // 获取用户输入
  getInput('请输入生成文件名，注：最好指定文件后缀').then((fileName) => {

    let terminalMessage = `tp_c -n ${fileName} -f ${nameOrigin} -p ${path}`
    exec(terminalMessage)

    vscode.window.showInformationMessage(`模版生成中`);
    let loop = setInterval(() => {
      fs.access(`${path}/${fileName}`, (err) => {
        if (err) {
          // vscode.window.showInformationMessage(`文件不存在`);
        } else {
          vscode.window.showInformationMessage(`模版生成完毕`);
          clearInterval(loop)
        }
      })
    }, 500)
    // 6s后取消interval定时
    setTimeout(() => {
      clearInterval(loop)
    }, 10000)
  })

}

// 获取用户输入字符串方法
function getInput(placeHolder = '请输入') {
  return new Promise((resolve, reject) => {
    vscode.window.showInputBox(
      { // 这个对象中所有参数都是可选参数
        password: false, // 输入内容是否是密码
        ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
        placeHolder: placeHolder, // 在输入框内的提示信息
        // prompt: '请输入', // 在输入框下方的提示信息
      }).then(function (name) {
        resolve(name)
      });
  })
}

module.exports = function (context) {
  context.subscriptions.push(vscode.commands.registerCommand('extension.getCurrentFilePath', (uri) => {

    let path = uri.path // 当前选择文件夹的路径
    // vscode.window.showInformationMessage(`${JSON.stringify(vscode.workspace.workspaceFolders)}`);

    template.getTemplates().then((templateList) => {
      // console.log(templateList)

      templateList.map((item) => {
        const suffix = item.template_address.split('.').slice(-1)[0]

        item.label = item.template_name ? `${item.template_name}${connectText}${suffix}` : ''
      })
      templateList.push({ label: '选择自定义私有模版' })

      showTemList(templateList, path)

    })

  }));
};