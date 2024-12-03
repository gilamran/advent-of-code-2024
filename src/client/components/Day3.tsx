import { Button, CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import React from 'react';

export const Day3: React.FC = () => {
  const [result, setResult] = React.useState<number>(0);

  const calculate = () => {
    setResult(1);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title='Day 3' />
        <CardContent>
          <Button variant='contained' color='primary' onClick={calculate}>
            Calculate
          </Button>
          <p>Result: {result}</p>
        </CardContent>
      </Card>
    </Grid>
  );
};
