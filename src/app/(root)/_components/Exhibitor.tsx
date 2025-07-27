import Image from 'next/image'
import React from 'react'

const Exhibitor = () => {
  return (
    <div>

 {/* Table Image as background */}
        <div className="exhibitor absolute z-[100]">
            <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-0">
          <Image
            src={"/table.png"}
            alt="Table"
            width={350}
            height={100}
            className="object-contain lg:h-[18vh] h-[16vh] sm:landscape:h-[18vh] sm:landscape:w-[40vh]"
            priority
          />
        </div>

        {/* Avatar */}
        <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[3.5rem]">
          <Image
            src={"/avatar.png"}
            alt="avatar"
            height={220}
            width={230}
            className="object-contain lg:h-[32vh] md:h-[30vh] h-[28vh] max-sm:h-[22vh] sm:landscape:h-[25vh] sm:landscape:w-[10vw]"
            priority
          />
        </div>
        </div>

    </div>
  )
}

export default Exhibitor
