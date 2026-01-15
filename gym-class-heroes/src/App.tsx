import './App.css'
import Footer from './components/footer/footer';
import {Header} from './components/header/header';
import WorkoutList from './components/workouts/workouts';

function App() {
  return (
    <div>
      <Header
        projectName="Gym Class Heroes"
        projectDescription="Workout Management System"
      />
      
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
     
      <Footer names={["Faith Hilarde","Nikita Kurakin", "Hoang Son Nguyen"]} />
            
    </div>
  );
}

export default App
