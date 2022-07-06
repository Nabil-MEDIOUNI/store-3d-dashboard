import React from 'react';

import CardStats from './CardStats';

export default function HeaderStats({ showstats, device }) {
  return (
    <>
      <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              {showstats && (
                <>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Temperature"
                      statTitle={`${device?.temperature?.value || '0'} %`}
                      statIconName="fas fa-temperature-high"
                      statIconColor="bg-red-500"
                    />
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Pressure"
                      statTitle={`${device?.pressure?.value || '0'} %`}
                      statIconName="fas fa-chart-pie"
                      statIconColor="bg-orange-500"
                    />
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Humidity"
                      statTitle={`${device?.humidity?.value || '0'} %`}
                      statIconName="fas fa-water"
                      statIconColor="bg-pink-500"
                    />
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Battery"
                      statTitle={`${device?.battery?.value || '0'} %`}
                      statIconName="fas fa-battery-three-quarters"
                      statIconColor="bg-blue-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
