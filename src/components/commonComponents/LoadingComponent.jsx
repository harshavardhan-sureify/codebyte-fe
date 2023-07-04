import React from 'react'
import { LoadingContainer } from '../Styles';
import { CircularProgress, Typography } from '@mui/material';

export const LoadingComponent = () => {
  return (
      <LoadingContainer>
          <CircularProgress />
          <Typography variant="subtitle">Loading</Typography>
      </LoadingContainer>
  );
}
