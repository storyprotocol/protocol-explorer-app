import React from 'react';
import Grid from '../Grid/Grid';
import SkeletonCard from './SkeletonCard';

export default function SkeletonGrid() {
  return (
    <Grid>
      {new Array(15).fill(0).map((_, id) => {
        return <SkeletonCard key={id} />;
      })}
    </Grid>
  );
}
