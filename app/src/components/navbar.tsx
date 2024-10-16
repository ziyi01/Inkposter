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
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-11/12 sm:w-1/2 md:w-1/3 mx-auto mt-24 fixed inset-0 overflow-y-auto flex items-center justify-center">
        <div className="relative w-full">
          {/* Close Button */}
          <button
            className="absolute top-2 left-2 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setHowToPlayModalOpen(false)}
          >
            Close
          </button>
      
          {/* Modal Content */}
          <div className="p-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">How to Play</h2>
            <p className="mb-2 text-base md:text-lg">Welcome to <span className="font-bold text-blue-600">INKPOSTER</span>—the ultimate blend of drawing, guessing, and deception!</p>
            <p className="mb-2 text-base md:text-lg font-semibold">1. <span className="text-blue-600">Gather your friends</span>: This game is perfect for 3-8 players!</p>
            <p className="mb-2 text-base md:text-lg font-semibold">2. <span className="text-blue-600">Host the fun</span>: One player hosts the game on a larger screen (TV, projector, etc.) while everyone else joins on their phones using a code displayed on the host screen.</p>
            <p className="mb-2 text-base md:text-lg font-semibold">3. <span className="text-blue-600">Get drawing</span>: Once the game starts, players will receive a word to draw, while one sneaky player, the <span className="font-bold text-blue-600">INKPOSTER</span>, gets no prompt and must draw something misleading!</p>
            <p className="mb-2 text-base md:text-lg font-semibold">4. <span className="text-blue-600">Create chaos</span>: The INKPOSTER must blend in while the others draw themed prompts (like robots or nature). Can you spot the liar?</p>
            <p className="mb-2 text-base md:text-lg font-semibold">5. <span className="text-blue-600">Vote wisely</span>: When time’s up, everyone votes on who they think the INKPOSTER is. Points are awarded for correct guesses!</p>
            <p className="mb-2 text-base md:text-lg font-semibold">6. <span className="text-blue-600">Guess the theme</span>: Finally, everyone tries to guess the theme of the drawings. More points await the savvy guessers!</p>
            <p className="text-base md:text-lg font-bold text-center">Get ready for laughs, deception, and creative chaos!</p>
          </div>
        </div>
      </div>
      
      )}
    </nav>
  );
}

export default ProfileNavBar;
