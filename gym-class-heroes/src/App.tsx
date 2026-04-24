import "./App.css";
import { Routes, Route } from "react-router-dom";
import AthletesPage from "./pages/AthletesPage";
import WorkoutsPage from "./pages/WorkoutsPage";
import CoachesPage from "./pages/CoachesPage";
import { Layout } from "./components/layout/layout";
import Landing from "./pages/Landing";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Landing />} />
        
        
        <Route element={<Layout />}>
          <Route path="athletes" element={
            <>
              <SignedIn>
                <AthletesPage />
              </SignedIn>

              <SignedOut>
                <RedirectToSignIn/>
              </SignedOut>
            </>
            } />
          <Route path='workouts' element={
            <>
              <SignedIn>
                <WorkoutsPage/>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn/>
              </SignedOut>
            </>
            } /> 
          <Route path="coaches" element={
            <>
              <SignedIn>
                <CoachesPage />
              </SignedIn>
            
              <SignedOut>
                <RedirectToSignIn/>
              </SignedOut>
            </>
            } />
      </Route>
    </Routes>
  );
}

export default App;
