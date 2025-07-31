"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Define interfaces for type safety
interface ProductImage {
  url: string;
}

interface Product {
  ID: number;
  title: string;
  category: string;
  productType: string;
  price: number;
  quantity: number;
  tags?: string;
  images?: ProductImage[];
}

interface RevenueInfo {
  revenueBracket: string;
  userImpact: number;
}

interface FundingInfo {
  fundingType: string;
}

interface Director {
  directorName: string;
}

interface SPOC {
  Name: string;
  Email: string;
}

interface CompanyData {
  name: string;
  banner?: string;
  logo?: string;
  websiteURL?: string;
  products?: Product[];
  revenueInfo?: RevenueInfo;
  fundingInfo?: FundingInfo;
  director?: Director;
  spoc?: SPOC;
}

const Stall = () => {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/startup/1');
        if (!response.ok) {
          throw new Error('Failed to fetch company data');
        }
        const data: CompanyData = await response.json();
        setCompanyData(data);
      } catch (err) {
        // Properly handle the unknown error type
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) {
    return (
      <div className="w-screen min-h-dvh flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen min-h-dvh flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-dvh relative overflow-hidden">
      {/* Board for the company name */}
      <div className="w-full h-[20vh] ">
        <div className="flex flex-col w-full items-center">
          <div className=" lg:w-[50vw] max-sm:w-[60vw] md:w-[60vw] lg:h-8 h-5 flex justify-between sm:landscape:w-[50vw]">
            <div className="h-full w-[3px] bg-black"></div>
            <div className="h-full w-[3px] bg-black"></div>
          </div>
          <div className="bg-white h-[10vh] lg:w-[65vw] max-sm:w-[80vw] md:w-[80vw] flex justify-center items-center sm:landscape:w-[70vw]">
            <div className="lg:text-5xl text-xl text-black">{companyData?.name || "Company Name"}</div>
          </div>
        </div>
      </div>

      {/* This is the space for the company banner */}
      <div className="w-full h-[20vh] ">
        <div className="bg-gray-500 flex justify-center items-center h-full w-full relative overflow-hidden">
          {companyData?.banner ? (
            <Image
              src={companyData.banner}
              alt="Company Banner"
              fill
              className="object-cover"
            />
          ) : (
            <div className="lg:text-3xl">Company Banner</div>
          )}
        </div>
      </div>

      {/* This is the space for the company content */}
      <div className="min-h-[60vh] w-full flex flex-col lg:flex-row">
        {/* Left side of shop screen */}
        <div className="h-full lg:w-[75vw] md:w-[60vw] max-sm:w-full sm:landscape:w-[82vw]">
          <div className="w-full h-full flex">
            {/* Left tilted lines */}
            <div className="w-[calc(20%+5px)] h-full flex flex-col justify-between max-sm:hidden">
              {/* Top tilt line */}
              <div className="lg:w-[calc(100%+7px)] h-[1.4px] bg-black md:w-[calc(100%+20px)] lg:origin-left lg:rotate-[12.8deg] md:origin-left md:rotate-[35deg]" />

              {/* Bottom tilt line */}
              <div className="lg:w-[calc(100%+7px)] h-[1.4px] bg-black lg:origin-left lg:-rotate-[12.8deg] md:origin-left md:-rotate-[35deg] md:w-[calc(100%+20px)]" />
            </div>

            {/* Left vertical line */}
            <div className="w-[2px] h-full bg-black max-sm:hidden"></div>

            {/* Products display space */}
            <div className="w-full min-h-[60vh] my-[60px] ml-[-2px] flex max-sm:ml-0 max-sm:my-4">
              <div className="w-full h-full flex flex-col border-t-[1.5px] border-b-[1.5px] border-l-[1px] border-r-[0px] border-black max-sm:border-none p-4">
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
                  {companyData?.products?.map((product) => (
                    <div key={product.ID} className="border rounded-lg p-4 bg-white shadow-sm">
                      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                      
                      {/* Product Image */}
                      {product.images && product.images.length > 0 && (
                        <div className="mb-3">
                          <Image
                            src={product.images[0].url}
                            alt={product.title}
                            width={200}
                            height={150}
                            className="w-full h-32 object-cover rounded"
                          />
                        </div>
                      )}
                      
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Category:</span> {product.category}</p>
                        <p><span className="font-medium">Type:</span> {product.productType}</p>
                        <p><span className="font-medium">Price:</span> ₹{product.price?.toLocaleString()}</p>
                        <p><span className="font-medium">Quantity:</span> {product.quantity}</p>
                        {product.tags && (
                          <p><span className="font-medium">Tags:</span> {product.tags}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Company Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Company Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Website:</span> 
                      {companyData?.websiteURL && (
                        <a href={companyData.websiteURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                          {companyData.websiteURL}
                        </a>
                      )}
                    </p>
                    <p><span className="font-medium">Revenue:</span> {companyData?.revenueInfo?.revenueBracket}</p>
                    <p><span className="font-medium">User Impact:</span> {companyData?.revenueInfo?.userImpact?.toLocaleString()}</p>
                    <p><span className="font-medium">Funding:</span> {companyData?.fundingInfo?.fundingType}</p>
                    <p><span className="font-medium">Director:</span> {companyData?.director?.directorName}</p>
                    <p><span className="font-medium">Contact:</span> {companyData?.spoc?.Name} ({companyData?.spoc?.Email})</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full w-[3px] bg-black mr-[1px] max-sm:hidden"></div>
          </div>
        </div>

        {/* Right side with avatar and table */}
        <div className="h-full lg:w-[25vw] md:w-[40vw] relative flex flex-1 max-sm:h-[40vh]">
          <div className="h-full w-full flex flex-col relative">
            <div className="block md:hidden md:h-0 md:w-0 max-sm:left-[30%] relative">
              <Button size={"lg"} className="text-lg mt-10 px-5">
                Enter Exhibition
              </Button>
            </div>

            {/* Image of the avatar */}
            <div className="absolute z-10 bottom-0 lg:left-[22%] md:left-[15%] max-sm:left-[24%]">
              <Image
                src={"/avatar.png"}
                alt="avatar"
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

            {/* Company Logo on the table */}
            <div className="absolute z-10 bottom-0 md:bottom-[12vh] max-sm:bottom-[8vh] sm:landscape:bottom-[7vh] lg:left-[20%] md:left-[20%] max-sm:left-[27.5%]">
              {companyData?.logo ? (
                <Image
                  src={companyData.logo}
                  width={120}
                  height={50}
                  alt="company logo"
                  className="object-contain lg:h-12 md:h-10 w-full max-sm:h-10 sm:landscape:h-[5vh] md:landscape:h-[4vh] md:landscape:w-[10vw]"
                />
              ) : (
                <Image
                  src={"/opexn_logo.png"}
                  width={120}
                  height={50}
                  alt="logo"
                  className="object-fit lg:h-12 md:h-10 w-full max-sm:h-10 sm:landscape:h-[5vh] md:landscape:h-[4vh] md:landscape:w-[10vw]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stall;
