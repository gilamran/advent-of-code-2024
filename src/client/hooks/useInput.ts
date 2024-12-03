import React from 'react';

export const useInput = (day: number) => {
  const [input, setInput] = React.useState<string>('');
  const [exampleInput, setExampleInput] = React.useState<string>('');

  React.useEffect(() => {
    let cancel = false;
    const fetchInput = async () => {
      const response = await fetch(`/inputs/day${day}.txt`);
      const text = await response.text();
      if (cancel) {
        return;
      }
      setInput(text);
    };
    const fetchExampleInput = async () => {
      const response = await fetch(`/inputs/day${day}-example.txt`);
      const text = await response.text();
      if (cancel) {
        return;
      }
      setExampleInput(text);
    };

    fetchInput();
    fetchExampleInput();

    return () => {
      cancel = true;
    };
  }, [day]);

  return { input, exampleInput };
};
