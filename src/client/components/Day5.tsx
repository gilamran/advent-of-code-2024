import React from 'react';
import { DayView } from './DayView';

interface IRule {
  before: number;
  after: number;
}

type TUpdate = number[];
interface IData {
  rules: IRule[];
  updates: TUpdate[];
}

function constructData(input: string): IData {
  const lines = input.split('\n');
  const rules: IRule[] = [];
  const updates: number[][] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') {
      continue;
    }
    if (line.includes('|')) {
      const ruleParts = line.split('|');
      const before = parseInt(ruleParts[0], 10);
      const after = parseInt(ruleParts[1], 10);
      rules.push({ before, after });
    } else {
      const update = line.split(',').map((x) => parseInt(x, 10));
      updates.push(update);
    }
  }
  return { rules, updates };
}

function isRuleViolated(rules: IRule[], before: number, after: number): boolean {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (rule.before === after && rule.after === before) {
      return true;
    }
  }
  return false;
}

interface IProcessedData {
  data: IData;
  correctUpdates: TUpdate[];
  incorrectUpdates: TUpdate[];
}

const processInput = (input: string): IProcessedData => {
  const data = constructData(input);
  const correctUpdates: TUpdate[] = [];
  const incorrectUpdates: TUpdate[] = [];
  for (let i = 0; i < data.updates.length; i++) {
    const update = data.updates[i];
    let ruleViolated = false;
    for (let j = 0; j < update.length - 1; j++) {
      for (let k = j + 1; k < update.length; k++) {
        const item1 = update[j];
        const item2 = update[k];
        const ruleV1 = isRuleViolated(data.rules, item1, item2);
        if (ruleV1) {
          ruleViolated = true;
          break;
        }
      }
      if (ruleViolated) {
        break;
      }
    }

    if (ruleViolated) {
      incorrectUpdates.push(update);
    } else {
      correctUpdates.push(update);
    }
  }

  return { data, correctUpdates, incorrectUpdates };
};

const fixUpdate = (rules: IRule[], update: number[]): number[] => {
  const fixedUpdate = [...update];
  for (let i = 0; i < update.length - 1; i++) {
    for (let j = i + 1; j < update.length; j++) {
      const item1 = update[i];
      const item2 = update[j];
      if (isRuleViolated(rules, item1, item2)) {
        fixedUpdate[i] = item2;
        fixedUpdate[j] = item1;
        return fixUpdate(rules, fixedUpdate);
      }
    }
  }
  return fixedUpdate;
}

export const Day5: React.FC = () => {
  const calculatePart1 = (input: string): number => {
    const { correctUpdates } = processInput(input);
    const result = correctUpdates.reduce((acc, val) => {
      const middleItemIdx = Math.floor(val.length / 2);
      const middleItem = val[middleItemIdx];
      return acc + middleItem;
    }, 0);

    return result;
  };

  const calculatePart2 = (input: string): number => {
    const { data, incorrectUpdates } = processInput(input);
    const fixedUpdates = incorrectUpdates.map((x) => fixUpdate(data.rules, x));
    const result = fixedUpdates.reduce((acc, val) => {
      const middleItemIdx = Math.floor(val.length / 2);
      const middleItem = val[middleItemIdx];
      return acc + middleItem;
    }, 0);

    return result;
  };

  return <DayView day={5} part1Calculation={calculatePart1} part2Calculation={calculatePart2} />;
};
