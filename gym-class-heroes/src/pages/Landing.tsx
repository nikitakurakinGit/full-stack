import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Footer from "../components/footer/footer";

export default function Landing() {
  /**
   * Landing Component
   *
   * This page handles unauthenticated users.
   * If user is signed out, shows welcome message and sign-in button.
   * If user is signed in, redirects to the coaches page.
   */


  const text: string = "GYM  CLASS  HEROS"
  return (
    <>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .banner-text {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          color: #222527;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .banner-letter {
          display: inline-block;
          animation: slideInUp 1s ease-out forwards;
          margin: 0 0.05em;
        }

        .banner-text:hover .banner-letter {
          filter: drop-shadow(0 0 12px rgba(34, 37, 39, 0.6));
        }
      `}</style>

      <div className="flex flex-col min-h-screen">
        <SignedOut>
          <div className="flex-grow flex flex-col justify-center items-center gap-8">
            <div className="flex justify-center items-center my-8">
              <h1 className="banner-text">
                {text.split("").map((letter, i) => (
                  <span
                    key={i}
                    className="banner-letter"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </h1>
            </div>

            <p className="text-xl font-semibold text-gray-700">Workout Management System</p>
            <SignInButton>
              <button className="text-black border border-black rounded-md mt-5 px-3 py-2 bg-white hover:bg-gray-100
                        transition">
                Sign In
              </button>
          </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <Navigate to="/coaches" />
        </SignedIn>

        <Footer names={["Faith Hilarde", "Nikita Kurakin", "Hoang Son Nguyen"]} />
      </div>
    </>
  );
}