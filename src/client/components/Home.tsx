import { CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

export const Home: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title='Advent Of Code 2024' />
        <CardContent>
          <Typography>Advent Of Code 2024</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
