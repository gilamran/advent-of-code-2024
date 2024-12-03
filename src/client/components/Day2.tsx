import { Button, CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import React from 'react';
import { Day2Input } from './day2-input';

// const Day2Input = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`;

const isIncreasing = (numbers: number[]): boolean => {
  for (let idx = 1; idx < numbers.length; idx++) {
    const diff = numbers[idx] - numbers[idx - 1];
    if (diff <= 0 || diff > 3) {
      return false;
    }
  }
  return true;
};

const isDecreasing = (numbers: number[]): boolean => {
  for (let idx = 1; idx < numbers.length; idx++) {
    const diff = numbers[idx] - numbers[idx - 1];
    if (diff >= 0 || diff < -3) {
      return false;
    }
  }
  return true;
};

const isIncreasingWithTolerance = (numbers: number[]): boolean => {
  for (let x = 0; x < numbers.length; x++) {
    const newArray = numbers.slice(0, x).concat(numbers.slice(x + 1));
    if (isIncreasing(newArray)) {
      return true;
    }
  }
  return false;
};

const isDecreasingWithTolerance = (numbers: number[]): boolean => {
  for (let x = 0; x < numbers.length; x++) {
    const newArray = numbers.slice(0, x).concat(numbers.slice(x + 1));
    if (isDecreasing(newArray)) {
      return true;
    }
  }
  return false;
};

export const Day2: React.FC = () => {
  const [resultPart1, setResultPart1] = React.useState<number>(0);
  const [resultPart2, setResultPart2] = React.useState<number>(0);

  const calculatePart1 = () => {
    const lines = Day2Input.split('\n');
    let result = 0;
    for (const line of lines) {
      const numbers = line.split(' ').map((n) => parseInt(n, 10));
      if (isIncreasing(numbers)) {
        result++;
      } else {
        if (isDecreasing(numbers)) {
          result++;
        }
      }
    }
    setResultPart1(result);
  };

  const calculatePart2 = () => {
    const lines = Day2Input.split('\n');
    let result = 0;
    for (const line of lines) {
      const numbers = line.split(' ').map((n) => parseInt(n, 10));
      if (isIncreasingWithTolerance(numbers)) {
        result++;
      } else {
        if (isDecreasingWithTolerance(numbers)) {
          result++;
        }
      }
    }
    setResultPart2(result);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title='Day 2' />
        <CardContent>
          <Button variant='contained' color='primary' onClick={calculatePart1}>
            Calculate Part 1
          </Button>
          <p>Result Part 1: {resultPart1}</p>
          <Button variant='contained' color='primary' onClick={calculatePart2}>
            Calculate Part 2
          </Button>
          <p>Result Part 2: {resultPart2}</p>
        </CardContent>
      </Card>
    </Grid>
  );
};
