import React from 'react';
import { DayView } from './DayView';

type TMap = number[][];
interface IPoint {
  x: number;
  y: number;
}
interface ITreeNode {
  position: IPoint;
  nextPositions: ITreeNode[];
  depth: number;
}

const inputToMap = (input: string): TMap => {
  return input.split('\n').map((line) => line.trim().split('').map((cell) => parseInt(cell)));
}

const findAllStartingPoints = (map: TMap): IPoint[] => {
  const result: IPoint[] = [];
  map.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell === 0) {
        result.push({ x, y });
      }
    });
  });
  return result;
}

const isValidNextStep = (map: TMap, previousPositions: IPoint[], nextPosition: IPoint): boolean => {
  if (nextPosition.x < 0 || nextPosition.x >= map[0].length) {
    return false;
  }
  if (nextPosition.y < 0 || nextPosition.y >= map.length) {
    return false;
  }
  
  const alreadyStep = previousPositions.some((step) => step.x === nextPosition.x && step.y === nextPosition.y);
  if (alreadyStep) {
    return false;
  }

  const lastPosition = previousPositions[previousPositions.length - 1];
  const valueOnNextPos = map[nextPosition.y][nextPosition.x];
  const valueOnCurrentPos = map[lastPosition.y][lastPosition.x];
  return valueOnNextPos === valueOnCurrentPos + 1;
}

const calcTree = (map: TMap, startingPoint: IPoint): ITreeNode => {
  function findPathFrom(previousSteps: IPoint[]): ITreeNode {
    const lastStep = previousSteps[previousSteps.length - 1];
    const nextPositions: ITreeNode[] = [];

    const resultTree: ITreeNode = {
      position: lastStep,
      nextPositions,
      depth: previousSteps.length,
    }

    if (resultTree.depth === 10) {
      return resultTree;
    }

    const up = { x: lastStep.x, y: lastStep.y - 1 };
    const down = { x: lastStep.x, y: lastStep.y + 1 };
    const left = { x: lastStep.x - 1, y: lastStep.y };
    const right = { x: lastStep.x + 1, y: lastStep.y };

    // go up
    if (isValidNextStep(map, previousSteps, up)) {
      const upTree = findPathFrom([...previousSteps, up]);
      nextPositions.push(upTree);
    }

    // go down
    if (isValidNextStep(map, previousSteps, down)) {
      const downTree = findPathFrom([...previousSteps, down]);
      nextPositions.push(downTree);
    }

    // go left
    if (isValidNextStep(map, previousSteps, left)) {
      const leftTree = findPathFrom([...previousSteps, left]);
      nextPositions.push(leftTree);
    }

    // go right
    if (isValidNextStep(map, previousSteps, right)) {
      const rightTree = findPathFrom([...previousSteps, right]);
      nextPositions.push(rightTree);
    }
    return resultTree;
  }

  return findPathFrom([startingPoint]);
}

const scoreTree = (tree: ITreeNode): number => {
  // Find unique paths with depth 10
  const endPoints: Set<string> = new Set();
  function findPaths(tree: ITreeNode) {
    if (tree.depth === 10) {
      endPoints.add(`${tree.position.x},${tree.position.y}`);
    }
    tree.nextPositions.forEach((nextTree) => findPaths(nextTree));
  }
  findPaths(tree);
  return endPoints.size;
}

const scoreAllPossiblePathsInTree = (tree: ITreeNode): number => {
  // Find all paths with depth 10
  let score: number = 0;
  function findPaths(tree: ITreeNode) {
    if (tree.depth === 10) {
      score++
    }
    tree.nextPositions.forEach((nextTree) => findPaths(nextTree));
  }
  findPaths(tree);
  return score;
}

export const Day10: React.FC = () => {
  const calculatePart1 = (input: string): number => {
    const map = inputToMap(input);
    const startingPoints = findAllStartingPoints(map);
    let totalScore = 0;
    for (const startingPoint of startingPoints) {
      const tree = calcTree(map, startingPoint);
      totalScore += scoreTree(tree);
    }
    return totalScore;
  };

  const calculatePart2 = (input: string): number => {
    const map = inputToMap(input);
    const startingPoints = findAllStartingPoints(map);
    let totalScore = 0;
    for (const startingPoint of startingPoints) {
      const tree = calcTree(map, startingPoint);
      totalScore += scoreAllPossiblePathsInTree(tree);
    }
    return totalScore;
  };

  return <DayView day={10} part1Calculation={calculatePart1} part2Calculation={calculatePart2} />;
};
