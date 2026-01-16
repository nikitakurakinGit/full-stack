import './App.css'
import { AthleteList } from './components/athletes/athletes'; 
import Footer from './components/footer/footer';
import type { Athletes } from './components/interface/athletes';


function App() {
  const athlete: Athletes[] = [
    { id: 1, name: "Hoang Son Nguyen", sport: "Soccer", experience: "Advanced", status: "Active" },
    { id: 2, name: "Nikita Kurakin", sport: "Basketball", experience: "Intermediate", status: "Inactive" },
    { id: 3, name: "Faith Hilarde", sport: "Wrestling", experience: "Beginner", status: "Injured" }
  ]

  return (
    <div>

      <AthleteList title="Athletes" athlete={athlete} />
      
      <Footer names={["Faith Hilarde","Nikita Kurakin", "Hoang Son Nguyen"]} />
    </div>
  );
}

export default App
