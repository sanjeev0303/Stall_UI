"use client";

export default function StallRoom() {
  return (
    <div
      className="relative w-screen min-h-screen bg-blue-400 flex flex-col justify-end overflow-hidden"
      style={{
        backgroundImage: "url('/sidewall.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Ceiling */}
      <div className="w-full h-[126px] bg-gray-700 [clip-path:polygon(0%_0%,_100%_0%,_91%_100%,_9%_100%)] border-t-4 border-b-4 border-slate-950"
        style={{
          backgroundImage: "url('/ceiling.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Wall */}
      <div className="flex-1 w-full h-[665px] [clip-path:polygon(9%_0%,_91%_0%,_91%_100%,_9%_100%)] relative"
        style={{
          backgroundImage: "url('/wall.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Floor */}
      <div className="relative w-full h-32 border-t-4 border-b-4 border-slate-950 bg-cover bg-center [clip-path:polygon(9%_0%,_91%_0%,_100%_100%,_0%_100%)] flex items-end"
        style={{
          backgroundImage: "url('/floor.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

    </div>
  );
}
