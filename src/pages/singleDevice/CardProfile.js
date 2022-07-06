/* eslint-disable react/prop-types */
import React from 'react';

export default function CardProfile({ data }) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 mt-8 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
        <div className="px-6">
          <div className="text-center mt-12">
            <h5 className="leading-normal mb-2 text-gray-800 mb-2">
              Device Name
            </h5>
            <h1 className="text-xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
              {data?.name}
            </h1>
          </div>
          <div className="mt-10 py-10 border-t border-gray-300 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 leading-relaxed text-gray-800">
                  {data?.additionalInfo?.description || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
