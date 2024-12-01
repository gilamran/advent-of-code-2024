import { CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

export const Day1: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title='Day 1' />
        <CardContent>
          <Typography>Day 1</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
