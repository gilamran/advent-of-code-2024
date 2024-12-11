import React from 'react';
import { DayView } from './DayView';

const inputToDisk = (input: string): number[] => {
  const disk: number[] = [];
  let mode: 'file' | 'empty' = 'file';
  let fileId = 0;
  for (let c = 0; c < input.length; c++) {
    const len = parseInt(input[c]);
    for (let i = 0; i < len; i++) {
      const valueToWrite = mode === 'file' ? fileId : -1;
      disk.push(valueToWrite);
    }

    if (mode === 'file') {
      fileId++;
      mode = 'empty';
    } else {
      mode = 'file';
    }
  }
  return disk;
};

const moveFilePart = (disk: number[], from: number, to: number): void => {
  const tmp = disk[from];
  disk[from] = disk[to];
  disk[to] = tmp;
};

const moveFiles = (disk: number[]): number[] => {
  let leftPointer = 0;
  let rightPointer = disk.length - 1;

  while (true) {
    // find free space on the left side
    while (leftPointer < rightPointer && disk[leftPointer] !== -1) {
      leftPointer++;
    }

    // find file on the right side
    while (rightPointer > leftPointer && disk[rightPointer] === -1) {
      rightPointer--;
    }

    if (leftPointer === rightPointer) {
      return disk;
    }

    // move file to the left
    moveFilePart(disk, leftPointer, rightPointer);
  }
};

const moveFileIntact = (disk: number[], size: number, from: number, to: number): void => {
  for (let i = 0; i < size; i++) {
    moveFilePart(disk, from - i, to + i);
  }
};

const moveFilesIntact = (disk: number[]): number[] => {
  let rightPointer = disk.length - 1;

  while (true) {
    // ignore free space on the right
    while (rightPointer > 0 && disk[rightPointer] === -1) {
      rightPointer--;
    }

    if (rightPointer === 0) {
      return disk;
    }

    const fileId = disk[rightPointer];
    let fileSize = 0;
    let idxOfFile = rightPointer;
    // figure out the file size
    while (rightPointer > 0 && disk[rightPointer] === fileId) {
      rightPointer--;
      fileSize++;
    }

    if (rightPointer === 0 || fileSize === 0) {
      return disk;
    }

    // find space on the left size
    let leftPointer = 0;
    let enoughSpaceFound = false;
    let spaceSize = 0;
    let idxOfFreeSpace = leftPointer;
    while (leftPointer <= rightPointer && enoughSpaceFound === false) {
      if (disk[leftPointer] === -1) {
        leftPointer++;
        spaceSize++;
      } else {
        leftPointer++;
        idxOfFreeSpace = leftPointer;
        spaceSize = 0;
      }

      if (spaceSize === fileSize) {
        enoughSpaceFound = true;
      }
    }

    if (enoughSpaceFound) {
      // move file to the left
      moveFileIntact(disk, fileSize, idxOfFile, idxOfFreeSpace);
    }
  }
};

const calcHash = (disk: number[]): number => {
  let hash = 0;
  for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== -1) {
      hash += i * disk[i];
    }
  }
  return hash;
};

export const Day9: React.FC = () => {
  const calculatePart1 = (input: string): number => {
    const disk = inputToDisk(input.trim());
    const movedDisk = moveFiles(disk);
    const hash = calcHash(movedDisk);
    return hash;
  };

  const calculatePart2 = (input: string): number => {
    const disk = inputToDisk(input.trim());
    const movedDisk = moveFilesIntact(disk);
    const hash = calcHash(movedDisk);
    return hash;
  };

  return <DayView day={9} part1Calculation={calculatePart1} part2Calculation={calculatePart2} />;
};
