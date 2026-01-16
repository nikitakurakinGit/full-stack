import './App.css'
import {Header} from './components/header/header';
import { AthleteList } from './components/athletes/athletes';
import type { Athletes } from './components/interface/athletes';
import WorkoutList from './components/workouts/workouts';
import type { CoachModel } from './components/interface/coaches';
import Coaches from './components/coaches/coaches';
import Footer from './components/footer/footer';


function App() {
  const athlete: Athletes[] = [
    { id: 1, name: "Hoang Son Nguyen", sport: "Soccer", experience: "Advanced", status: "Active" },
    { id: 2, name: "Nikita Kurakin", sport: "Basketball", experience: "Intermediate", status: "Inactive" },
    { id: 3, name: "Faith Hilarde", sport: "Wrestling", experience: "Beginner", status: "Injured" }
  ]

  const coaches: CoachModel[] = [
  {
    id: 1,
    name: "Coach A",
    title: "Head Coach",
    athletes: ["Nikita", "Sonny"],
  },
  {
    id: 2,
    name: "Coach B",
    title: "Coach",
    athletes: ["KJ", "Faith", "Zach"],
  },
  {
    id: 3,
    name: "Coach C",
    title: "Coach",
    athletes: ["Kirby", "Ken", "Cole", "Steve"],
  },
];

  return (  
    <div className='min-h-screen flex flex-col bg-[#bcc8d0]'>
      <Header
        projectName="Gym Class Heroes"
        projectDescription="Workout Management System"
      />
      <section className='flex flex-1 justify-center gap-5'>
          <AthleteList title="Athletes" athlete={athlete} />
          
          <section>
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
          </section>
          
          <section>
              {coaches.map((coach) => (
                  <Coaches id={coach.id} name={coach.name} title={coach.title} athletes=   {coach.athletes}
                  />
          ))}
          </section>
          
      </section>

      <Footer names={["Faith Hilarde","Nikita Kurakin", "Hoang Son Nguyen"]} />    
    </div>
  );
}

export default App
