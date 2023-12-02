/* eslint-disable import/no-default-export */
declare module '*.scss' {
  type Styles = Record<string, string>;

  const content: Styles;
  export default content;
}
