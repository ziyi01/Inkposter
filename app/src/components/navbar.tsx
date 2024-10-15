import { useState } from "react";
import Modal from "react-modal";
import Button from "../components/button";

// Accessibility: Bind the modal to the app root element
Modal.setAppElement("#root");

function ProfileNavBar() {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isHowToPlayModalOpen, setHowToPlayModalOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-black shadow-md p-4">
      <div className="container flex justify-start">
        {/* Game Title */}
        <h1
          className="text-4xl text-black dark:text-white font-bold"
        >
          INKPOSTER
        </h1>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <button
            className="bg-transparent">
          </button>
          <button   
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
            onClick={() => setProfileModalOpen(true)}
          >
            MY PROFILE
          </button>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
            onClick={() => setHowToPlayModalOpen(true)}
          >
            HOW TO PLAY
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onRequestClose={() => setProfileModalOpen(false)}
        contentLabel="Profile Modal"
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-1/3 mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">My Profile</h2>
        <p>Here is your profile information...</p>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setProfileModalOpen(false)}
        >
          Close
        </button>
      </Modal>

      {/* How to Play Modal */}
      <Modal
        isOpen={isHowToPlayModalOpen}
        onRequestClose={() => setHowToPlayModalOpen(false)}
        contentLabel="How to Play Modal"
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-1/3 mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">How to Play</h2>
        <p>Here are the game instructions...</p>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setHowToPlayModalOpen(false)}
        >
          Close
        </button>
      </Modal>
    </nav>
  );
}

export default ProfileNavBar;
