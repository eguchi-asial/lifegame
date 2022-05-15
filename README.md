# setting

```
%npm install
%npm run dev
```

# memo

tsc -w的なことをwebpackで実現したかったが、うまい方法が見つからず。

 `webpack-dev-server` を使えばtsファイルの変更時にtscしてbundle.jsまで持っていってくれるらしい。

 (これまでは `npx http-server` で組み込みサーバ起動していた)

## htmlのwatch

module/rulesに.htmlを追加し、raw-loaderを追記しても、そもそもindex.htmlがwebpackから見えないため変更検知されず。

html-webpack-pluginを使えば解決できた。html-webpack-pluginなら、変更検知もbundle.jsの読み込みも自動でやってくれる。