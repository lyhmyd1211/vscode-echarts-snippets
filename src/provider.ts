import * as vscode from 'vscode';
import Tips from './Tips';

class TipsProvider implements vscode.CompletionItemProvider {
  constructor(private tips: Tips) {}

  getInfo(
    document: vscode.TextDocument,
    position: vscode.Position,
    model: 'contain' | 'match'
  ) {
    // const curText = document.getText(
    //   new vscode.Range(position.with(undefined, 0), position)
    // );
    const curText = document.getText(document.getWordRangeAtPosition(position));
    let pos = position.line - 1;
    let lineText = document.lineAt(pos);
    while (!this.tips.isParent(lineText.text) && pos >= 0) {
      pos = pos - 1;
      if (pos >= 0) {
        lineText = document.lineAt(pos);
      }
    }
    if (pos < 0) {
      return [];
    } else {
      let showText: Tip = this.tips.getSnippet(
        this.tips.filterBlank(this.tips.tip.parent),
        this.tips.filterBlank(curText),
        model
      );
      const item = new vscode.CompletionItem(
        `${showText?.name}`,
        vscode.CompletionItemKind.Snippet
      );
      item.insertText = showText?.defaultValue || showText?.name;
      item.documentation = new vscode.MarkdownString(showText?.documentation);
      item.detail = 'Echarts Snippets\n' + showText?.detail;
      // this.tips.tip = showText;
      return [item];
    }
  }

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): Thenable<vscode.CompletionItem[]> {
    return new Promise((resolve, reject) => {
      resolve(this.getInfo(document, position, 'contain'));
      // const curText = document.getText(
      //   new vscode.Range(position.with(undefined, 0), position)
      // );
      // let pos = position.line;
      // let lineText = document.lineAt(pos);
      // while (!this.tips.isParent(lineText.text) && pos >= 0) {
      //   pos = pos - 1;
      //   if (pos >= 0) {
      //     lineText = document.lineAt(pos);
      //   }
      // }
      // if (pos < 0) {
      //   return resolve([]);
      // } else {
      //   let showText: Tip = this.tips.getSnippet(
      //     this.tips.filterBlank(this.tips.tip.parent),
      //     this.tips.filterBlank(curText)
      //   );
      //   const item = new vscode.CompletionItem(
      //     `${showText?.name}`,
      //     vscode.CompletionItemKind.Snippet
      //   );
      //   item.insertText = showText?.defaultValue || showText?.name;
      //   item.documentation = new vscode.MarkdownString(showText?.documentation);
      //   item.detail = 'Echarts Snippets\n' + showText?.detail;
      //   this.tips.tip = showText;
      //   return resolve([item]);
      // }
    });
  }
}

export default TipsProvider;
