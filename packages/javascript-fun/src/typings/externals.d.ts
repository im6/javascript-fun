declare module 'express';
declare module 'numeral';

declare module '*.less' {
  const classes: { [className: string]: string };
  export default classes;
}
declare module 'css-loader*.css' {
  const classes: { [className: string]: string };
  export default classes;
}
