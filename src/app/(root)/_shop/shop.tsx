"use client";

import { useShop } from "@/hooks/useShop";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Ceiling from "./Ceiling";
import Exhibitor from "./Exhibitor";
import Floor from "./Floor";
import Wall from "./Wall";

export default function StallRoomSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const { data } = useShop();

  const slides = data ?? [];

  useEffect(() => {
    console.log("Shop data:", data);
    console.log("Current slide:", currentSlide);
    console.log("Current slide data:", slides[currentSlide]);
  }, [data, currentSlide, slides]);

  // Use data as the slides array, fallback to empty array if not loaded
  const totalSlides = slides.length;

  const nextSlide = useCallback(
    () => setCurrentSlide((p) => (p + 1) % totalSlides),
    [totalSlides]
  );

  const prevSlide = useCallback(
    () => setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides),
    [totalSlides]
  );

  const goToSlide = (i: number) => i !== currentSlide && setCurrentSlide(i);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "ArrowRight") nextSlide();
      else if (e.key === " ") {
        e.preventDefault();
        setAutoPlay(!autoPlay);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [autoPlay, nextSlide, prevSlide]);

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [currentSlide, autoPlay, nextSlide]);

  const currentSlideData = slides[currentSlide];

  // Early return if no data
  if (!slides.length) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-gray-600">Loading exhibitors...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-gray-100"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      key={currentSlide}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* Slide counter */}
        <div className="absolute top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4 right-2 xs:right-3 sm:right-4 z-50 flex justify-between items-center">
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium">
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

        {/* Slide content */}
        <div className="flex-1 relative">
          {/* Ceiling of the shop */}
          <Ceiling />

          {/* Wall or banner of the shop */}
          <Wall banner={currentSlideData?.banner}>
            <div className="flex flex-col">
              {/* Title on top of the wall - Hanging Name */}
              <div className="absolute z-[100] top-0 left-1/2 -translate-x-1/2">
                {/* Hanging Threads */}
                <div
                  className="thread absolute flex justify-center w-full"
                  style={{ top: 0 }}
                >
                  {/* Center thread */}
                  <div className="thread-line w-[2px] md:h-12 h-9 bg-gradient-to-b from-white/80 via-white/60 to-white/20 absolute left-1/2 -translate-x-1/2 shadow-sm"></div>
                  {/* Left thread */}
                  <div className="thread-line w-[2px] md:h-12 h-9 bg-gradient-to-b from-white/80 via-white/60 to-white/20 absolute left-9 -translate-x-1/2 shadow-sm"></div>
                  {/* Right thread */}
                  <div className="thread-line w-[2px] md:h-12 h-9 bg-gradient-to-b from-white/80 via-white/60 to-white/20 absolute right-9 -translate-x-1/2 shadow-sm"></div>
                </div>

                {/* Hanging Name Container */}
                <div className="hanging-container relative md:top-12 top-9">
                  <div className="w-[30%] min-w-[300px] h-20 bg-black/60 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl relative overflow-hidden">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>

                    {/* Hanging Points */}
                    <div className="absolute -top-1 left-8 w-2 h-2 bg-white/80 rounded-full shadow-lg"></div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/80 rounded-full shadow-lg"></div>
                    <div className="absolute -top-1 right-8 w-2 h-2 bg-white/80 rounded-full shadow-lg"></div>

                    {/* Floating Text */}
                    <div className="floating-text flex items-center justify-center h-full">
                      <div className="text-3xl md:text-5xl text-transparent font-extrabold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text drop-shadow-lg">
                        {currentSlideData?.name || "Loading..."}
                      </div>
                    </div>
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute -inset-4 pointer-events-none">
                    <div className="absolute top-2 left-4 w-1 h-1 bg-pink-400 rounded-full opacity-60 animate-ping"></div>
                    <div
                      className="absolute top-8 right-6 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-ping"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute bottom-4 left-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"
                      style={{ animationDelay: "2s" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Main Exhibitor Display */}
              <div className="w-full max-w-sm xs:max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto flex justify-center items-center mt-32 md:mt-40">
                {/* Single Exhibitor Card - Changes with slide */}
                <div className="flex justify-center">
                  <Exhibitor
                    key={`exhibitor-${currentSlide}`} // Force re-render on slide change
                    exhibitorId={currentSlideData?.ID} // Use current slide's exhibitor ID
                    isActive={true} // Current slide is always active
                    slideNumber={currentSlide + 1} // Pass current slide number
                    onSlideChange={(slideNum) => {
                      console.log(`Exhibitor interaction on slide ${slideNum}`);
                    }}
                  />
                </div>
              </div>


            </div>
          </Wall>

          {/* Floor of the shop */}
          <Floor />
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          disabled={totalSlides <= 1}
          className="absolute left-1 xs:left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-[999] bg-white/80 hover:bg-white text-gray-800 p-2 xs:p-3 sm:p-4 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
          disabled={totalSlides <= 1}
          className="absolute right-1 xs:right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-[999] bg-white/80 hover:bg-white text-gray-800 p-2 xs:p-3 sm:p-4 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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


        {/* Avatar and Table Overlay */}
        <div className="absolute h-full lg:w-[25vw] md:w-[40vw] bottom-4 right-2 z-[100] flex flex-1 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:right-auto">
          <div className="h-full w-full flex flex-col relative">
            {/* Image of the avatar */}
            <div className="absolute z-1 bottom-0 lg:left-[22%] md:left-[15%] max-sm:left-[24%]">
              <Image
                src="/avatar.png"
                alt="Avatar"
                width={230}
                height={220}
                className="lg:h-[52vh] md:h-[50vh] h-[60vh] max-sm:h-[42vh] sm:landscape:h-[45vh] sm:landscape:w-[10vw]"
                priority
              />
            </div>

            {/* Table Image as background */}
            <div className="absolute z-5 lg:bottom-[-65px] md:bottom-[-14vh] bottom-[-55px] sm:landscape:bottom-[-14vh] max-sm:left-[9%]">
              <Image
                src="/table.png"
                alt="Table"
                width={350}
                height={100}
                className="object-fit lg:h-[70vh] h-[90vh] md:h-[78vh] max-sm:h-[52vh] sm:landscape:h-[70vh] sm:landscape:w-[40vh]"
                priority
              />
            </div>

            {/* Logo on the table */}
            <div className="absolute z-10 bottom-0 md:bottom-[12vh] max-sm:bottom-[8vh] sm:landscape:bottom-[7vh] lg:left-[20%] md:left-[20%] max-sm:left-[27.5%]">
              <Image
                src="/opexn_logo.png"
                alt="Logo"
                width={120}
                height={50}
                className="object-fit lg:h-12 md:h-10 w-full max-sm:h-10 sm:landscape:h-[5vh] md:landscape:h-[4vh] md:landscape:w-[10vw]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
