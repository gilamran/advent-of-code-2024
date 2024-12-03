import React from 'react';
import { DayView } from './DayView';

const calculateMul = (input: string): number => {
  const [a, b] = input.match(/\d{1,3}/g) || [];
  if (!a || !b) {
    return 0;
  }
  const result = parseInt(a, 10) * parseInt(b, 10);
  return result;
};

export const Day3: React.FC = () => {
  const calculatePart1 = (input: string): number => {
    const regExp = new RegExp(`mul\\(\\d{1,3},\\d{1,3}\\)`, 'g');
    const matches = input.match(regExp);
    if (matches) {
      return matches.reduce((prev, cur) => {
        return prev + calculateMul(cur);
      }, 0);
    }
    return 0;
  };

  const calculatePart2 = (input: string): number => {
    let keepGoing = true;
    while (keepGoing) {
      keepGoing = false;
      const dontIdx = input.indexOf(`don't()`);
      if (dontIdx !== -1) {
        const doIdx = input.indexOf(`do()`, dontIdx);
        if (doIdx !== -1) {
          input = input.slice(0, dontIdx) + input.slice(doIdx + 4);
          keepGoing = true;
        } else {
          // if we do have a "don't()" but no "do()" after it, we should remove the rest of the string
          input = input.slice(0, dontIdx);
        }
      }
    }
    return calculatePart1(input);
  };

  return <DayView day={3} part1Calculation={calculatePart1} part2Calculation={calculatePart2} />;
};
