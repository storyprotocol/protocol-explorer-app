import React from 'react';
import CardContainer from '../cards/CardContainer';

export default function TxnTypeCountCard({
  name,
  icon,
  count,
}: {
  name: string;
  icon?: React.ReactNode;
  count: string;
}) {
  return (
    <CardContainer>
      <div className="flex flex-row text-xs sm:text-xl items-top gap-1 pt-4">
        <div className="hidden sm:block">{icon}</div>
        <h1 className="">{name}</h1>
      </div>
      <p className="text-center text-5xl py-5 font-bold">{count}</p>
    </CardContainer>
  );
}
