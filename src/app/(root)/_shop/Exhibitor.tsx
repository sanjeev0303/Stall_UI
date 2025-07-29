"use client"

import { useShop } from '@/hooks/useShop'
import { ExhibitorData } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


type ExhibitorProps = {
  exhibitorId?: number // Optional: to show specific exhibitor
  title?: string
  description?: string
  category?: string
  isActive?: boolean
  slideNumber?: number // This will determine which exhibitor to show from the array
  onSlideChange?: (slideNumber: number) => void // Optional callback for slide changes
}

const Exhibitor = ({
  exhibitorId,
  description = "Innovative solutions for modern challenges",
  category = "Technology",
  isActive = false,
  slideNumber = 1,
  onSlideChange
}: ExhibitorProps) => {

  const { data, loading, error } = useShop()
  const [isHovered, setIsHovered] = useState(false)
  const [exhibitorData, setExhibitorData] = useState<ExhibitorData | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      if (exhibitorId !== undefined) {
        // Find specific exhibitor by ID
        const specificExhibitor = data.find((item: ExhibitorData) => item.ID === exhibitorId)
        setExhibitorData(specificExhibitor || null)
      } else if (slideNumber && slideNumber > 0) {
        // Use slideNumber to determine which exhibitor to show (1-based index)
        const exhibitorIndex = slideNumber - 1
        if (exhibitorIndex < data.length) {
          setExhibitorData(data[exhibitorIndex])
        } else {
          // If slideNumber exceeds data length, cycle back to beginning
          setExhibitorData(data[exhibitorIndex % data.length])
        }
      } else {
        // Default to first exhibitor
        setExhibitorData(data[0])
      }
    }
  }, [data, exhibitorId, slideNumber])

  const handleVisit = () => {
    if (exhibitorData) {
      router.push(`/exhibitor/${exhibitorData.ID}`)
      console.log("Visiting exhibitor:", exhibitorData.name)

      // Trigger slide change callback if provided
      if (onSlideChange && slideNumber) {
        onSlideChange(slideNumber)
      }
    }
  }

  const handleInfo = () => {
    if (exhibitorData) {
      // You can implement info modal or redirect to info page
      console.log("Exhibitor info:", exhibitorData)
      console.log("Current slide number:", slideNumber)
      console.log("Total exhibitors available:", data?.length || 0)
    }
  }

  // Debug: Log when exhibitor data changes
  useEffect(() => {
    if (exhibitorData) {
      console.log(`Slide ${slideNumber} - Showing exhibitor:`, exhibitorData.name, `(ID: ${exhibitorData.ID})`)
    }
  }, [exhibitorData, slideNumber])

  // Loading state
  if (loading) {
    return (
      <div className="relative bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border-2 border-gray-200 w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-sm mx-auto">
        <div className="animate-pulse">
          <div className="h-24 xs:h-28 sm:h-32 md:h-36 lg:h-40 bg-gray-200 rounded-t-lg"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-200 rounded flex-1"></div>
              <div className="h-8 w-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="relative bg-red-50 border-2 border-red-200 rounded-lg shadow-lg w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-sm mx-auto p-4">
        <div className="text-red-600 text-sm text-center">
          <div className="text-2xl mb-2">⚠️</div>
          <div>Failed to load exhibitor data</div>
        </div>
      </div>
    )
  }

  // No data state
  if (!exhibitorData) {
    return (
      <div className="relative bg-gray-50 border-2 border-gray-200 rounded-lg shadow-lg w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-sm mx-auto p-4">
        <div className="text-gray-500 text-sm text-center">
          <div className="text-2xl mb-2">📭</div>
          <div>No exhibitor data available</div>
        </div>
      </div>
    )
  }

  // Get category from funding type or use default
  const displayCategory = exhibitorData.fundingInfo?.fundingType || category

  // Use exhibitor's products for description if available
  const displayDescription = exhibitorData.products?.length > 0
    ? exhibitorData.products.map(p => p.title).join(', ')
    : description

  return (
    <div
      className={`relative bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border-2 cursor-pointer w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-sm mx-auto hover:bg-white/95 transition-all duration-300 ${
        isHovered ? 'scale-105 shadow-2xl border-blue-400' : 'border-gray-200'
      } ${isActive ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Badge */}
      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full z-10">
        {displayCategory}
      </div>

      {/* Banner/Logo Section */}
      <div className="relative h-24 xs:h-28 sm:h-32 md:h-36 lg:h-40 w-full overflow-hidden rounded-t-lg">
        {exhibitorData.banner ? (
          <Image
            src={exhibitorData.banner}
            alt={`${exhibitorData.name} banner`}
            width={500}
            height={500}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient if image fails to load
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : null}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          {exhibitorData.logo ? (
            <Image
              src={exhibitorData.logo}
              alt={`${exhibitorData.name} logo`}
              width={100}
              height={100}
              className="max-w-16 max-h-16 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl">🏢</div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          #{slideNumber}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-2 xs:p-3 sm:p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 relative flex-shrink-0 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {exhibitorData.logo ? (
              <Image
                src={exhibitorData.logo}
                alt={`${exhibitorData.name} logo`}
                className="w-full h-full object-cover"
                width={500}
                height={500}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <span className="text-sm xs:text-lg sm:text-xl">🏪</span>
            )}
          </div>
          <h3 className="font-semibold text-xs xs:text-sm sm:text-base text-gray-800 truncate leading-tight">
            {exhibitorData.name}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {displayDescription}
        </p>

        {/* Additional Info */}
        {exhibitorData.address && (
          <div className="text-xs text-gray-500 truncate">
            📍 {exhibitorData.address.city}, {exhibitorData.address.state}
          </div>
        )}

        {exhibitorData.revenueInfo && (
          <div className="text-xs text-green-600 font-medium">
            💰 {exhibitorData.revenueInfo.revenueBracket}
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          <button
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm py-1.5 px-2 xs:px-3 rounded transition-colors"
            onClick={handleVisit}
          >
            Visit Booth
          </button>
          <button
            className="px-2 xs:px-3 py-1.5 border border-gray-300 hover:border-gray-400 text-gray-700 text-xs sm:text-sm rounded transition-colors"
            onClick={handleInfo}
            title="More Info"
          >
            ℹ️
          </button>
        </div>
      </div>

      {/* Hover Effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-lg shadow-lg bg-blue-400/10" />
          <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-blue-400 rounded-tl" />
          <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-blue-400 rounded-tr" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-blue-400 rounded-bl" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-blue-400 rounded-br" />
        </div>
      )}

      {/* Status Indicator */}
      <div className={`absolute top-2 left-2 w-2 h-2 rounded-full z-10 ${
        isActive ? 'bg-green-400' : 'bg-gray-400'
      }`} />
    </div>
  )
}

export default Exhibitor
