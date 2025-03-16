async function testGenerateDiary() {
  console.log("Start testGenerateDiary");
  const url = "http://localhost:54321/functions/v1/generate-diary";

  const payload = {
    text: `
      今日は朝から天気が良く、気分がとても良かった。久しぶりに早起きできたので、近くの公園まで散歩に行った。春の訪れを感じる暖かい風が吹いていて、桜のつぼみも少しずつ開き始めていた。
      散歩の後、カフェでコーヒーを飲みながら本を読んだ。最近読んでいるのは、自己成長についての本で、特に「毎日少しずつでも行動することが大切」という言葉が印象に残った。これを実践するために、今日から日記をちゃんと書くことにしようと思う。
      午後はプログラミングの勉強をした。音声文字起こしの機能を実装するために、Gemini API を使って試してみた。結果はまずまずだったけど、まだ調整が必要そうだ。マイクの認識精度を上げるために、もう少しパラメータを調整しよう。
      夜は友達と通話しながらゲームをしてリラックス。やっぱり、気の合う人と話すのは楽しい。明日も充実した一日にしよう。
    `.trim() };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log("Response:", data);
  } catch (err) {
    console.error("Error testing create-diary Edge Function:", err);
  }
}

testGenerateDiary();