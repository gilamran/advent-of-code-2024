import React from 'react';
import { DayView } from './DayView';

function checkForHorizontalMatch(lines: string[], x: number, y: number, strToFind: string): boolean {
  const line = lines[y];
  if (x + strToFind.length > line.length) {
    return false;
  }
  const idx = line.indexOf(strToFind, x);
  const result = idx === x;
  if (result) {
    console.log(`HORIZONTAL: ${strToFind} found at (${x + 1}, ${y + 1})`);
  }

  return result;
}

function checkForVerticalMatch(lines: string[], x: number, y: number, strToFind: string): boolean {
  if (y + strToFind.length > lines.length) {
    return false;
  }
  for (let i = 0; i < strToFind.length; i++) {
    if (lines[y + i][x] !== strToFind[i]) {
      return false;
    }
  }

  console.log(`VERTICAL: ${strToFind} found at (${x + 1}, ${y + 1})`);
  return true;
}

function checkForDiagonalMatch(lines: string[], x: number, y: number, strToFind: string): boolean {
  if (x + strToFind.length > lines[y].length || y + strToFind.length > lines.length) {
    return false;
  }
  for (let i = 0; i < strToFind.length; i++) {
    if (lines[y + i][x + i] !== strToFind[i]) {
      return false;
    }
  }

  console.log(`DIAGONAL 1: ${strToFind} found at (${x + 1}, ${y + 1})`);
  return true;
}

function checkForDiagonalMatch2(lines: string[], x: number, y: number, strToFind: string): boolean {
  if (x + 1 - strToFind.length < 0 || y + strToFind.length > lines.length) {
    return false;
  }
  for (let i = 0; i < strToFind.length; i++) {
    if (lines[y + i][x - i] !== strToFind[i]) {
      return false;
    }
  }

  console.log(`DIAGONAL 2: ${strToFind} found at (${x + 1}, ${y + 1})`);
  return true;
}

function checkForXMAS(lines: string[], x: number, y: number): boolean {
  if (lines[y][x] !== 'A') {
    return false;
  }

  const topLeft = lines[y - 1][x - 1];
  const topRight = lines[y - 1][x + 1];
  const bottomLeft = lines[y + 1][x - 1];
  const bottomRight = lines[y + 1][x + 1];

  if (topLeft == 'M' && topRight == 'S' && bottomLeft == 'M' && bottomRight == 'S') {
    console.log(`MSMS (${x}, ${y})`);
    return true;
  }

  if (topLeft == 'S' && topRight == 'S' && bottomLeft == 'M' && bottomRight == 'M') {
    console.log(`SSMM (${x}, ${y})`);
    return true;
  }

  if (topLeft == 'S' && topRight == 'M' && bottomLeft == 'S' && bottomRight == 'M') {
    console.log(`SMSM (${x}, ${y})`);
    return true;
  }

  if (topLeft == 'M' && topRight == 'M' && bottomLeft == 'S' && bottomRight == 'S') {
    console.log(`MMSS (${x}, ${y})`);
    return true;
  }

  return false;
}

export const Day4: React.FC = () => {
  const calculatePart1 = (input: string): number => {
    const lines = input.split('\n');
    let total = 0;
    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];
      for (let x = 0; x < line.length; x++) {
        // 3
        if (checkForHorizontalMatch(lines, x, y, 'XMAS')) {
          total++;
        }

        // 2
        if (checkForHorizontalMatch(lines, x, y, 'SAMX')) {
          total++;
        }

        // 1
        if (checkForVerticalMatch(lines, x, y, 'XMAS')) {
          total++;
        }

        // 2
        if (checkForVerticalMatch(lines, x, y, 'SAMX')) {
          total++;
        }

        // 1
        if (checkForDiagonalMatch(lines, x, y, 'XMAS')) {
          total++;
        }

        // 4
        if (checkForDiagonalMatch(lines, x, y, 'SAMX')) {
          total++;
        }

        // 1
        if (checkForDiagonalMatch2(lines, x, y, 'XMAS')) {
          total++;
        }

        // 3
        if (checkForDiagonalMatch2(lines, x, y, 'SAMX')) {
          total++;
        }
      }
    }
    return total;
  };

  const calculatePart2 = (input: string): number => {
    const lines = input.split('\n');
    let total = 0;
    for (let y = 1; y < lines.length - 1; y++) {
      const line = lines[y];
      for (let x = 1; x < line.length - 1; x++) {
        if (checkForXMAS(lines, x, y)) {
          total++;
        }
      }
    }
    return total;
  };

  return <DayView day={4} part1Calculation={calculatePart1} part2Calculation={calculatePart2} />;
};
