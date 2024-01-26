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