//textEmbeddingのテストコード
// async function textEmbedding() {
//     console.log("Start testSummerizeweeklyDiary");
//     const url = "http://localhost:54321/functions/v1/text-embedding";
  
//     const textsarray = ["昼ご飯は キーマカレーでした。","晩御飯は 中華 と韓国料理で量が多くて美味しかったです","散歩の後、カフェでコーヒーを飲みながら本を読んだ。最近読んでいるのは、自己成長についての本で、特に「毎日少しずつでも行動することが大切」という言葉が印象に残った。これを実践するために、今日から日記をちゃんと書くことにしようと思う。","夕方 眠かったので爆睡したら作業がすみませんでした","今日は朝9時半に起きました 昨日の晩 遅かったので とても眠いです"]
    
//     // const payload = {
//     //   text: textsarray[0]
//     //   .trim()
//     // };
  
//     // try {
//     //   const res = await fetch(url, {
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //     body: JSON.stringify(payload),
//     //   });
//     //   const data = await res.json();
//     //   console.log("Response:", data.embedding);
//     // } catch (err) {
//     //   console.error("Error :", err);
//     // }
//     const embeddings =  await Promise.all(textsarray.map(async (text) => {
//       const payload = {
//         text: text
//         .trim()
//       };
//       try {
//         const res = await fetch(url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         });
//         const data = await res.json();
//         return data.embedding;
//       } catch (err) {
//         console.error("Error :", err);
//       }
//     }
//     ));
//     console.log("Response:", embeddings);
//   }
  
//   textEmbedding();
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
