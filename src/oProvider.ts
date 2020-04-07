import * as vscode from 'vscode';
import Tips from './Tips';

class oProvider implements vscode.CompletionItemProvider {
  constructor(private tips: Tips) {}

  getInfo(document: vscode.TextDocument, position: vscode.Position) {
    const curText = document.getText(
      new vscode.Range(position.with(undefined, 0), position)
    );
    let pos = position.line;
    let lineText = document.lineAt(pos);
    while (!this.tips.isParent(lineText.text) && pos >= 0) {
      pos = pos - 1;
      if (pos >= 0) {
        lineText = document.lineAt(pos);
      }
    }
    if (this.tips.endWith(curText, ':')) {
      if (pos < 0) {
        return [];
      } else {
        let showText = this.tips.getSnippet(
          this.tips.filterBlank(this.tips.tip.parent),
          this.tips.filterBlank(curText.split(':')[0])
        );
        if (showText?.optionalValue) {
          let content = [];
          for (let index = 0; index < showText?.optionalValue.length; index++) {
            const item = new vscode.CompletionItem(
              `${showText?.optionalValue[index].name}`,
              vscode.CompletionItemKind.Snippet
            );
            item.insertText = `'${showText?.optionalValue[index].name}'`;
            item.documentation = new vscode.MarkdownString(
              showText?.optionalValue[index].documentation
            );
            item.detail =
              'Echarts Snippets\n' + showText?.optionalValue[index].detail;
            content.push(item);
          }
          // this.tips.tip = showText;
          this.tips.curContent = content;
          return content;
        }
      }
    } else {
      return [];
    }
    return [];
  }

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): Thenable<vscode.CompletionItem[]> {
    return new Promise((resolve, reject) => {
      resolve(this.getInfo(document, position));
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
      // if (this.tips.endWith(curText, ':')) {
      //   if (pos < 0) {
      //     return resolve([]);
      //   } else {
      //     let showText = this.tips.getSnippet(
      //       this.tips.filterBlank(this.tips.tip.parent),
      //       this.tips.filterBlank(curText.split(':')[0])
      //     );
      //     if (showText?.optionalValue) {
      //       let content = [];
      //       for (
      //         let index = 0;
      //         index < showText?.optionalValue.length;
      //         index++
      //       ) {
      //         const item = new vscode.CompletionItem(
      //           `${showText?.optionalValue[index].name}`,
      //           vscode.CompletionItemKind.Snippet
      //         );
      //         item.insertText = `'${showText?.optionalValue[index].name}'`;
      //         item.documentation = new vscode.MarkdownString(
      //           showText?.optionalValue[index].documentation
      //         );
      //         item.detail =
      //           'Echarts Snippets\n' + showText?.optionalValue[index].detail;
      //         content.push(item);
      //       }
      //       this.tips.tip = showText;
      //       this.tips.curContent = content;
      //       return resolve(content);
      //     }
      //   }
      // } else {
      //   return resolve([]);
      // }
    });
  }

  // resolveCompletionItem(
  //   item: vscode.CompletionItem,
  //   token: vscode.CancellationToken
  // ): Thenable<vscode.CompletionItem> {
  //   return new Promise((resolve, reject) => {
  //     // let content = this.tips.curContent[1];
  //     resolve(item);
  //   });
  // }
}

export default oProvider;
