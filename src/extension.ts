// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
let ec = require('../snippets/basic.json');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "echarts-snippets" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.ecLine', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    // vscode.window.showInformationMessage('Hello World!');
    vscode.window.activeTextEditor.edit(editBuilder => {
      let editor = vscode.window.activeTextEditor;
      // check if there is no selection
      if (editor.selection.isEmpty) {
        // the Position object gives you the line and character where the cursor is
        const position = editor.selection.active;
        editBuilder.replace(
          new vscode.Range(position, position),
          ec['echarts-line-charts'].body.join('\n')
        );
      } else {
        editBuilder.replace(
          new vscode.Range(editor.selection.start, editor.selection.end),
          ec['echarts-line-charts'].body.join('\n')
        );
      }
    });
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
