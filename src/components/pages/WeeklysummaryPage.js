import { fetchDiaries } from "../../api/fetchDiaries";
import { useAuth } from "../../hooks/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, } from "react";
import useSWR from "swr";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = process.env.REACT_APP_SUPABASE_URL;

const WeeklySummary = () => {
  const { user, profile ,setIsLoading} = useAuth();
  const [comment, setComment] = useState('');
  const [diaries, setDiaries] = useState([]);
  const date = new Date().toLocaleDateString('ja-JP');
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneWeekAgoDate = oneWeekAgo.toLocaleDateString('ja-JP');

//profile.birth_dateを使って年齢を計算and誕生日かどうか判定
//profile.birth_dateの形式はyyyy-mm-dd
  const birth_date = profile.birth_date;
  const birth_year = birth_date.slice(0,4);
  const birth_month = birth_date.slice(5,7);
  const birth_day = birth_date.slice(8,10);
  const today = new Date();
  const today_year = today.getFullYear();
  const today_month = today.getMonth() + 1;
  const today_day = today.getDate();
  let age = today_year - birth_year;
  if (today_month < birth_month || (today_month === birth_month && today_day < birth_day)) {
    age--;
  }
  let is_birthday = false;
  if (today_month === birth_month && today_day === birth_day) {
    is_birthday = true;
  }
  console.log("age:", age);
  console.log("is_birthday:", is_birthday);
  const profileData = {
    nickname: profile.nickname,
    hobby : profile.hobby,
    occupation: profile.occupation,
    location: profile.location,
    age: age,
    is_birthday: is_birthday,
  };
  useEffect(() => {
    const getDiaries = async () => {
      const data = await fetchDiaries({
        author: user.id,
        startDate: oneWeekAgoDate,
        endDate: date,
        is_important: true,
       
      });
      console.log(data);
      const diaries = data.map((diary) => {
        return {  
          date: diary.date,
          title: diary.title,
          contents: diary.contents,
        };
      });
      
      diaries.sort((a, b) => new Date(a.date) - new Date(b.date));
      const diariesandprofiles = {diaries, profileData};
      console.log(diariesandprofiles);
      fetch(`${API_URL}/functions/v1/summerize-weekly-diary`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diariesandprofiles}),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to generate diary');
          }
          return response.json();
        })
        .then((data) => {
          setComment(data);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
  
    };
   getDiaries();
    console.log("Weekly Summary:", diaries);
  }, []);

// commentの中身
  // {
  //   "weeklySummary": "string",
  //   "weeklyReflection": "string",
  //   "comment": "string"
  // }
  return (
    <div>
      <h1>Weekly Summary</h1>
      <p>カイル君と１週間の振り返り🐬</p>
      <img src="/images/kairu_happy.gif" alt="可愛いイルカ" width={200} height={200} />
      <p>{comment.weeklySummary}</p>
      <p>{comment.weeklyReflection}</p>
      <p>{comment.comment}</p>
      <Link to="/home" className="button-link" style={{ marginTop: '1rem', display: 'inline-block' }}>ホームに戻る</Link>
    </div>
  );
}
export default WeeklySummary;    