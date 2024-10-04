import React from 'react'

export default function Features() {


    const featuresData = [
        {
          id: 1,
          title: "90s Anime",
          image: "https://i.imgur.com/JZkk02j.png",
          buttonText: "Discover More",
        },
        {
          id: 2,
          title: "Action Anime",
          image: "https://i.imgur.com/hEilKnR.png",
          buttonText: "Discover More",
        },
        {
          id: 3,
          title: "Sport Anime",
          image: "https://i.imgur.com/cckWfKq.png",
          buttonText: "Discover More",
        },
      ];


  return (
    <div>
      <div className="bg-[#0f1120] p-28 py-10">
      <h2 className="text-start text-3xl font-bold mb-12 text-white">
        Featured Collection
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {featuresData.map((feature) => (
          <div key={feature.id} className="p-14 group relative bg-[#181d34] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            {/* Image */}
            <img
              src={feature.image}
              alt={feature.title}
              className="w-[600px] object-cover"
            />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-xl font-semibold mb-4">{feature.title}</h3>

              <button className="py-2 px-6 bg-purple-600 text-white font-medium rounded-md shadow-md hover:bg-purple-700 transition-all duration-300">
                {feature.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
