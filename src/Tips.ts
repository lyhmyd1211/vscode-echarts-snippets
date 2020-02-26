import config from './echarts_config/config';
class Tips {
  constructor() {}

  // private regPxVw: RegExp = /([-]?[\d.]+)pxw/;
  // private regPxVh: RegExp = /([-]?[\d.]+)pxh/;
  private regParent: RegExp = /.+(?=\s*:\s*{)/;

  tip: Tip = {
    parent: 'option',
    name: 'id',
    children: [],
    detail: ''
  };
  /**
   * 查找当前配置是否在配置文件中
   * @param config 配置文件列表
   * @param cur 当前配置名称
   */
  private isConfig(config: Tip[], cur: string): Tip | null {
    for (let index = 0; index < config.length; index++) {
      const element = config[index];
      if (element.name.indexOf(cur) > -1) {
        return element;
      } else if (element.children.length > 0) {
        return this.isConfig(element.children, cur);
      }
    }
    return null;
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
  getSnippet(parent: string, curName: string) {
    let pConfig = this.isConfig(config, parent);
    if (pConfig) {
      return this.isConfig(pConfig.children, curName);
    }
  }
}

export default Tips;
