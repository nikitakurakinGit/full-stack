import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AthletesPage from './pages/AthletesPage';
import WorkoutsPage from "./pages/WorkoutsPage";
import CoachesPage from './pages/CoachesPage';
import { Layout } from './components/layout/layout';
import { athleteData } from './data/athleteData';
import { groupData } from './data/groupsData';
import type { GroupsInterface } from './components/interface/groupsInterface';
import type { GroupArrayKey } from './components/interface/groupArrayKey';

function App() {
  const [athletes, setAthletes] = useState(athleteData);
  
  return (  
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route
              index
              element={
              <CoachesPage />}
              />
            
            {/* <Route
                path="athletes"
                element={
                  <AthletesPage
                    title="Athletes"
                    athletes={athletes}
                    setAthletes={setAthletes}
                    groupsData={groupsData}
                    addToGroup={addToGroup}
                    removeFromGroup={removeFromGroup}
                  />
                }
            />
            
            <Route
              path='workouts'
              element={
                <WorkoutsPage 
                addToGroup={addToGroup} 
                removeFromGroup={removeFromGroup}/>}/> */}
            
            <Route
                path='coaches'
                element={
                <CoachesPage />}
                />
        </Route>
      </Routes>
  );
}

export default App;
