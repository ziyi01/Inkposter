import React, { useEffect, useState } from 'react';
import ProfilePageView from '../views/profile';
import { UserModel } from '../userModel';
import Cookies from 'js-cookie';

interface ProfilePresenterProps {
  handleLogout: () => void; // Define the handleLogout prop
  model: UserModel;
}

const ProfilePagePresenter: React.FC<ProfilePresenterProps> = ({ handleLogout, model }) => {
  const [name, setName] = useState(model.name); 
  const [points, setPoints] = useState([
    {title: 'Wins as innocent', value: '0'},
    {title: 'Losses as innocent', value: '0'},
    {title: 'Wins as Inkposter', value: '0'},
    {title: 'Losses as Inkposter', value: '0'},]);

  useEffect(() => {
    fillModelData();
  }, [])
  

  const fillModelData = async () => {
    if (Cookies.get('uniqueId') !== model.playerId && Cookies.get('uniqueId') !== undefined) {
      await model.login(Cookies.get('uniqueId')!);
    }
    
    setName(model.name);

    setPoints([
      { title: 'Wins as innocent', value: model.profileStats.innocent.wins.toString() },
      { title: 'Losses as innocent', value: model.profileStats.innocent.losses.toString() },
      { title: 'Wins as Inkposter', value: model.profileStats.inkposter.wins.toString() },
      { title: 'Losses as Inkposter', value: model.profileStats.inkposter.losses.toString() },
    ]);
  }

  return (
    <div>
      <ProfilePageView
        name={name} // Pass the name variable here
        points={points} // Pass the points array here
        onLogout={handleLogout} // Pass the handleLogout function here
      />
    </div>
  );
};

export default ProfilePagePresenter;