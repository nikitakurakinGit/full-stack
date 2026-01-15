import './App.css'
import Footer from './components/footer/footer';
import {Header} from './components/header/header';

function App() {
  return (
    <div>
      <Header
        projectName="Gym Class Heroes"
        projectDescription="Workout Management System"/>
      <Footer names={["Faith Hilarde","Nikita Kurakin", "Hoang Son Nguyen"]} />
    </div>
  );
}

export default App
