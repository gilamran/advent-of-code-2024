import React from 'react';
import { DayView } from './DayView';

export const Day12: React.FC = () => {
  const calculatePart1 = (input: string): number => {
    return 1;
  };

  const calculatePart2 = (input: string): number => {
    return 2;
  };

  return <DayView day={12} part1Calculation={calculatePart1} part2Calculation={calculatePart2} />;
};
