# app
## 事前準備
supabase をローカルで動作させるため、Docker Desktop のインストールが必須になります。Windows の場合はこれに合わせて WSL のセットアップが必要になるため、合わせて行ってください。

参考：https://qiita.com/haveAbook/items/0d0ae20a19214f65e7cd

## デバッグ環境を構築する
アプリケーションをローカルで動かすことを目標にします。

### 依存関係をインストールする
アプリ内で使用されている各種ライブラリをインストールします。

```sh
npm clean-install
# または
npm ci
```

### 環境変数ファイルを作成する
`.env.example` をコピーし、名前を `.env` にしてください。
ここにセンシティブな情報（Gemini の API キー）を設置していくことになります。

### `SUPABASE_AUTH_EXTERNAL_DISCORD_SECRET` をセットする
discord アプリケーションのシークレットトークンになります。

[ここ](https://discordapp.com/channels/@me/1347170944308744223/1351187970790653962) に書いています。
（Organization 外の方で動作させたい方は @ulxsth に一言ください）

### `GEMINI_API_KEY` をセットする
これは個人で作成することになります。
[ここ](https://aistudio.google.com/prompts/new_chat?model=gemini-2.0-flash-lite-preview-0205&hl=ja) から Google アカウントでログインし、サイドメニュー → "Get API Key" → "APIキーを生成" から API キーを生成してください。

生成した API キーを `GEMINI_API_KEY` にセットしたら OK です。

### supabase の動作環境を作る
バックエンドは Supabase というサービスでまかなっていますが、ローカルで同じ環境を再現することによって、本番環境を汚さずに開発することができます。<br>
以下のコマンドから、初期セットアップを行ってください、

```sh
npm run supabase:start
```

処理には5分程度かかる場合があります。<br>
処理が終了したら、様々な環境変数がコンソールに表示されます。その中から `anon key` の項目をコピーし、`.env` の `REACT_APP_SUPABASE_ANON_KEY` にセットしてください。

これはオプションですが、不要になった場合はコンテナを止めておくことをお勧めします。（けっこう重たいので）

```sh
npm run supabase:stop
```

また、バックエンドサーバーの動作が遅いなどの場合は一度リロードすることをお勧めします。

```sh
npm run supabase:reload
```

### データベースを初期化する
`supabase start` した段階では、データベースは初期化されていません。以下のコマンドでデータベースを構築できます。

```sh
npm run db:reset
```

このコマンドは、データベースのデータを初期化したいときにも使えます。

### 関数をローカルで動作させる
Gemini などの機能を使用するためには、Edge Function 用のコンテナを起動する必要があります。React のサーバーを起動している場合は、新しくターミナルを開いて以下を実行して下さい。
```sh
npm run edge:dev
```

API は、デフォルトで認証による制限がついています。これは開発環境では邪魔になることが多いので、`edge:dev` では一時的に認証を外しています。<br>
認証ありでデバッグしたい場合は、以下を使用してください。
```sh
npm run edge:serve
```

### アプリケーションを起動する
最後に、React サーバーを起動します。

```sh
npm run start
```

起動すると、`http://localhost:3000` からアプリケーションにアクセスできます。<br>
認証や各機能が問題なく使えれば OK です。お疲れさまでした。

---
以下は開発者用オプションです。特別な理由がない限り、行う必要はありません。

### 関数を作成する
```sh
npx supabase functions new <function-name>
```

`supabase/finctions` に対応する関数名のフォルダが作成されるため、`index.ts` の `Deno.serve` 内に動かしたいコードを書いてください。

## 関数をデバッグする
`scripts/debug` にデバッグ用スクリプトをいくつか用意しています。デバッグにお役立てください。

```sh
npm run edge:<function-name>

#例
npm run edge:generate-diary
```

### 関数をデプロイする
事前に @ulxsth にプロジェクトへのアクセス権を申請してください。
```sh
npx supabase login
npx supabase functions deploy <function-name> --project-ref omxbtjfdqpkrvnqgjcnq
```
