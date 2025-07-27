// components/StallRoom/Exhibitor.jsx
"use client";
import { useState } from "react";
import Image from "next/image";

export default function Exhibitor1({
  title = "Sample Exhibitor",
  description = "Innovative solutions for modern challenges",
  imageSrc = "/placeholder-booth.jpg",
  logoSrc = "/placeholder-logo.jpg",
  category = "Technology",
  isActive = false
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`
        relative bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border-2
        transform transition-all duration-300 ease-in-out cursor-pointer
        w-full max-w-sm mx-auto
        ${isHovered ? 'scale-105 shadow-2xl border-blue-400' : 'border-gray-200'}
        ${isActive ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
        hover:bg-white/95
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Badge */}
      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full z-10">
        {category}
      </div>

      {/* Main Image */}
      <div className="relative h-32 sm:h-36 md:h-40 w-full overflow-hidden rounded-t-lg">
        {!imageError ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-blue-400 text-4xl">🏢</div>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-2">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
            <Image
              src={logoSrc}
              alt={`${title} logo`}
              fill
              className="object-cover"
              onError={() => {}}
            />
          </div>
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm py-1.5 px-3 rounded transition-colors duration-200">
            Visit Booth
          </button>
          <button className="px-3 py-1.5 border border-gray-300 hover:border-gray-400 text-gray-700 text-xs sm:text-sm rounded transition-colors duration-200">
            ℹ️
          </button>
        </div>
      </div>

      {/* Interactive Elements */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-lg shadow-lg bg-blue-400/10 animate-pulse" />

          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-blue-400 rounded-tl" />
          <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-blue-400 rounded-tr" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-blue-400 rounded-bl" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-blue-400 rounded-br" />
        </div>
      )}

      {/* Status Indicator */}
      <div className={`
        absolute top-2 left-2 w-2 h-2 rounded-full z-10
        ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}
      `} />
    </div>
  );
}
