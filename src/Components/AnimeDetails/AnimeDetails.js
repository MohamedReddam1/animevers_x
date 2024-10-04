import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { FaPlay, FaBookmark } from 'react-icons/fa';

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedAnimes, setRelatedAnimes] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 10;

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(response.data.data);

        const genreIds = response.data.data.genres.map(genre => genre.mal_id);
        
        // Fetch related animes based on genre and filter duplicates
        const relatedResponse = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreIds.join(',')}&limit=10`);
        const uniqueRelatedAnimes = relatedResponse.data.data.filter(
          (relatedAnime) => relatedAnime.mal_id !== response.data.data.mal_id
        ).slice(0, 4); // Limit to 4

        setRelatedAnimes(uniqueRelatedAnimes);

        // Fetch episodes
        const episodesResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}/episodes`);
        setEpisodes(episodesResponse.data.data);
      } catch (error) {
        console.error("Error fetching anime details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  // Pagination logic for episodes
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);
  const totalPages = Math.ceil(episodes.length / episodesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <div className="fade-in mx-auto p-28 bg-[#0f1120] text-white pt-32">
        {anime ? (
          <div className="bg-[#0f1120] p-6 rounded-lg shadow-md">
            
            <div className="flex flex-col md:flex-row">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full md:w-[300px] rounded-lg mb-4 md:mr-4"
              />
              <div className="md:w-3/4 text-start px-20">
                <h1 className="text-4xl font-bold mb-4 text-white">{anime.title}</h1>
                <p className="text-gray-400 mb-4">{anime.synopsis}</p>
                <p className="font-semibold text-white mt-10 text-lg mb-3">Genres:</p>
                <ul className="mb-4">
                  {anime.genres.map((genre) => (
                    <li key={genre.mal_id} className="inline-block mr-2 bg-gray-700 rounded px-2">
                      {genre.name}
                    </li>
                  ))}
                </ul>
                <p className="font-semibold text-white">Status: {anime.status}</p>
                <p className="font-semibold text-white">Aired: {anime.aired.string}</p>
                <p className="font-semibold text-white">Rating: {anime.rating}</p>
              </div>
            </div>

            {/* Episodes Section */}
            <div className="mt-28">
              <h2 className="text-4xl uppercase tracking-[5px] font-semibold text-white text-start mb-10">Episodes</h2>
              <ul className="space-y-2">
                {currentEpisodes.map((episode) => (
                  <li key={episode.mal_id} className="flex justify-between bg-[#16181d] p-4 rounded-lg">
                    <span className="text-white">{episode.title}</span>
                    <Link to={`/anime/${id}/episodes/${episode.mal_id}`} className="text-[#e033e0] hover:underline">
                      Watch
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`py-2 px-4 rounded-md ${currentPage === index + 1 ? 'bg-[#e033e0] text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Related Anime Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4 text-[#e033e0]">Related Animes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedAnimes.map((relatedAnime) => (
                  <div
                    key={relatedAnime.mal_id}
                    className="relative h-[350px] bg-[#16181d] rounded-lg group overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl"
                  >
                    <img
                      src={relatedAnime.images.jpg.image_url}
                      alt={relatedAnime.title}
                      className="w-full h-full object-cover bg-transparent transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-white">
                      <h2 className="text-sm font-semibold truncate">
                        {relatedAnime.title.length > 20 ? `${relatedAnime.title.substring(0, 20)}...` : relatedAnime.title}
                      </h2>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-4">
                        <button className="bg-[#e033e0] text-xl text-white py-2 px-3 rounded-md hover:bg-[#d02ecc] hover:scale-110 duration-200 ease-in-out flex items-center">
                          <FaBookmark />
                        </button>
                        <Link
                          to={`/anime/${relatedAnime.mal_id}`}
                          className="bg-transparent border text-xl border-white text-white py-2 px-3 rounded-md hover:bg-white hover:scale-110 duration-200 ease-in-out hover:text-[#0f1120] flex items-center"
                        >
                          <FaPlay />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>No anime details found.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AnimeDetails;
