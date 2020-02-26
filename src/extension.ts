'use strict';
import * as vscode from 'vscode';
let ec = require('../snippets/basic.json');
import Tips from './Tips';
import TipsProvider from './provider';
let config;
export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "echarts-snippets" is now active!'
  );
  // config = vscode.workspace.getConfiguration('Tips');
  const tips = new Tips();
  const provider = new TipsProvider(tips);

  let providerDisposable = vscode.languages.registerCompletionItemProvider(
    {
      scheme: 'file',
      language: 'vue'
    },
    provider
  );
  context.subscriptions.push(providerDisposable);
}

export function deactivate() {}
