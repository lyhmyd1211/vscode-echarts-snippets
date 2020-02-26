// type Tip = {
//   parent: string;
//   name: string;
//   children: Tip[];
//   detail: string;
// };
import doc from './documentation';
const ecConfig: Tip[] = [
  {
    name: 'option',
    parent: '',
    detail: '',
    children: [
      {
        name: 'title',
        parent: 'option',
        children: [
          {
            name: 'id',
            parent: 'title',
            children: [],
            detail:
              '组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。'
          },
          {
            name: 'textStyle',
            parent: 'title',
            children: [
              {
                name: 'color',
                parent: 'textStyle',
                children: [],
                detail: '主标题文字的颜色。\ndefault = "#333"'
              },
              {
                name: 'fontStyle',
                parent: 'textStyle',
                children: [],
                detail: `主标题文字字体的粗细\n
                default= 'normal'\n
                可选：\n
                'normal'\n
                'bold'\n
                'bolder'\n
                'lighter'\n
                100 | 200 | 300 | 400...`
              }
            ],
            detail: `主标题样式。\n
              所有属性\n
              { color , fontStyle , fontWeight , fontFamily , fontSize , lineHeight , width , height , textBorderColor , textBorderWidth , textShadowColor , textShadowBlur , textShadowOffsetX , textShadowOffsetY , rich }`
          }
        ],
        detail: '标题组件，包含主标题和副标题。',
        documentation: doc['option_title']
      }
    ]
  }
];
export default ecConfig;
