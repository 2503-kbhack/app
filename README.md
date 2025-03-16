# app
## 事前準備
`.env.example` ファイルをコピーし、 `.env` に名前を変更します
その後、内容を [リンク先](https://discordapp.com/channels/@me/1347170944308744223/1347171158734409730) に合わせて変更してください

## 関数を作成する
```sh
npx supabase functions new <function-name>
```

`supabase/finctions` に対応する関数名のフォルダが作成されるため、`index.ts` の `Deno.serve` 内に動かしたいコードを書いてください。

## 関数をローカルで動作させる
```sh
npm run supabase:start
npm run edge:serve
```

あとは `http://127.0.0.1:54321/functions/v1/<function-name>` でリクエストが待ち受けられます。
単に動作をデバッグしたい場合は、以下のようなデバッグコマンドを使用してください。

```sh
npm run edge:<function-name>

# 例
npm run edge:generate-diary
```

## 関数をデプロイする
事前に @ulxsth にプロジェクトへのアクセス権を申請してください。
```sh
npx supabase login
npx supabase functions deploy <function-name> --project-ref omxbtjfdqpkrvnqgjcnq
```
