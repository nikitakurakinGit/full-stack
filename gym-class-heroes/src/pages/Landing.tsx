import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Footer from "../components/footer/footer";

export default function Landing() {
  return (
    <>
        <div className='min-h-screen flex flex-col bg-[#bcc8d0]"'>
            <div className="flex flex-1 justify-center items-center">
                <SignedOut>
                    <div>
                    <h1>Welcome</h1>
                    <SignInButton />
                    </div>
                </SignedOut>

                <SignedIn>
                    <Navigate to="/coaches"/>
                </SignedIn>
                
            </div>
                <Footer names={["Faith Hilarde","Nikita Kurakin", "Hoang Son Nguyen"]}/>
        </div>
    </>
  );
}