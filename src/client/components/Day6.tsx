import React from 'react';
import { DayView } from './DayView';

const convertToMap = (input: string): string[] => {
  return input.split('\n').map((line) => line.trim());
};

type TDirection = 'up' | 'down' | 'left' | 'right';
interface IGuard {
  x: number;
  y: number;
  direction: TDirection;
}

const findGuard = (map: string[]): IGuard | null => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '^') {
        return { x, y, direction: 'up' };
      }
    }
  }
  return null;
};

const markTile = (tilesActions: Map<string, TDirection[]>, guard: IGuard): 'new' | 'repeat' => {
  const key = `${guard.x},${guard.y}`;
  const existingActions = tilesActions.get(key);
  if (!existingActions) {
    tilesActions.set(key, [guard.direction]);
    return 'new';
  } else {
    if (existingActions.includes(guard.direction)) {
      return 'repeat';
    }
    existingActions.push(guard.direction);
    return 'new';
  }
};

const processInput = (input: string): { guard: IGuard; map: string[] } => {
  const map = convertToMap(input);
  const guard = findGuard(map);
  if (guard === null) {
    throw new Error('Guard not found');
  }
  return { guard, map };
};

const moveGuard = (map: string[], guard: IGuard): 'moved' | 'exited_map' => {
  switch (guard.direction) {
    case 'up':
      if (guard.y === 0) {
        return 'exited_map';
      }
      if (map[guard.y - 1][guard.x] === '#') {
        guard.direction = 'right';
        return 'moved';
      }
      guard.y--;
      break;

    case 'down':
      if (guard.y === map.length - 1) {
        return 'exited_map';
      }
      if (map[guard.y + 1][guard.x] === '#') {
        guard.direction = 'left';
        return 'moved';
      }
      guard.y++;
      break;

    case 'left':
      if (guard.x === 0) {
        return 'exited_map';
      }
      if (map[guard.y][guard.x - 1] === '#') {
        guard.direction = 'up';
        return 'moved';
      }
      guard.x--;
      break;

    case 'right':
      if (guard.x === map[guard.y].length - 1) {
        return 'exited_map';
      }
      if (map[guard.y][guard.x + 1] === '#') {
        guard.direction = 'down';
        return 'moved';
      }
      guard.x++;
      break;
  }
  return 'moved';
};

const predictGuardSteps = (map: string[], guard: IGuard): { steps: number; status: 'loop' | 'exited_map' } => {
  let tilesActions: Map<string, TDirection[]> = new Map();
  let inMap = true;
  markTile(tilesActions, guard);
  while (inMap) {
    const moveResult = moveGuard(map, guard);
    if (moveResult === 'exited_map') {
      inMap = false;
    } else {
      const markResult = markTile(tilesActions, guard);
      if (markResult === 'repeat') {
        return { steps: tilesActions.size, status: 'loop' };
      }
    }
  }
  return { steps: tilesActions.size, status: 'exited_map' };
};

export const Day6: React.FC = () => {
  const calculatePart1 = (input: string): number => {
    const { guard, map } = processInput(input);
    const { steps } = predictGuardSteps(map, guard);
    return steps;
  };

  const calculatePart2 = (input: string): number => {
    const { guard, map } = processInput(input);
    let countLoops = 0;
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (y === 6 && x === 3) {
          console.log('here');
        }
        if (map[y][x] === '#') {
          continue;
        }
        if (x === guard.x && y === guard.y) {
          continue;
        }
        // add obstacle at (x, y)
        map[y] = map[y].substring(0, x) + '#' + map[y].substring(x + 1);

        const { status } = predictGuardSteps(map, { ...guard });
        if (status === 'loop') {
          countLoops++;
        }

        // remove obstacle at (x, y)
        map[y] = map[y].substring(0, x) + '.' + map[y].substring(x + 1);
      }
    }

    return countLoops;
  };

  return <DayView day={6} part1Calculation={calculatePart1} part2Calculation={calculatePart2} />;
};
