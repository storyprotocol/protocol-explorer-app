import React from 'react';
import Grid from '../Grid/Grid';
import SkeletonCard from './SkeletonCard';

export default function SkeletonGrid({
  number = 15
}) {
  return (
    <Grid>
      {new Array(number).fill(0).map((_, id) => {
        return <SkeletonCard key={id} />;
      })}
    </Grid>
  );
}
