"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    title: "The Last Kingdom",
    description: "Epic battles, royal betrayals, and a fight for legacy.",
    image:
      "https://images.squarespace-cdn.com/content/v1/64639805a247a84851f6dbb1/13a7e9be-8dbc-406d-9078-6b6bfd6512eb/The+Last+Kingdom+S2.jpg?format=1000w",
  },
  {
    id: 2,
    title: "Oppenheimer",
    description: "The story behind the man who changed history forever.",
    image: "https://pbs.twimg.com/media/FvnRS1tXwAMZTN-.jpg",
  },
  {
    id: 3,
    title: "Everything Everywhere All at Once",
    description: "A multiverse chaos of action, emotion, and humor.",
    image:
      "https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1491/2022/07/17004218/maxresdefault.jpg",
  },
  {
    id: 4,
    title: "Dune: Part Two",
    description: "Destiny unfolds on the sands of Arrakis.",
    image:
      "https://w0.peakpx.com/wallpaper/698/845/HD-wallpaper-dune-part-two-imax-films-2024-poster.jpg",
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="container relative mx-auto h-[75vh] my-12 overflow-hidden rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-gray-700">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="relative h-full w-full">
            <Image
              src={banner.image}
              alt={banner.title}
              layout="fill"
              objectFit="cover"
              className="brightness-75"
            />
            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 to-transparent">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
                {banner.title}
              </h1>
              <p className="text-white text-lg md:text-xl max-w-xl mb-6">
                {banner.description}
              </p>
              <button className="inline-flex items-center border-2 border-[#5799EF] text-[#5799EF] font-semibold px-6 py-3 rounded-full shadow-lg cursor-pointer">
                <Play className="mr-2" size={20} /> Watch Trailer
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handlePrev}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 z-20"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 z-20"
      >
        <ChevronRight className="text-white" />
      </button>
    </section>
  );
}
