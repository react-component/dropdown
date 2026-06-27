// more config: https://d.umijs.org/config
import { defineConfig } from 'dumi';

const basePath = process.env.GH_PAGES ? '/dropdown/' : '/';
const publicPath = basePath;

export default defineConfig({
  favicons: ['https://avatars0.githubusercontent.com/u/9441414?s=200&v=4'],
  themeConfig: {
    name: 'rc-dropdown',
    logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  },
  outputPath: 'docs-dist',
  base: basePath,
  publicPath,
  exportStatic: {},
  styles: [
    `
      section.dumi-default-header-left  {
        width: 240px;
      }
    `,
  ],
});
