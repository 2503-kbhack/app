// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"
import { corsHeaders } from '../cors.ts'

const API_KEY = Deno.env.get("GEMINI_API_KEY")
if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is required. check your .env file")
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

/*
 * method: POST
 * req: {
 *   transcript: string,  // 1週間分の日記の音声認識結果のテキスト
 * }
 */

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200, headers: corsHeaders })
  }

  // メソッドチェック
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  // パラメータチェック
  const { diaries } = await req.json();
  if (!diaries || typeof diaries !== "string" || diaries.trim().length === 0) {
    return new Response(
      JSON.stringify({ error: "diaries is required" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }

  // 1週間分の日記データからサマリーの生成
  const result = await model.generateContent(`
      あなたは日記アプリ内のイルカのキャラクターです。ユーザーに優しい口調で語りかけます。
      ユーザー情報：nickname:いっさ age:20 occupation:大学生 hobby:ゴルフ、プログラミング
      ---
      以下は1週間分の日記の代表的な出来事の集合です。週末にその週に起こったを振り返ると共に締めくくりに一言コメントを添えてください。
      出力する形式は以下の [schema] に従ってください。
      最終的な出力は Result として定義されています。
      
      それ以外の内容は一切出力しないでください。
      ---
      ${diaries}
      ---
      [schema]
      summary = {
        "title": "string",
        "body": "string"
      }
      Result: 
    `)
    
  // 結果からコードブロック等を取り除く
  const formattedText = result.response.text().replace(/```json|```/g, "");

  let data;
  try {
    data = JSON.parse(formattedText);
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to parse JSON response" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  
  return new Response(
    JSON.stringify(data),
    {
      headers: {
        ...corsHeaders, "Content-Type": "application/json"
      }
    }
  )
})

/* To invoke locally:
  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:
  
curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/summerize-weekly-diary' \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"transcript":"ここに1週間分の日記のテキストを入れてください"}'
*/
