import * as vscode from 'vscode';
import Tips from './Tips';
import TipsProvider from './provider';
import opProvider from './oProvider';
class hoverProvider implements vscode.HoverProvider {
  constructor(private tips: Tips) {}
  provider = new TipsProvider(this.tips);
  oProvider = new opProvider(this.tips);
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Thenable<vscode.Hover> {
    return new Promise((resolve, reject) => {
      let a = this.provider.getInfo(document, position, 'match');
      let b = this.oProvider.getInfo(document, position);
      if (a[0].label) {
        resolve(new vscode.Hover(a[0].detail || ''));
      } else if (b[0].label) {
        resolve(new vscode.Hover(b[0].detail || ''));
      } else {
        reject('no data');
      }
    });
  }
}

export default hoverProvider;
