import { useState } from "react";
import Popup from '../components/Popup'



interface NavBarProps {
  imageSrcPath?: string;

}

function ProfileNavBar() {
  return (
    <nav className="bg-white dark:bg-black shadow-md p-4">
      <div className="container mx-auto flex justify-start space-x-4">
        <button className="bg-transparent text-black dark:text-white px-4 py-2 rounded hover:bg-blue-600">
          My profile
        </button>
        <button className="bg-transparent text-black dark:text-white px-4 py-2 rounded hover:bg-green-600"> 
          How to play
        </button>
      </div>
      <div className="container mx-auto flex justify-end space-x-6">

      </div>
    </nav>
  );
}


export default ProfileNavBar;
