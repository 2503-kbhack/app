import { fetchDiaries } from "../../api/fetchDiaries";
import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
      
      console.log(diaries);
      fetch(`${API_URL}/functions/v1/summerize-weekly-diary`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diaries}),
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
      <p>{comment.weeklySummary}</p>
      <p>{comment.weeklyReflection}</p>
      <p>{comment.comment}</p>
    </div>
  );
}
export default WeeklySummary;    