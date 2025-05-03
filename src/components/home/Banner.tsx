import React from 'react';
import Image from 'next/image';

const Banner: React.FC = () => {
  return (
    <div className="w-full h-[550px] relative mb-8">
      {/* Background Image */}
      <Image
        src="/banner.png"
        alt="Banner Background"
        fill
        style={{ objectFit: "fill" }}
        priority={true}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center text-white"
        style={{ backgroundColor: "rgba(39, 39, 39, 0.3)" }}
      >
        
      </div>
    </div>
  );
};

export default Banner;
