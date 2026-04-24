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

  return (
    <>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
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
          animation: slideInUp 0.6s ease-out forwards;
          margin: 0 0.05em;
        }

        .banner-letter:nth-child(1) { animation-delay: 0.1s; }
        .banner-letter:nth-child(2) { animation-delay: 0.15s; }
        .banner-letter:nth-child(3) { animation-delay: 0.2s; }
        .banner-letter:nth-child(4) { animation-delay: 0.25s; }
        .banner-letter:nth-child(5) { animation-delay: 0.3s; }
        .banner-letter:nth-child(6) { animation-delay: 0.35s; }
        .banner-letter:nth-child(7) { animation-delay: 0.4s; }
        .banner-letter:nth-child(8) { animation-delay: 0.45s; }
        .banner-letter:nth-child(9) { animation-delay: 0.5s; }
        .banner-letter:nth-child(10) { animation-delay: 0.55s; }
        .banner-letter:nth-child(11) { animation-delay: 0.6s; }
        .banner-letter:nth-child(12) { animation-delay: 0.65s; }
        .banner-letter:nth-child(13) { animation-delay: 0.7s; }
        .banner-letter:nth-child(14) { animation-delay: 0.75s; }
        .banner-letter:nth-child(15) { animation-delay: 0.8s; }
        .banner-letter:nth-child(16) { animation-delay: 0.85s; }

        .banner-text:hover .banner-letter {
          filter: drop-shadow(0 0 12px rgba(34, 37, 39, 0.6));
        }
      `}</style>

      <div className="flex flex-col w-full px-6 py-4 mx-auto">
        <SignedOut>
          <div className="flex flex-col justify-center items-center gap-8">
            {/* BANNER WITH INTRO EFFECT */}
            <div className="flex justify-center items-center my-8">
              <h1 className="banner-text">
                <span className="banner-letter">G</span>
                <span className="banner-letter">Y</span>
                <span className="banner-letter">M</span>
                <span className="banner-letter"> </span>
                <span className="banner-letter">C</span>
                <span className="banner-letter">L</span>
                <span className="banner-letter">A</span>
                <span className="banner-letter">S</span>
                <span className="banner-letter">S</span>
                <span className="banner-letter"> </span>
                <span className="banner-letter">H</span>
                <span className="banner-letter">E</span>
                <span className="banner-letter">R</span>
                <span className="banner-letter">O</span>
                <span className="banner-letter">E</span>
                <span className="banner-letter">S</span>
              </h1>
            </div>

            <p className="text-xl font-semibold text-gray-700">Workout Management System</p>
            <SignInButton />
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