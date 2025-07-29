import React from 'react'

const Wall = ({children, banner}: {children: React.ReactNode, banner: string}) => {
  return (
        <div
            className="flex-1 w-full relative overflow-hidden min-h-[calc(100vh-64px)] xs:min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-112px)] lg:min-h-[calc(100vh-160px)]"
            style={{
                clipPath: "polygon(4% 0%, 96% 0%, 96% 100%, 4% 100%)",
                backgroundImage: `url(${banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
                {children}
            </div>
        </div>
    );
}

export default Wall
