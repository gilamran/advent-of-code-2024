import React from 'react';
import { DayView } from './DayView';

type TStonesMap = Map<number, number>;

const inputToStonesMap = (input: string): TStonesMap => {
  const stonesMap = new Map<number, number>();
  const numbers = input.split(' ').map((stone) => parseInt(stone));
  for (let i = 0; i < numbers.length; i++) {
    const value = numbers[i];
    stonesMap.set(value, 1);
  }

  return stonesMap;
};

const addOrUpdate = (value: number, count: number, stonesMap: TStonesMap): void => {
  let currentValue = stonesMap.get(value);
  if (currentValue) {
    stonesMap.set(value, currentValue + count);
  } else {
    stonesMap.set(value, count);
  }
};

const evolve = (stonesMap: TStonesMap): TStonesMap => {
  const result = new Map<number, number>();
  for (const [number, count] of stonesMap.entries()) {
    if (number === 0) {
      addOrUpdate(1, count, result);
    } else {
      const numberAsStr = number.toString();
      const isEven = numberAsStr.length % 2 === 0;
      if (isEven) {
        const leftHalf = parseInt(numberAsStr.slice(0, numberAsStr.length / 2));
        const rightHalf = parseInt(numberAsStr.slice(numberAsStr.length / 2));
        addOrUpdate(leftHalf, count, result);
        addOrUpdate(rightHalf, count, result);
      } else {
        addOrUpdate(number * 2024, count, result);
      }
    }
  }
  return result;
};

const countValues = (stonesMap: TStonesMap): number => {
  let totalChildren = 0;
  for (const count of stonesMap.values()) {
    totalChildren += count;
  }
  return totalChildren;
};

const evolveManyTimes = (input: string, times: number): TStonesMap => {
  let stonesMap = inputToStonesMap(input);
  for (let i = 0; i < times; i++) {
    stonesMap = evolve(stonesMap);
  }
  return stonesMap;
};

export const Day11: React.FC = () => {
  const calculatePart1 = (input: string): number => {
    const stonesMap = evolveManyTimes(input, 25);
    return countValues(stonesMap);
  };

  const calculatePart2 = (input: string): number => {
    const stonesMap = evolveManyTimes(input, 75);
    return countValues(stonesMap);
  };

  return <DayView day={11} part1Calculation={calculatePart1} part2Calculation={calculatePart2} />;
};
