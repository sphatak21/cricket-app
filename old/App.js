import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './Home.js';
import Navbar from './Navbar';
import MatchList from './MatchList';
import Scorecard from './Scorecard';

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  return (
  
    <div className="App">
       <Navbar/>
        {/* <BrowserRouter>
         
          <div className='pages'>
            <Routes>
                <Route 
                  path = '/' 
                  element = {<Home/>}
                />
                <Route 
                  path = '/matchlist' 
                  element = {<MatchList />}
                />
                <Route 
                  path = '/scorecard/:matchId'
                  element = {<Scorecard />}
                />
            </Routes>
          </div>
        </BrowserRouter> */}
    </div>
  );
}

export default App;
