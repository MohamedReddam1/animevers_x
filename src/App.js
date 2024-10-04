import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './Components/Homepage/Homepage';
import Watch from './Components/Watch/Watch';
import AnimeDetailPage from './Components/AnimeDetails/AnimeDetails';
import EpisodeWatchPage from './Components/EpisodeWatchPage/EpisodeWatchPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/animevers_x/" element={<Homepage />} />
          <Route path="/animevers_x/watch" element={<Watch />} />
          <Route path="/animevers_x/anime/:id" element={<AnimeDetailPage />} />
          <Route path="/animevers_x/anime/:id/episodes/:episodeId" element={<EpisodeWatchPage/>} />
          {/* 404 Not Found Route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
