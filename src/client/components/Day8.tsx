import React from 'react';
import { DayView } from './DayView';

interface ILocation {
  x: number;
  y: number;
}

interface IProcessedInput {
  map: Map<string, ILocation[]>;
  width: number;
  height: number;
}

const processInput = (input: string): IProcessedInput => {
  const map = new Map<string, ILocation[]>();
  const lines = input.split('\n').map((line) => line.trim());
  const width = lines[0].length;
  const height = lines.length;
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === '.') {
        continue;
      }
      const existing = map.get(char);
      if (existing) {
        existing.push({ x, y });
      } else {
        map.set(char, [{ x, y }]);
      }
    }
  }
  return { map, width, height };
};

const addAntiNode = (
  x: number,
  y: number,
  maxX: number,
  maxY: number,
  antiNodes: ILocation[],
): 'added' | 'exists' | 'outside' => {
  if (x < 0 || x > maxX || y < 0 || y > maxY) {
    return 'outside';
  }

  const alreadyExists = antiNodes.some((node) => node.x === x && node.y === y);
  if (alreadyExists) {
    return 'exists';
  }
  antiNodes.push({ x, y });
  return 'added';
};

const findAntiNodes1 = (antiNodes: ILocation[], locations: ILocation[], maxX: number, maxY: number): void => {
  for (let i = 0; i < locations.length - 1; i++) {
    const location1 = locations[i];
    for (let j = i + 1; j < locations.length; j++) {
      const location2 = locations[j];
      const xDiff = location1.x - location2.x;
      const yDiff = location1.y - location2.y;

      // add the plus anti-node
      const x1 = location1.x + xDiff;
      const y1 = location1.y + yDiff;
      addAntiNode(x1, y1, maxX, maxY, antiNodes);

      // add the minus anti-node
      const x2 = location2.x - xDiff;
      const y2 = location2.y - yDiff;
      addAntiNode(x2, y2, maxX, maxY, antiNodes);
    }
  }
};

const findAntiNodes2 = (antiNodes: ILocation[], locations: ILocation[], maxX: number, maxY: number): void => {
  for (let i = 0; i < locations.length - 1; i++) {
    const location1 = locations[i];
    for (let j = i + 1; j < locations.length; j++) {
      const location2 = locations[j];
      const xDiff = location1.x - location2.x;
      const yDiff = location1.y - location2.y;

      // add the location itself
      addAntiNode(location1.x, location1.y, maxX, maxY, antiNodes);
      addAntiNode(location2.x, location2.y, maxX, maxY, antiNodes);

      // add the plus anti-nodes
      let keepGoing = true;
      let x = location1.x;
      let y = location1.y;
      while (keepGoing) {
        x += xDiff;
        y += yDiff;
        const result = addAntiNode(x, y, maxX, maxY, antiNodes);
        keepGoing = result === 'added' || result === 'exists';
      }

      // add the minus anti-nodes
      keepGoing = true;
      x = location2.x;
      y = location2.y;
      while (keepGoing) {
        x -= xDiff;
        y -= yDiff;
        const result = addAntiNode(x, y, maxX, maxY, antiNodes);
        keepGoing = result === 'added' || result === 'exists';
      }
    }
  }
};

export const Day8: React.FC = () => {
  const calculatePart1 = (input: string): number => {
    const { map, width, height } = processInput(input);
    const antiNodes: ILocation[] = [];
    for (const locations of map.values()) {
      findAntiNodes1(antiNodes, locations, width - 1, height - 1);
    }
    return antiNodes.length;
  };

  const calculatePart2 = (input: string): number => {
    const { map, width, height } = processInput(input);
    const antiNodes: ILocation[] = [];
    for (const locations of map.values()) {
      findAntiNodes2(antiNodes, locations, width - 1, height - 1);
    }

    return antiNodes.length;
  };

  return <DayView day={8} part1Calculation={calculatePart1} part2Calculation={calculatePart2} />;
};
