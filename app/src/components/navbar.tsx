import { useState } from "react";
import { Link } from "react-router-dom";

function ProfileNavBar() {
  const [isHowToPlayModalOpen, setHowToPlayModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  return (
    <nav className="bg-white dark:bg-black shadow-md p-4 relative">
      <div className="container flex justify-between items-center">
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 text-black dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Game Title - conditionally rendered NOT WORKING */}
        {!isMenuOpen && (
          <h1 className="text-2xl md:text-4xl text-black dark:text-white font-bold">
            INKPOSTER
          </h1>
        )}

        {/* Navigation Buttons */}
        <div className={`flex space-x-4 md:flex ${isMenuOpen ? "flex" : "hidden"} md:block`}>
          <Link
            to="/profile"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            MY PROFILE
          </Link>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => setHowToPlayModalOpen(true)}
          >
            HOW TO PLAY
          </button>
        </div>
      </div>

      {/* How to Play Modal */}
      {isHowToPlayModalOpen && (
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-1/3 mx-auto mt-24 fixed inset-0 flex items-center justify-center"
          onClick={() => setHowToPlayModalOpen(false)}
        >
          <div className="relative p-4">
            <br></br>
            <h2 className="text-xl font-bold mb-4">How to Play</h2>
            <p>Start a host session on a large, shared screen. Players can now join the game on mobile by entering the room code.</p>
            <br></br>
            <p>All players except one receive <b>prompts</b> belonging to a <b>secret theme</b>. Draw the prompt while keeping an eye on the other masterpieces in the room. What is the theme? Who is the <b>inkposter?</b></p>
            <br></br>
            <p>When the time comes to review, be prepared to argue for your place in the gallery!</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setHowToPlayModalOpen(false)}
            >
              Close
            </button>
            <br></br>
          </div>
        </div>
      )}
    </nav>
  );
}

export default ProfileNavBar;
