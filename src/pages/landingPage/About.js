import React from 'react';

export default function About() {
  return (
    <>
      <div id="about" />
      <section className="mt-32 md:mt-48 pb-40 relative bg-gray-200">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: 'translateZ(0)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-200 fill-current"
              points="2560 0 2560 100 0 100"
            />
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="store-definition md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div
                data-aos="fade-up"
                className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blue-600"
              >
                <img
                  alt="..."
                  src="/static/img/3dStore.webP"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blue-600 fill-current"
                    />
                  </svg>
                  <p className="text-xl font-bold text-white">- 3D Store</p>
                  <p className="text-md font-light mt-2 text-white">
                    Platform can improve the accessibility of your online store,
                    create a great first impression, and simplify the user
                    experience for your customers.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div
                    className="relative flex flex-col mt-4"
                    data-aos="fade-up"
                  >
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-map" />
                      </div>
                      <p className="text-xl mb-1 font-semibold">
                        3D Navigation
                      </p>
                      <p className="mb-4 text-gray-600">
                        We feature 3D navigation by using your keyboard, or your
                        mouse.
                      </p>
                    </div>
                  </div>
                  <div
                    className="relative flex flex-col min-w-0"
                    data-aos="fade-up"
                  >
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-temperature-low" />
                      </div>
                      <p className="text-xl mb-1 font-semibold">
                        Device Temperature
                      </p>
                      <p className="mb-4 text-gray-600">
                        You can see the temperature, pression and humidity of
                        your devices live.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div
                    className="relative flex flex-col min-w-0 mt-4"
                    data-aos="fade-up"
                  >
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-laptop-house" />
                      </div>
                      <p className="text-xl mb-1 font-semibold">Runtime</p>
                      <p className="mb-4 text-gray-600">
                        Check for running updates, wherever you are.
                      </p>
                    </div>
                  </div>
                  <div
                    className="relative flex flex-col min-w-0"
                    data-aos="fade-up"
                  >
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-bell" />
                      </div>
                      <p className="text-xl mb-1 font-semibold">
                        Push Notifications
                      </p>
                      <p className="mb-4 text-gray-600">
                        We feature push notifications to update you about
                        devices even if you&apos;re not using the app.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
