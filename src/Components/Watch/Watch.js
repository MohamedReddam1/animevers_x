import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { FaPlay, FaBookmark, FaBolt, FaLaugh, FaGlobe, FaMagic } from 'react-icons/fa';
import { TbCategory2 } from "react-icons/tb";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const AnimeListPage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAnimeList = async () => {
    try {
      setLoading(true);
      const endpoint = filter
        ? `https://api.jikan.moe/v4/anime?q=${filter}&page=${page}&limit=25`
        : `https://api.jikan.moe/v4/anime?page=${page}&limit=25`;

      const response = await axios.get(endpoint);

      if (response.data && response.data.data) {
        setAnimeList(response.data.data);
        setTotalPages(response.data.pagination.last_visible_page);
      }
    } catch (error) {
      console.error('Error fetching anime list', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeList();
  }, [page, filter]);

  const filteredAnimeList = animeList
    .filter(anime => !categoryFilter || anime.genres.some(genre => genre.name === categoryFilter))
    .filter(anime => Math.round(anime.score / 2) >= ratingFilter);

  const categories = [
    { name: 'Action', icon: <FaBolt /> },
    { name: 'Adventure', icon: <FaGlobe /> },
    { name: 'Comedy', icon: <FaLaugh /> },
    { name: 'Fantasy', icon: <FaMagic /> },
  ];

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0f1120] z-50">
          <LoadingSpinner />
        </div>
      )}

      <Navbar />
      <div className={`fade-in flex p-20 pt-32 bg-[#0f1120] ${loading ? 'pointer-events-none opacity-50' : ''}`}>
        <aside className="w-1/4 bg-[#121429] p-10 h-fit shadow-lg rounded-xl border-gray-800 sticky top-32">
          <h2 className="text-lg uppercase tracking-widest font-semibold mb-4 text-[#e033e0]">Search</h2>
          <input
            type="text"
            placeholder="Search anime..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-2 bg-[#0f1120] text-white border border-gray-600 rounded-md mb-4 outline-none focus:border-[#e033e0]"
          />

          <h3 className="text-lg font-semibold text-[#e033e0] mb-5 mt-5 uppercase tracking-widest">Categories</h3>
          <ul className="space-y-3 text-start">
            <li>
              <Link
                to="#"
                onClick={() => setCategoryFilter('')}
                className="text-white hover:text-[#e033e0] flex items-center"
              >
                <TbCategory2 className='mr-2'/>
                All Categories
              </Link>
            </li>
            {categories.map(category => (
              <li key={category.name}>
                <Link
                  to="#"
                  onClick={() => setCategoryFilter(category.name)}
                  className={`flex items-center space-x-2 text-white hover:text-[#e033e0] ${categoryFilter === category.name ? 'text-[#e033e0]' : ''}`}
                >
                  {category.icon} <span>{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <main className="w-3/4 p-6 bg-[#0f1120] text-white">
          <h1 className="text-3xl font-semibold text-white mb-10 uppercase tracking-[10px]">Anime List</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAnimeList.length > 0 ? (
              filteredAnimeList.map(anime => (
                <div
                  key={anime.mal_id}
                  className="relative h-[350px] bg-[#16181d] rounded-lg group overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl"
                >
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-full h-full object-cover bg-transparent transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-white">
                    <h2 className="text-sm font-semibold truncate">
                      {anime.title.length > 20 ? `${anime.title.substring(0, 20)}...` : anime.title}
                    </h2>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <button className="bg-[#e033e0] text-xl text-white py-2 px-3 rounded-md hover:bg-[#d02ecc] hover:scale-110 duration-200 ease-in-out flex items-center">
                        <FaBookmark />
                      </button>
                      <Link
                        to={`/animevers_x/anime/${anime.mal_id}`}
                        className="bg-transparent border text-xl border-white text-white py-2 px-3 rounded-md hover:bg-white hover:scale-110 duration-200 ease-in-out hover:text-[#0f1120] flex items-center"
                      >
                        <FaPlay />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No anime found.</div>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="bg-[#0f1120] text-white py-2 px-4 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg font-semibold text-[#e033e0]">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="bg-[#0f1120] text-white py-2 px-4 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AnimeListPage;
