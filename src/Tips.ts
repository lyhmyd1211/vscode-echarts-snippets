import config from './echarts_config/config';
import * as vscode from 'vscode';
class Tips {
  constructor() {}

  // private regPxVw: RegExp = /([-]?[\d.]+)pxw/;
  // private regPxVh: RegExp = /([-]?[\d.]+)pxh/;
  private regParent: RegExp = /.+(?=\s*:\s*{)/;

  tip: Tip = {
    parent: 'option',
    name: '',
    children: [],
    detail: ''
  };
  curContent: vscode.CompletionItem[] = [
    new vscode.CompletionItem('正在加载', vscode.CompletionItemKind.Snippet)
  ];
  curItem: vscode.CompletionItem = new vscode.CompletionItem(
    '正在加载',
    vscode.CompletionItemKind.Snippet
  );
  /**
   * 查找当前配置是否在配置文件中
   * @param config 配置文件列表
   * @param cur 当前配置名称
   */
  private isConfig(
    config: Tip[],
    cur: string,
    model?: 'contain' | 'match'
  ): Tip {
    for (let index = 0; index < config.length; index++) {
      const element = config[index];
      if (model === 'match') {
        if (element.name === cur) {
          return element;
        } else if (element.children.length > 0) {
          return this.isConfig(element.children, cur, model);
        }
      } else {
        if (element.name.indexOf(cur) > -1) {
          return element;
        } else if (element.children.length > 0) {
          return this.isConfig(element.children, cur, model);
        }
      }
    }
    return this.tip;
  }

  /**
   *
   * @param text
   */
  isParent(text: string) {
    const isMatch = text.match(this.regParent) || [];
    this.tip.parent = isMatch[0];
    const isPatten = isMatch.length > 0;
    return isPatten;
  }
  filterBlank(text: string) {
    return text.replace(/\s+/g, '');
  }
  getSnippet(
    parent: string,
    curName: string,
    model?: 'contain' | 'match'
  ): Tip {
    let pConfig = this.isConfig(config, parent, model);
    if (pConfig) {
      return this.isConfig(pConfig.children, curName, model);
    }
    return this.tip;
  }
  endWith(str: string, end: string) {
    if (
      end === null ||
      end === '' ||
      end.length === 0 ||
      end.length > str.length
    ) {
      return false;
    }
    return str.substring(str.length - end.length) === end;
  }
}

export default Tips;
