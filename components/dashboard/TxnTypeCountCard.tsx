import React from 'react';
import CardContainer from '../cards/CardContainer';

export default function TxnTypeCountCard({ name, count }: { name: string; count: string }) {
  return (
    <CardContainer>
      <h1 className="text-sm sm:text-xl pt-4">{name}</h1>
      <p className="text-center text-5xl py-5">{count}</p>
    </CardContainer>
  );
}
