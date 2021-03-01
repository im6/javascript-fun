# JavaScript.Fun ![cicd](https://github.com/im6/javascript-fun/workflows/build/badge.svg)

Source code to generate [www.javascript.fun](https://www.javascript.fun/)

## Quick Start

```sh
yarn install
yarn build # generate collect build
yarn collect
```

## Publish

- bump the `version` in package.json, `no-commit`
- `yarn build` to get the latest client build
- `git` commit and push
- draft new version and release
- optional: `daily` task to update Github pages
