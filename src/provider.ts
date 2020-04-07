import * as vscode from 'vscode';
import Tips from './Tips';

class TipsProvider implements vscode.CompletionItemProvider {
  constructor(private tips: Tips) {}

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): Thenable<vscode.CompletionItem[]> {
    return new Promise((resolve, reject) => {
      const curText = document.getText(
        new vscode.Range(position.with(undefined, 0), position)
      );
      let pos = position.line;
      let lineText = document.lineAt(pos);
      let parent = '';
      while (!this.tips.isParent(lineText.text) && pos >= 0) {
        pos = pos - 1;
        if (pos >= 0) {
          lineText = document.lineAt(pos);
        }
      }
      if (pos < 0) {
        return resolve([]);
      } else {
        let showText = this.tips.getSnippet(
          this.tips.filterBlank(this.tips.tip.parent),
          this.tips.filterBlank(curText)
        );
        const item = new vscode.CompletionItem(
          `${showText?.name}`,
          vscode.CompletionItemKind.Snippet
        );
        item.insertText = showText?.defaultValue || showText?.name;
        item.documentation = new vscode.MarkdownString(showText?.documentation);
        item.detail = 'Echarts Snippets\n' + showText?.detail;
        return resolve([item]);
      }

      // if (!result) {
      //   return resolve([]);
      // }
      // // 在匹配成功后提供 snippet 选项, 选中即转化 px => vw / vh
      // const item = new vscode.CompletionItem(
      //   `${result.pxValue}px => ${result.percentValueStr}`,
      //   vscode.CompletionItemKind.Snippet
      // );
      // item.insertText = result.percentValueStr;
      // return resolve([item]);
    });
  }
}

export default TipsProvider;
