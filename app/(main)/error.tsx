'use client';

import React from 'react';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto flex justify-center items-center">
      <div className="text-center">
        <img src="/error.png" />
        <h2 className="text-4xl md:text-4xl">Error</h2>
        <h3 className="pt-2">Something’s wrong. Please reload the page.</h3>
        <button
          className="px-4 py-2 text-white bg-indigo-500 rounded-xl mt-5"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
