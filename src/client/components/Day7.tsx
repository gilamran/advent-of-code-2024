import React from 'react';
import { DayView } from './DayView';

interface IData {
  calcResult: number;
  numbers: number[];
}

const parseInput = (input: string): IData[] => {
  const result: IData[] = [];
  const lines = input.split('\n').map((line) => line.trim());
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.split(': ');
    const calcResult = parseInt(parts[0]);
    const numbers = parts[1].split(' ').map((n) => parseInt(n));
    result.push({ calcResult, numbers });
  }
  return result;
};

const calculate = (data: IData, allowConcat: boolean): number | null => {
  const calcWithRest = (number: number, numbers: number[]): number | null => {
    if (numbers.length === 0) {
      return data.calcResult === number ? number : null;
    }

    const numbersCopy = [...numbers];
    const nextNumber = numbersCopy.shift();
    if (nextNumber === undefined) {
      return null;
    }

    const addedResult = calcWithRest(number + nextNumber, numbersCopy);
    if (addedResult !== null) {
      return addedResult;
    }

    const multipliedResult = calcWithRest(number * nextNumber, numbersCopy);
    if (multipliedResult !== null) {
      return multipliedResult;
    }

    if (allowConcat) {
      const concatResult = calcWithRest(parseInt(number.toString() + nextNumber.toString()), numbersCopy);
      if (concatResult !== null) {
        return concatResult;
      }
    }
    return null;
  };

  const numbers = data.numbers;
  const firstNumber = numbers.shift();
  if (firstNumber === undefined) {
    return null;
  }
  return calcWithRest(firstNumber, numbers);
};

export const Day7: React.FC = () => {
  const calculatePart1 = (input: string): number => {
    const dataArr = parseInput(input);
    let result = 0;
    for (let i = 0; i < dataArr.length; i++) {
      const data = dataArr[i];
      const calcResult = calculate(data, false);
      if (calcResult !== null) {
        result = result + calcResult;
      }
    }
    return result;
  };

  const calculatePart2 = (input: string): number => {
    const dataArr = parseInput(input);
    let result = 0;
    for (let i = 0; i < dataArr.length; i++) {
      const data = dataArr[i];
      const calcResult = calculate(data, true);
      if (calcResult !== null) {
        result = result + calcResult;
      }
    }
    return result;
  };

  return <DayView day={7} part1Calculation={calculatePart1} part2Calculation={calculatePart2} />;
};
