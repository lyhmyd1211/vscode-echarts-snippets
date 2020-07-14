'use strict';
import * as vscode from 'vscode';
let ec = require('../snippets/basic.json');
import Tips from './Tips';
import TipsProvider from './provider';
import opProvider from './oProvider';
import hProvider from './hoverProvider';
let config;
export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "echarts-snippets" is now active!'
  );
  // config = vscode.workspace.getConfiguration('Tips');
  const tips = new Tips();
  const provider = new TipsProvider(tips);
  const oProvider = new opProvider(tips);
  const hoverProvider = new hProvider(tips);
  let providerDisposable = vscode.languages.registerCompletionItemProvider(
    {
      scheme: 'file',
      language: 'vue',
    },
    provider
  );
  context.subscriptions.push(providerDisposable);

  let oProviderDisposable = vscode.languages.registerCompletionItemProvider(
    {
      scheme: 'file',
      language: 'vue',
    },
    oProvider,
    ':'
  );
  context.subscriptions.push(oProviderDisposable);

  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      {
        scheme: 'file',
        language: 'vue',
      },
      hoverProvider
    )
  );
}
export function deactivate() {}
