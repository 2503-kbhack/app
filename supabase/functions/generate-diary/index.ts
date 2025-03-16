// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const API_KEY = Deno.env.get("GEMINI_API_KEY")
if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is required. check your .env file")
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

/*
 * method: POST
 * req: {
 *  transcript: string,   // 音声認識結果のテキスト
 * }
 */

Deno.serve(async (req) => {
  // メソッドチェック
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    })
  } 

  // パラメータチェック
  const { transcript } = await req.json();
  if (!transcript || typeof transcript !== "string" || transcript.trim().length === 0) {
    return new Response(
      JSON.stringify({ error: "transcript is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    )
  }

  // 日記データの生成
  const result =  await model.generateContent(`
      以下は、音声認識結果の文字起こしです。このデータをもとに、Markdown 形式でユーザーの日記を生成してください。

      ---
      ${transcript}
    `)
  const data = { text: result.response.text() }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/generate-diary' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
