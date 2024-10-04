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
          <Route path="/" element={<Homepage />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/anime/:id" element={<AnimeDetailPage />} />
          <Route path="/anime/:id/episodes/:episodeId" element={<EpisodeWatchPage/>} />
          {/* 404 Not Found Route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
