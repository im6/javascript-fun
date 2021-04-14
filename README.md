# JavaScript.Fun ![cicd](https://github.com/im6/javascript-fun/actions/workflows/ci.yml/badge.svg)

Source code to generate [www.javascript.fun](https://www.javascript.fun/)

## Highlight

- Highly tailored project to render static page
- Deep modularized structure with `React.js` _SSR_ capability
- Lightest and fastest [front-end performance](https://developers.google.com/speed/pagespeed/insights/?url=www.javascript.fun&tab=desktop) with vanilla javascript code
- Seamless workflow with `webpack` and `babel`
- Admin capability with `cli` interface

## Quick Start

### Run app in local

```sh
yarn install
yarn dev
```

### Generate viewmodel

```sh
yarn build-misc
yarn collect
```

### Push to prod

```sh
yarn build
yarn render
yarn cp
```
