// Supabase Runtime の型定義をインポート
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"
import { corsHeaders } from '../cors.ts'

// 環境変数から API キーを取得
const API_KEY = Deno.env.get("GEMINI_API_KEY")
if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is required. Check your .env file")
}

// GoogleGenerativeAI の初期化とモデル取得（埋め込みモデル）
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-embedding-exp-03-07" })

Deno.serve(async (req) => {
  // OPTIONS リクエストに対応
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200, headers: corsHeaders })
  }

  // POST メソッド以外は拒否
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  // リクエストボディのパースとバリデーション
<<<<<<< HEAD
  const { text } = await req.json()
  console.log("text", text)
=======
  const  {text}  = await req.json()
>>>>>>> 352e300fbb93c93b0803f5dc5acc72d311bb2abc
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return new Response(
      JSON.stringify({ error: "text is required" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }

  try {
    // テキストの埋め込みを取得
<<<<<<< HEAD
    console.log("Embedding content:", text)
=======

>>>>>>> 352e300fbb93c93b0803f5dc5acc72d311bb2abc
    const result = await model.embedContent(text)
    console.log("result:", result)
    const embedding = result.embedding.values
<<<<<<< HEAD
    console.log("Embedding:", embedding)
=======
    console.log("embedding:", embedding)
>>>>>>> 352e300fbb93c93b0803f5dc5acc72d311bb2abc

    return new Response(JSON.stringify({ embedding }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  } catch (error) {
    console.error("Error embedding content:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  }
})
