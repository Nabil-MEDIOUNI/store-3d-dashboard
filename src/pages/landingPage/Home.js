import React from 'react';

export default function Home() {
  return (
    <section
      id="home"
      className="landing-section1 header relative pt-16 items-center flex h-screen max-h-860-px"
      data-aos="zoom-out"
    >
      <div className="container mx-auto items-center flex flex-wrap">
        <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
          <div className="pt-32 sm:pt-0">
            <h2 className="font-semibold text-4xl text-gray-700">
              - 3D Store.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              The platform mainly focuses on the use of 3D in the web in the
              context of the industry of the future, and more particularly on
              its use in the recovery of sensor data on industrial systems.
            </p>
            <div className="mt-12">
              <a
                href="/dashboard"
                className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <img
        className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
        src="/static/img/abstergo.webP"
        alt="..."
      />
      <img
        className="store-image absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
        src="/static/img/3d-store.webP"
        alt="..."
      /> */}
    </section>
  );
}
