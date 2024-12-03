import React from 'react';
import { DayView } from './DayView';

// const input = `7 6 4 2 1
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
  const calculatePart1 = (input: string) => {
    const lines = input.split('\n');
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
    return result;
  };

  const calculatePart2 = (input: string) => {
    const lines = input.split('\n');
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
    return result;
  };

  return <DayView day={2} part1Calculation={calculatePart1} part2Calculation={calculatePart2} />;
};
