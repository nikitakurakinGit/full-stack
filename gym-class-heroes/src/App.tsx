import "./App.css";
import { Routes, Route } from "react-router-dom";
import AthletesPage from "./pages/AthletesPage";
import WorkoutsPage from "./pages/WorkoutsPage";
import CoachesPage from "./pages/CoachesPage";
import { Layout } from "./components/layout/layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CoachesPage />} />

        <Route path="athletes" element={<AthletesPage />} />
        <Route path='workouts' element={<WorkoutsPage/>} /> 
        <Route path="coaches" element={<CoachesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
