A template for Koa and Remix

## install
```
npm install
```

## development
```
npm run dev
```

## deploy
```
npm run build
```
After running `npm run build`, you can got three directory in the program root path: `/build`、 `/dist` and `/public/build`.
Run `node dist/app.js` to bootstrap the app. And you should remember to set the NODE_ENV to `production`, or you can run 
`npm run preview:prod` as well.

## description
`app`目录为Remix主目录
`src`目录为后端主目录
`types`目录为存放类型的目录，后续打算改为`shared`目录，用于存储前后端共享的代码