import './App.css'
import {Header} from './components/header/header';
import { AthleteList } from './components/athletes/athletes';
import type { Athletes } from './components/interface/athletes';
import WorkoutList from './components/workouts/workouts';
import Coaches from './components/coaches/coaches';
import Footer from './components/footer/footer';
import Footer from './components/footer/footer';


function App() {
  const athlete: Athletes[] = [
    { id: 1, name: "Hoang Son Nguyen", sport: "Soccer", experience: "Advanced", status: "Active" },
    { id: 2, name: "Nikita Kurakin", sport: "Basketball", experience: "Intermediate", status: "Inactive" },
    { id: 3, name: "Faith Hilarde", sport: "Wrestling", experience: "Beginner", status: "Injured" }
  ]

  return (  
    <div className='bg-[#bcc8d0]'>
      <Header
        projectName="Gym Class Heroes"
        projectDescription="Workout Management System"
      />
      <AthleteList title="Athletes" athlete={athlete} />
      <WorkoutList 
        title="Beginner Level"
        workouts={["50 Push-ups", "50 Squats", "50 Sit-ups"]}
      />
      
      <WorkoutList 
        title="Intermediate Level"
        workouts={["100 Push-ups", "100 Squats", "100 Sit-ups"]}
      />
     
      <WorkoutList 
        title="Advanced Level"
        workouts={["150 Push-ups", "150 Squats", "150 Sit-ups"]}
      />
     
      <Coaches
        name="Coach A"
        title="Head Coach"
        athletes={["Nikita", "Sonny"]}
      />

      <Coaches
        name="Coach B"
        title="Coach"
        athletes={["KJ", "Faith", "Zach"]}
      />

      <Coaches
        name="Coach C"
        title="Coach"
        athletes={["Kirby", "Ken", "Cole", "Steve"]}
      />
      <Footer names={["Faith Hilarde","Nikita Kurakin", "Hoang Son Nguyen"]} />    
    </div>
  );
}

export default App
