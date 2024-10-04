import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import axios from 'axios';

//imported icons
import { FaPlay } from 'react-icons/fa';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoBookmark } from "react-icons/io5";

import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

export default function Popular() {
  const [animeData, setAnimeData] = useState([]);
  const [isBeginning, setIsBeginning] = useState(true);

  // Fetch Action Anime from Jikan API
  useEffect(() => {
    const fetchActionAnime = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/anime', {
          params: {
            genres: 1, // 1 is the genre ID for Action
            limit: 10, // Limit the response to 10 anime
          },
        });
        setAnimeData(response.data.data); // Storing anime data from API
      } catch (error) {
        console.error('Error fetching action anime', error);
      }
    };

    fetchActionAnime();
  }, []);

  return (
    <div>
      <div className='bg-[#0f1120] p-28 py-10'>
        <div className='text-start'>
          <h1 className='text-3xl font-bold text-white'>Most Popular Action Anime</h1>
        </div>
        <div className="relative w-full mt-10">
          <Swiper
            spaceBetween={20}
            slidesPerView={6}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
            }}
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {animeData.map((anime) => (
              <SwiperSlide key={anime.mal_id} className='rounded-lg'>
                <div className="relative h-[300px] rounded-lg group transition-transform duration-500 transform hover:scale-105 hover:z-10">
                  {/* Anime Image */}
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="w-full h-[200px] object-cover rounded-lg shadow-lg"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center rounded-lg p-4">
                    <h3 className="text-white text-lg font-bold mb-4">{anime.title}</h3>
                    <div className="flex space-x-4">
                      {/* Save Later Button */}
                      <button className="bg-[#e033e0] text-white py-2 px-5 rounded-md hover:bg-black hover:text-white text-center transition-transform transform hover:scale-110">
                        <IoBookmark className="" />
                      </button>
                      {/* Watch Now Button */}
                      <Link to={`/anime/${anime.mal_id}`} className="bg-white text-black py-2 px-5 rounded-md hover:bg-black hover:text-white text-center transition-transform transform hover:scale-110">
                        <FaPlay className="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className={`swiper-button-prev-custom absolute -left-10 top-1/2 transform -translate-y-1/2 text-3xl bg-gray-800 text-white p-2 rounded-full z-10 ${isBeginning ? 'hidden' : 'block'} transition-all duration-300 hover:bg-gray-600`}
          >
            <IoIosArrowBack />
          </button>

          <button className="swiper-button-next-custom absolute -right-10 top-1/2 transform -translate-y-1/2 text-3xl bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-600">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}
