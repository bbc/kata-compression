import './App.css';
import React, { useState, useEffect, useMemo, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import KataMain from './KataMain';
import Welcome from './Welcome';

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
        </TabList>

        <TabPanel>
          <Welcome/>
        </TabPanel>
        <TabPanel>
          <KataMain/>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
