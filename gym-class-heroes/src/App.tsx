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
  const [groupsData, setGroupsData] = useState<GroupsInterface[]>(groupData);

  //This is only here for debugging and sanity check puposes. When you update your pages to take the add and remove from group functions. Check your console when you add and remove athletes or workout to make sure everything is working as exepcted.
  useEffect(() => {
    console.log(groupsData)
  }, [groupsData])

  //This function will take the id of the group we intent to update. The key is hardcoded above and will be passed. This will help us avoid writing 3 add functions, one for each set of data. The subjectID is the id of the coach, workout or athlete being added. We then map over the group, if the group.id matches the passed id. We spread the group, then we update the passed key. For example [coachesById]: [...group[coachesById], newCoachId].
  const addToGroup = (
    groupId: string,
    key: GroupArrayKey,
    subjectId: number
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
    subjectId: number
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
              index
              element={<CoachesPage addToGroup={addToGroup} removeFromGroup={removeFromGroup}/>}
              />
            
            <Route
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
                removeFromGroup={removeFromGroup}/>}/>
            
            <Route
                path='coaches'
                element={<CoachesPage addToGroup={addToGroup} removeFromGroup={removeFromGroup}/>}
                />
        </Route>
      </Routes>
  );
}

export default App;
