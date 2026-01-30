import './App.css'
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AthletesPage from './pages/AthletesPage';
import WorkoutsPage from "./pages/WorkoutsPage";
import CoachesPage from './pages/CoachesPage';
import { Layout } from './components/layout/layout';
import { athleteData } from './data/athleteData';
import { groupData } from './data/groupsData';
import type { GroupsInterface } from './components/interface/groupsInterface';

function App() {
  const [groupsData, setGroupsData] = useState<GroupsInterface[]>(groupData)
  
  type GroupArrayKey = "coachesById" | "workoutsById" | "athletesById"

  //This function will take the id of the group we intent to update. The key is hardcoded above and will be passed. This will help us avoid writing 3 add functions, one for each set of data. The subjectID is the id of the coach, workout or athlete being added. We then map over the group, if the group.id matches the passed id. We spread the group, then we update the passed key. For example [coachesById]: [...group[coachesById], newCoachId].
  const addToGroup = (
    groupId: string,
    key: GroupArrayKey,
    subjectId: string
  ) => {
    setGroupsData(prev => 
      prev.map(group =>
        group.id === groupId ? {
          ...group,
          [key]: [...group[key], subjectId]
        }: group
      )
    )
  }


  //This works basically the same as the above add function. Only now were going to take the key, pull that data and filter through, only passing those ids that dont match the passed(deleted) id.
  const removeFromGroup = (
    groupId: string,
    key: GroupArrayKey,
    subjectId: string
  ) => {
    setGroupsData(prev => 
      prev.map(group =>
        group.id === groupId ? {
          ...group,
          [key]: [...group[key].filter(id => id !== subjectId)]
        } : group
      )
    )
  }
  
  return (  
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route
              path='athletes'
              element={
                <AthletesPage
                  title="Athletes" athlete={athleteData}/>}/>
            
            <Route
              path='workouts'
              element={
                <WorkoutsPage
                  title="Beginner Level"
                  workouts={["50 Push-ups", "50 Squats", "50 Sit-ups"]}/>}/>
            
            <Route
                path='coaches'
                element={<CoachesPage/>}
                />
        </Route>
      </Routes>
  );
}

export default App
