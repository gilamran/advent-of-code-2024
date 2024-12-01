import { Button, CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import React from 'react';
import { Day1Input } from './day1-input';

export const Day1: React.FC = () => {
  const [diff, setDiffResult] = React.useState<number>(0);
  const [similarityScore, setSimilarityScore] = React.useState<number>(0);

  const getColumns = () => {
    const lines = Day1Input.split('\n');
    const leftColumn: number[] = [];
    const rightColumn: number[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const [left, right] = line.split('   ');
      leftColumn.push(parseInt(left));
      rightColumn.push(parseInt(right));
    }
    return { leftColumn, rightColumn };
  };

  const calculateDiff = () => {
    const { leftColumn, rightColumn } = getColumns();

    const sortedLeftColumn = leftColumn.sort((a, b) => a - b);
    const sortedRightColumn = rightColumn.sort((a, b) => a - b);

    let totalDiff = 0;
    for (let i = 0; i < sortedLeftColumn.length; i++) {
      const left = sortedLeftColumn[i];
      const right = sortedRightColumn[i];
      const diff = Math.abs(left - right);
      totalDiff += diff;
    }
    setDiffResult(totalDiff);
  };

  const calculateSimilarityScore = () => {
    const { leftColumn, rightColumn } = getColumns();
    let totalScore = 0;
    for (let i = 0; i < leftColumn.length; i++) {
      const left = leftColumn[i];
      let totalTimes = 0;
      for (let j = 0; j < rightColumn.length; j++) {
        const right = rightColumn[j];
        if (left === right) {
          totalTimes += 1;
        }
      }
      const score = left * totalTimes;
      totalScore += score;
    }

    setSimilarityScore(totalScore);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title='Day 1' />
        <CardContent>
          <Button variant='contained' color='primary' onClick={calculateDiff}>
            Calculate Diff
          </Button>
          <p>Diff: {diff}</p>

          <Button variant='contained' color='primary' onClick={calculateSimilarityScore}>
            Calculate Similarity Score
          </Button>
          <p>Similarity Score: {similarityScore}</p>
        </CardContent>
      </Card>
    </Grid>
  );
};
