import React from 'react';

export default function ErrorComponent({ status, errorMsg }: { status?: string; errorMsg?: string }) {
  return (
    <div className="text-center">
      <p className="text-xl text-indigo-600">{status || 'Something went wrong'}</p>
      <h1 className="mt-4  tracking-tight text-gray-900">Please try again in a bit</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">{errorMsg}</p>
    </div>
  );
}
