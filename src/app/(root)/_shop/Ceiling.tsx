import React from 'react'

const Ceiling = () => {
 return (
         <div
             className="w-full h-2 xs:h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18 bg-gray-700 relative overflow-hidden bg-gradient-to-tr from-pink-500 to-blue-600"
             style={{
                 clipPath: "polygon(0% 0%, 100% 0%, 96% 100%, 4% 100%)",
                //  backgroundImage: "url('/ceiling.jpg')",
                 backgroundSize: "cover",
                 backgroundPosition: "center",
             }}
         />
     );
}

export default Ceiling
