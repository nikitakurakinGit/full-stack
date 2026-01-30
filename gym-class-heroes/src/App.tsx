import './App.css';
import { Routes, Route } from 'react-router-dom';
import AthletesPage from './pages/AthletesPage';
import WorkoutsPage from "./pages/WorkoutsPage";
import CoachesPage from './pages/CoachesPage';
import { Layout } from './components/layout/layout';
import { athleteData } from './data/athleteData';
import { coachData } from './data/coachData';

function App() {
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
                <WorkoutsPage/>}
                />
            
            <Route
                path='coaches'
                element={<CoachesPage coaches={coachData}/>}
                />
        </Route>
      </Routes>
  );
}

export default App
