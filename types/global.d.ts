declare module 'styles-config/globals.css';
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
// global.d.ts
declare module '*.css';
