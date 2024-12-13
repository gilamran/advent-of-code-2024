import { Box, CssBaseline, Toolbar } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Pages
import { Header } from './components/Header';
import { Home } from './components/Home';
import { SideMenu } from './components/SideMenu';
import { Day1 } from './components/Day1';
import { Day2 } from './components/Day2';
import { Day3 } from './components/Day3';
import { Day4 } from './components/Day4';
import { Day5 } from './components/Day5';
import { Day6 } from './components/Day6';
import { Day7 } from './components/Day7';
import { Day8 } from './components/Day8';
import { Day9 } from './components/Day9';
import { Day10 } from './components/Day10';
import { Day11 } from './components/Day11';
import { Day12 } from './components/Day12';

export const App = () => {

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <SideMenu />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/day1' element={<Day1 />} />
            <Route path='/day2' element={<Day2 />} />
            <Route path='/day3' element={<Day3 />} />
            <Route path='/day4' element={<Day4 />} />
            <Route path='/day5' element={<Day5 />} />
            <Route path='/day6' element={<Day6 />} />
            <Route path='/day7' element={<Day7 />} />
            <Route path='/day8' element={<Day8 />} />
            <Route path='/day9' element={<Day9 />} />
            <Route path='/day10' element={<Day10 />} />
            <Route path='/day11' element={<Day11 />} />
            <Route path='/day12' element={<Day12 />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
};
