import React from 'react'


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Hero.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Hero() {



    const slidesData = [
        {
          id: 1,
          image: 'https://i.imgur.com/QmAq1ti.jpeg', // Replace with an actual image URL
          title: 'Jujutsu Kaisen',
          description: 'A thrilling world where sorcerers battle curses that lurk in the shadows. Follow Yuji Itadori as he confronts the sinister Ryomen Sukuna.',
          learnMoreLink: '#',
          watchLink: '#',
        },
        {
          id: 2,
          image: 'https://i.pinimg.com/originals/38/74/26/387426ec32ba4b3c387ba7615c74ab47.jpg', // Replace with an actual image URL
          title: 'One Piece',
          description: 'Join Monkey D. Luffy and his pirate crew on an epic adventure to find the ultimate treasure, the One Piece, and become the Pirate King.',
          learnMoreLink: '#',
          watchLink: '#',
        },
        {
          id: 3,
          image: 'https://i.imgur.com/SmqtgYG.jpeg', // Replace with an actual image URL
          title: 'Dragon Ball',
          description: 'Witness Goku\'s journey from a powerful Saiyan warrior to Earth\'s greatest protector as he battles foes from across the universe.',
          learnMoreLink: '#',
          watchLink: '#',
        },
        {
          id: 4,
          image: 'https://i.imgur.com/QnHLea8.jpeg', // Replace with an actual image URL
          title: 'Attack on Titan',
          description: 'In a world where humanity is on the brink of extinction, Eren Yeager and his friends fight against giant man-eating Titans.',
          learnMoreLink: '#',
          watchLink: '#',
        },
        {
          id: 5,
          image: 'https://i.imgur.com/v22WXRZ.jpeg', // Replace with an actual image URL
          title: 'My Hero Academia',
          description: 'In a world where almost everyone has superpowers, young Izuku Midoriya trains to become the greatest hero of all time.',
          learnMoreLink: '#',
          watchLink: '#',
        },
      ];
      


  return (
    <div className='mt-20'>
      <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper caret-purple-600 bg-[#0f1120]"
    >
      {slidesData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative w-full h-[600px] flex flex-col items-center justify-center bg-gray-200">
            {/* Image */}
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover absolute top-0 left-0 z-0" />

            {/* Overlay Content */}
            <div className="relative z-10 bg-black bg-opacity-60 text-white w-full h-full flex items-center justify-between">
                <div className='flex flex-col items-center justify-center px-28'>
                    <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-lg mb-6">{slide.description}</p>

                    <div className="flex space-x-4">
                        {/* Learn More Button */}
                        <a
                        href={slide.learnMoreLink}
                        className="py-2 px-6 bg-white text-black font-medium rounded-md hover:bg-black hover:text-white transition duration-300"
                        >
                        Learn More
                        </a>
                        {/* Watch Button */}
                        <a
                        href={slide.watchLink}
                        className="py-2 px-6 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition duration-300"
                        >
                        Watch
                        </a>
                    </div>
                </div>
                <div className='p-20 w-full h-[600px]'>
                    <img src={slide.image} alt="" className='rounded-lg h-[600px] w-[500px]'/>
                </div>
              
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  )
}
