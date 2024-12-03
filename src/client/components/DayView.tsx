import { Button, CardHeader, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useInput } from '../hooks/useInput';

interface IProps {
  day: number;
  part1Calculation: (input: string) => number;
  part2Calculation: (input: string) => number;
}
export const DayView: React.FC<IProps> = ({ day, part1Calculation, part2Calculation }) => {
  const { input, exampleInput } = useInput(day);
  const [useExampleInput, setUseExampleInput] = React.useState<boolean>(true);
  const [part1Result, setPart1Result] = React.useState<number>(0);
  const [part2Result, setPart2Result] = React.useState<number>(0);

  const calculatePart1 = () => {
    const inputToUse = useExampleInput ? exampleInput : input;
    setPart1Result(part1Calculation(inputToUse));
  };

  const calculatePart2 = () => {
    const inputToUse = useExampleInput ? exampleInput : input;
    setPart2Result(part2Calculation(inputToUse));
  };

  const toggleExampleInput = () => {
    setUseExampleInput((prev) => !prev);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={`Day ${day}`} />
        <CardContent>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={useExampleInput} onClick={toggleExampleInput} />}
              label='Example Input'
            />
          </FormGroup>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <TextField multiline value={useExampleInput ? exampleInput : input} rows={5} sx={{ width: 500 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Button variant='contained' color='primary' onClick={calculatePart1}>
                Calculate Part 1
              </Button>
              <p>Result: {part1Result}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Button variant='contained' color='primary' onClick={calculatePart2}>
                Calculate Part 2
              </Button>
              <p>Result: {part2Result}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};
