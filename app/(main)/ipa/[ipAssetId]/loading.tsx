'use client';
import React from 'react';
import { BeatLoader } from 'react-spinners';

export default function loading() {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <BeatLoader color="#6366f1" />
    </div>
  );
}
