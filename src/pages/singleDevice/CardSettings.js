/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import CardBarChart from '../dashboard/CardBarChart';

export default function CardSettings() {
  return (
    <div className="relative flex flex-col min-w-0 break-words mt-8 w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-gray-800 text-xl font-bold">Device Details</h6>
        </div>
      </div>
      <div className="flex flex-wrap">
        <CardBarChart />
      </div>
    </div>
  );
}
