import React from 'react';
import { DayView } from './DayView';

export const Day1: React.FC = () => {
  const getColumns = (input: string) => {
    const lines = input.split('\n');
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

  const calculateDiff = (input: string): number => {
    const { leftColumn, rightColumn } = getColumns(input);

    const sortedLeftColumn = leftColumn.sort((a, b) => a - b);
    const sortedRightColumn = rightColumn.sort((a, b) => a - b);

    let totalDiff = 0;
    for (let i = 0; i < sortedLeftColumn.length; i++) {
      const left = sortedLeftColumn[i];
      const right = sortedRightColumn[i];
      const diff = Math.abs(left - right);
      totalDiff += diff;
    }
    return totalDiff;
  };

  const calculateSimilarityScore = (input: string): number => {
    const { leftColumn, rightColumn } = getColumns(input);
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

    return totalScore;
  };

  return <DayView day={1} part1Calculation={calculateDiff} part2Calculation={calculateSimilarityScore} />;
};
