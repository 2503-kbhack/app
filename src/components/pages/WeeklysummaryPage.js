import { fetchDiaries } from "../../api/fetchDiaries";
import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const WeeklySummary = () => {
  const { user, profile } = useAuth();
  const [diaries, setDiaries] = useState([]);
  const date = new Date().toLocaleDateString('ja-JP');
  console.log("Today:", date);

  useEffect(() => {
    const getDiaries = async () => {

      // 一週間前の日付を取得
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const oneWeekAgoDate = oneWeekAgo.toLocaleDateString('ja-JP');
      const data = await fetchDiaries({
        author: user.id,
        startDate: oneWeekAgoDate,
        endDate: date,
        is_important: true,
       
      });
      const diarieslist = data.map((diary) => {
        return {
          date: diary.date,
          title: diary.title,
          contents: diary.contents,
        };
      });
      
      diarieslist.sort((a, b) => new Date(a.date) - new Date(b.date));
      console.log("Weekly Summary:", diarieslist);
      setDiaries(diarieslist);
    };
    getDiaries();
  }, []);
  return (
    <div>
      <h1>Weekly Summary</h1>
      <p>週間サマリー</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {diaries.map((diary) => (
          <div
            key={diary.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h2>{diary.title}</h2>
            <p>{diary.contents}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default WeeklySummary;    