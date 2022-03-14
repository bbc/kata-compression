import './App.css';
import React, { useState, useEffect, useMemo, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import KataMain from './pages/main';
import Welcome from './pages/welcome';
import Source from './pages/source';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const App = () => {
  
  return (
    <div className="App">
      <h1>Compression Kata</h1>

      <Tabs>
        <TabList>
          <Tab><b>Welcome</b></Tab>
          <Tab><b>Test</b></Tab>
          <Tab><b>Source</b></Tab>
        </TabList>

        <TabPanel>
          <Welcome/>
        </TabPanel>
        <TabPanel>
          <KataMain/>
        </TabPanel>
        <TabPanel>
          <Source/>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
