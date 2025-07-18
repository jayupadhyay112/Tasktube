import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyAZTEN7EFkaNyUdKKREV0Oi9pU5hCrmUuw';

function App() {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const searchYouTube = async () => {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          maxResults: 20,
          key: API_KEY,
          q: query,
          type: 'video'
        }
      }
    );
    console.log(response);
    

    setVideos(response.data.items);
  };

  return (
    <div style={{ padding: '20px',justifyItems:'center'}}>
      <h2 style={{ background:'none', justifyContent:'center'}}>YouTube Video Search</h2>
      <div style={{
        justifyContent:'center',
        background:'none'
      }}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, width: '300px', margin:'6vmin',}}
      />
      <button onClick={searchYouTube} style={{ padding: 8, marginLeft: 10, borderRadius:'5px', border:'none', background:'white', fontSize:'16px' }}>
        Search
      </button>
      </div>

      <div style={{ marginTop: '20', width:'560' }}>
        {videos.map((video) => (
          <div key={video.id.videoId} style={{ marginBottom:'40', width:'77vmin', paddingBottom:'30px'}}>
            
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allowFullScreen
              title={video.snippet.title}
              style={{ display:'flex'}}
            ></iframe>
            <h4 style={{width:'auto'}}>{video.snippet.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
