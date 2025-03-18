import React ,{useState,useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';
import { fetchDiaries } from '../../api/fetchDiaries';
const DiaryDetailPage = (props) => {
  const { id } = useParams();
  const [diary, setDiary] = useState([]);

  
  useEffect(() => {
    // コンポーネントがマウントされた時に実行
    const getDiary = async () => {
      const data = await fetchDiaries({ id: id });
      if (data) {
        setDiary(data);
      }
    };

    getDiary();
  }, []);
  
  if (!diary[0]) {
    return <div>読み込み中</div>;
  }
  return (
    <div>
      <h1>{diary[0].title}</h1>
      <p>{diary[0].contents}</p>
      <Link to={`/diaries`}>Back to Diaries </Link>
      <br />
      <Link to={`/`}>Back to Home</Link>
      
     
    </div>

  );
};

export default DiaryDetailPage;