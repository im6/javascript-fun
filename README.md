# JavaScript.Fun ![](https://github.com/im6/javascript-fun/workflows/build/badge.svg)

Source code generator for [www.javascript.fun](https://www.javascript.fun/)

<p align="center">
  <img width="800" height="292.7" src="https://github.com/im6/javascript-fun/blob/master/assets/screenshot.png" title="www.JavaScript.Fun">
</p>

## Quick Start

create `.env` file for DB connections.

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
