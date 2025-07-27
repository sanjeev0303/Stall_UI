"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";

// Ceiling Component - Fully Responsive
function Ceiling() {
  return (
    <div
      className="w-full h-8 xs:h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 bg-gray-700 border-t-2 border-b-2 sm:border-t-4 sm:border-b-4 border-slate-950 relative overflow-hidden"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 96% 100%, 4% 100%)",
        backgroundImage: "url('/ceiling.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
}

// Wall Component - Responsive with proper aspect ratios
function Wall({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex-1 w-full relative overflow-hidden min-h-[calc(100vh-64px)] xs:min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-112px)] lg:min-h-[calc(100vh-160px)]"
      style={{
        clipPath: "polygon(4% 0%, 96% 0%, 96% 100%, 4% 100%)",
        backgroundImage: "url('/wall.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 wall-responsive">
        {children}
      </div>
    </div>
  );
}

// Floor Component - Always touches bottom
function Floor() {
  return (
    <div
      className=" w-full h-8 xs:h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 border-t-2 border-b-2 sm:border-t-4 sm:border-b-4 border-slate-950 overflow-hidden
                sm:static sm:bottom-auto
                fixed bottom-0 left-0 right-0 z-30 sm:z-auto"
      style={{
        clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)",
        backgroundImage: "url('/floor.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

// Enhanced Exhibitor Component - Fully Responsive
function Exhibitor({
  title = "Sample Exhibitor",
  description = "Innovative solutions for modern challenges",
  category = "Technology",
  isActive = false,
  slideNumber = 1,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border-2 cursor-pointer w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-sm mx-auto hover:bg-white/95 ${
        isHovered ? "scale-105 shadow-2xl border-blue-400" : "border-gray-200"
      } ${isActive ? "ring-2 ring-blue-500 ring-opacity-50" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full z-10">
        {category}
      </div>

      <div className="relative h-24 xs:h-28 sm:h-32 md:h-36 lg:h-40 w-full overflow-hidden rounded-t-lg">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl">🏢</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          #{slideNumber}
        </div>
      </div>

      <div className="p-2 xs:p-3 sm:p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 relative flex-shrink-0 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            <span className="text-sm xs:text-lg sm:text-xl">🏪</span>
          </div>
          <h3 className="font-semibold text-xs xs:text-sm sm:text-base text-gray-800 truncate leading-tight">
            {title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex space-x-2 pt-2">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm py-1.5 px-2 xs:px-3 rounded">
            Visit Booth
          </button>
          <button className="px-2 xs:px-3 py-1.5 border border-gray-300 hover:border-gray-400 text-gray-700 text-xs sm:text-sm rounded">
            ℹ️
          </button>
        </div>
      </div>

      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-lg shadow-lg bg-blue-400/10" />
          <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-blue-400 rounded-tl" />
          <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-blue-400 rounded-tr" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-blue-400 rounded-bl" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-blue-400 rounded-br" />
        </div>
      )}

      <div
        className={`absolute top-2 left-2 w-2 h-2 rounded-full z-10 ${
          isActive ? "bg-green-400" : "bg-gray-400"
        }`}
      />
    </div>
  );
}

// Main StallRoom Slider Component
export default function StallRoomSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slides = [
    {
      title: "Tech Innovation Hub",
      description: "Cutting-edge AI and Machine Learning solutions",
      category: "Technology",
      icon: "💻",
    },
    {
      title: "Green Energy Expo",
      description: "Sustainable energy solutions for the future",
      category: "Energy",
      icon: "🔋",
    },
    {
      title: "Healthcare Solutions",
      description: "Advanced medical technologies and treatments",
      category: "Healthcare",
      icon: "🏥",
    },
    {
      title: "Financial Services",
      description: "Modern banking and fintech innovations",
      category: "Finance",
      icon: "💰",
    },
    {
      title: "Education Platform",
      description: "Digital learning and educational technologies",
      category: "Education",
      icon: "📚",
    },
    {
      title: "Food & Beverage",
      description: "Culinary innovations and food technology",
      category: "F&B",
      icon: "🍽️",
    },
    {
      title: "Fashion & Design",
      description: "Latest trends in fashion and creative design",
      category: "Fashion",
      icon: "👗",
    },
    {
      title: "Automotive Tech",
      description: "Electric vehicles and automotive innovations",
      category: "Automotive",
      icon: "🚗",
    },
    {
      title: "Travel & Tourism",
      description: "Explore new destinations and travel solutions",
      category: "Travel",
      icon: "✈️",
    },
    {
      title: "Sports & Fitness",
      description: "Athletic equipment and fitness technologies",
      category: "Sports",
      icon: "⚽",
    },
  ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (slideIndex: number) => {
    if (slideIndex === currentSlide) return;
    setCurrentSlide(slideIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      } else if (event.key === " ") {
        event.preventDefault();
        setAutoPlay(!autoPlay);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [autoPlay, nextSlide, prevSlide]);

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, autoPlay, nextSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-gray-100"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      key={currentSlide}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* Simple slide counter - responsive */}
        <div className="absolute top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4 right-2 xs:right-3 sm:right-4 z-50 flex justify-between items-center">
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium">
            <span className="mr-1 xs:mr-2">{currentSlideData.icon}</span>
            {currentSlide + 1} / {totalSlides}
          </div>

          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium ${
              autoPlay
                ? "bg-green-500/80 text-white hover:bg-green-600/80"
                : "bg-gray-500/80 text-white hover:bg-gray-600/80"
            }`}
          >
            {autoPlay ? "⏸️ Pause" : "▶️ Play"}
          </button>
        </div>

        {/* Slide content without transitions */}
        <div className="flex-1">
          <Ceiling />

          <Wall>
            <div className="w-full max-w-sm xs:max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto">
              {/* Simple slide title - responsive */}
              <div className="text-center mb-4 xs:mb-6 sm:mb-8">
                <div className="mb-2 xs:mb-3 sm:mb-4">
                  <span className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
                    {currentSlideData.icon}
                  </span>
                </div>
                <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-2 xs:mb-3 sm:mb-4 drop-shadow-lg border-b-2 xs:border-b-3 sm:border-b-4 border-blue-400/50 pb-1 xs:pb-2 inline-block">
                  {currentSlideData.title}
                </h1>
                <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 drop-shadow-sm font-medium px-2">
                  {currentSlideData.description}
                </p>
              </div>

              {/* Exhibitors without animations - responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item}>
                    <Exhibitor
                      title={`${currentSlideData.title} - Booth ${item}`}
                      description={currentSlideData.description}
                      category={currentSlideData.category}
                      isActive={item === 1}
                      slideNumber={currentSlide + 1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Wall>

          {/* Top-most overlay element */}
          <div className="overlay w-10 h-10 absolute top-0 left-0 bg-black z-[9999]"></div>

          <Floor />
        </div>

        {/* Simple navigation buttons - responsive */}
        <button
          onClick={prevSlide}
          className="absolute left-1 xs:left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-40 bg-white/80 hover:bg-white text-gray-800 p-2 xs:p-3 sm:p-4 rounded-full shadow-lg"
        >
          <svg
            className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-1 xs:right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-40 bg-white/80 hover:bg-white text-gray-800 p-2 xs:p-3 sm:p-4 rounded-full shadow-lg"
        >
          <svg
            className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Simple slide indicators - responsive */}
        <div className="absolute bottom-12 xs:bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-28 xl:bottom-32 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2 xs:space-x-3">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative ${
                index === currentSlide
                  ? "w-3 h-3 xs:w-4 xs:h-4 bg-blue-600 scale-125"
                  : "w-2 h-2 xs:w-3 xs:h-3 bg-gray-400 hover:bg-gray-600"
              } rounded-full border-2 border-white`}
              title={slide.title}
            >
              {index === currentSlide && (
                <span className="absolute -top-1 -left-1 text-xs">
                  {slide.icon}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Overlay positioned at bottom right - highest z-index */}
        <div
          className="absolute h-full lg:w-[25vw] md:w-[40vw] bottom-4 right-2 z-[9999] flex flex-1
          max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:right-auto"
        >
          <div className="h-full w-full flex flex-col relative">
            {/* Image of the avatar */}
            <div className="absolute z-1 bottom-0 lg:left-[22%] md:left-[15%] max-sm:left-[24%]">
              <Image
                src={"/avatar.png"}
                alt="erv"
                height={220}
                width={230}
                className="lg:h-[52vh] md:h-[50vh] h-[60vh] max-sm:h-[42vh] sm:landscape:h-[45vh] sm:landscape:w-[10vw]"
              />
            </div>

            {/* Table Image as background */}
            <div className="absolute z-5 lg:bottom-[-65px] md:bottom-[-14vh] bottom-[-55px] sm:landscape:bottom-[-14vh] max-sm:left-[9%]">
              <Image
                src={"/table.png"}
                alt="Table"
                width={350}
                height={100}
                className="object-fit lg:h-[70vh] h-[90vh] md:h-[78vh] max-sm:h-[52vh] sm:landscape:h-[70vh] sm:landscape:w-[40vh]"
              />
            </div>

            {/* Logo on the table */}
            <div className="absolute z-10 bottom-0 md:bottom-[12vh] max-sm:bottom-[8vh] sm:landscape:bottom-[7vh] lg:left-[20%] md:left-[20%] max-sm:left-[27.5%]">
              <Image
                src={"/opexn_logo.png"}
                width={120}
                height={50}
                alt="logo"
                className="object-fit lg:h-12 md:h-10 w-full max-sm:h-10 sm:landscape:h-[5vh] md:landscape:h-[4vh] md:landscape:w-[10vw]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
