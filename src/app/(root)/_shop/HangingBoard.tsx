import { ExhibitorData } from "@/types";
import React from "react";

const HangingBoard = ({
  currentSlideData,
}: {
  currentSlideData: ExhibitorData;
}) => {
  return (
    <div>
      <div className="absolute z-[100] lg:top-[-34] top-0 left-1/2 -translate-x-1/2">
        {/* Hanging Threads */}
        <div
          className=" absolute flex justify-center w-full"
          style={{ top: 0 }}
        >
          {/* Left thread */}
          <div className=" w-[1px] sm:w-[2px] h-6 sm:h-8 md:h-10 lg:h-12 bg-gradient-to-b from-gray-700/80 via-gray-700/60 to-gray-700/20 absolute left-6 sm:left-8 md:left- -translate-x-1/2 shadow-sm" />
          {/* Right thread */}
          <div className="w-[1px] sm:w-[2px] h-6 sm:h-8 md:h-10 lg:h-12 bg-gradient-to-b from-gray-700/80 via-gray-700/60 to-gray-700/20 absolute right-6 sm:right-8 md:right-9 -translate-x-1/2 shadow-sm" />
        </div>

        {/* Hanging Name Container */}
        <div className=" relative md:top-12 top-9">
              <div className="w-[600px] md:w-[800px] lg:w-[1000px] min-w-[600px] h-20 bg-black/60 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl relative overflow-hidden mx-auto px-4 sm:px-8">

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />

            {/* Hanging Points */}

            <div className="absolute top-[30px] left-9 -translate-x-1/2 w-3 h-3 bg-white/80 rounded-full shadow-lg" />
            <div className="absolute top-[30px] right-5 -translate-x-1/2 w-3 h-3 bg-white/80 rounded-full shadow-lg" />

            {/* Floating Text */}
            <div className="flex items-center justify-center h-full">
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
    </div>
  );
};

export default HangingBoard;
