import React from 'react';

export default function GlobalLoader() {
  return (
    <>
      {navigator.onLine && (
        <div id="preloader">
          <div id="status">
            <div className="preloader" />
          </div>
        </div>
      )}
    </>
  );
}
