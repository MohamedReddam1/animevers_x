import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const EpisodeWatchPage = () => {
  const { id, episodeId } = useParams();
  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeAndEpisodes = async () => {
      try {
        // Fetch anime details
        const animeResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(animeResponse.data.data);

        // Fetch all episodes
        const episodesResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}/episodes`);
        setEpisodes(episodesResponse.data.data);

        // Fetch selected episode details
        const episodeResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}/episodes/${episodeId}`);
        setCurrentEpisode(episodeResponse.data.data);
      } catch (error) {
        console.error('Error fetching episode details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeAndEpisodes();
  }, [id, episodeId]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <div className="fade-in mx-auto p-28 bg-[#0f1120] text-white pt-32 flex flex-col md:flex-row">
        {/* Episodes List */}
        <div className="w-full md:w-1/4 bg-[#16181d] p-6 rounded-lg shadow-md md:mr-4">
          <h2 className="text-2xl font-semibold mb-6 text-[#e033e0]">Episodes</h2>
          <ul className="space-y-2">
            {episodes.map((episode) => (
              <li key={episode.mal_id} className="flex justify-between bg-[#20232a] p-4 rounded-lg">
                <Link
                  to={`/anime/${id}/episodes/${episode.mal_id}`}
                  className={`text-white hover:underline ${
                    episode.mal_id === parseInt(episodeId) ? 'text-[#e033e0]' : ''
                  }`}
                >
                  {episode.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Episode Video and Details */}
        <div className="w-full md:w-3/4 bg-[#16181d] p-6 rounded-lg shadow-md">
          {currentEpisode ? (
            <div>
              <h2 className="text-3xl font-bold mb-4">{currentEpisode.title}</h2>
              <p className="text-gray-400 mb-6">{currentEpisode.synopsis}</p>

              {/* Placeholder for the video */}
              <div className="mb-6">
                {/* Assuming the API provides a URL, replace this placeholder */}
                <iframe
                  title={currentEpisode.title}
                  className="w-full h-[400px] rounded-lg"
                  src={currentEpisode.video_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ'} // Replace with the actual video URL if available
                  frameBorder="0"
                  allowFullScreen
                />
              </div>

                            {/* Additional episode details */}
                            <p className="font-semibold text-white">Aired: {currentEpisode.aired}</p>
              <p className="font-semibold text-white">Duration: {currentEpisode.duration}</p>
              <p className="font-semibold text-white">Episode: {currentEpisode.episode_number}</p>
            </div>
          ) : (
            <p>No episode details found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EpisodeWatchPage;

