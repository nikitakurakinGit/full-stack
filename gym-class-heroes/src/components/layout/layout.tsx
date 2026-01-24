import { Outlet } from "react-router-dom";
import Header from '../header/header';
import Footer from '../footer/footer';


// outlet component has pages injected dynamically
export function Layout() {
    return(
        <>
            <div className='min-h-screen flex flex-col bg-[#bcc8d0]'>
                <Header
                    projectName="Gym Class Heroes"
                    projectDescription="Workout Management System"
                />
            
                <section className='flex flex-1 justify-center gap-5'>
                    <Outlet />
                </section>
                <Footer names={["Faith Hilarde","Nikita Kurakin", "Hoang Son Nguyen"]} />

            </div>
        </>
    )
}