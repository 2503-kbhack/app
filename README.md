# app
[![Netlify Status](https://api.netlify.com/api/v1/badges/db6a32e8-b245-4096-9b1c-a7f6971b668b/deploy-status)](https://app.netlify.com/sites/musical-bublanina-421477/deploys)

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
npx supabase start
npm run dev-functions
```

## 関数をデプロイする
事前に @ulxsth にプロジェクトへのアクセス権を申請してください。
```sh
npx supabase login
npx supabase functions deploy <function-name> --project-ref omxbtjfdqpkrvnqgjcnq
```
