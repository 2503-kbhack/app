async function testSummerizeweeklyDiary() {
  console.log("Start testSummerizeweeklyDiary");
  const url = "http://localhost:54321/functions/v1/summerize-weekly-diary";


  const payload = {
    diaries: `
      {date:"月曜日", title:"ゴルフ合宿", body:"今日はゴルフ合宿の1日目でした。慣れていないコースでのプレーは難しかったです。"},
      {date:"火曜日", title:"ゴルフ合宿", body:"今日はゴルフ合宿の2日目でした。コースに慣れてきたので、スコアも少し良くなりました。"},
      {date:"水曜日", title:"ゴルフ合宿", body:"今日はゴルフ合宿の3日目でした。最終日なので、気合いを入れてプレーしましたが、疲労が溜まりスコアが悪かったです。"},
      {date:"木曜日", title:"親戚の集まり", body:"今日は親戚の集まりがありました。久しぶりに会う親戚もいて、楽しい時間を過ごしました。いとこが思いのほか大きくなっていて驚きました。"},  
      {date:"金曜日", title:"プログラミング", body:"今日はハッカソンの準備でプログラミングをしました。gitのエラーに苦しんだり、デバッグに時間がかかったりしましたが、なんとか完成させることができました。"},
      {date:"土曜日", title:"ハッカソン", body:"今日はハッカソンの本番でした。チームで協力してアプリを作成しました。発表も無事終えることができ、満足のいく結果でした。"}, 

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
    console.error("Error testing summerize-weekly-diary Edge Function:", err);
  }
}

testSummerizeweeklyDiary();