import React from 'react'

const Ceiling = () => {
 return (
         <div
             className="w-full h-8 xs:h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 bg-gray-700 border-t-2 border-b-2 sm:border-t-4 sm:border-b-4 border-slate-950 relative overflow-hidden"
             style={{
                 clipPath: "polygon(0% 0%, 100% 0%, 96% 100%, 4% 100%)",
                 backgroundImage: "url('/ceiling.jpg')",
                 backgroundSize: "cover",
                 backgroundPosition: "center",
             }}
         />
     );
}

export default Ceiling
