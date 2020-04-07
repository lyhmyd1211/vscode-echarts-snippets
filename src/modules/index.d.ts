interface Tip {
  parent: string;
  name: string;
  children: Tip[];
  detail: string;
  documentation?: string;
  defaultValue?: string;
  optionalValue?: Tip[];
  optionalDefault?: number;
}
