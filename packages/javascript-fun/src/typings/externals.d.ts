declare module '*config';
declare module '*.less' {
  const classes: Record<string, string>;
  export default classes;
}

declare module 'css-loader*.css' {
  const classes: Record<string, string>;
  export default classes;
}
