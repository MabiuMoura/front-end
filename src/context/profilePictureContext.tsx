import React, { createContext, useContext, useState } from 'react';

interface ProfilePictureContextType {
  triggerRefresh: () => void;
  refreshTrigger: number;
}

const ProfilePictureContext = createContext<ProfilePictureContextType>({
  triggerRefresh: () => {},
  refreshTrigger: 0
});

export const ProfilePictureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <ProfilePictureContext.Provider value={{ triggerRefresh, refreshTrigger }}>
      {children}
    </ProfilePictureContext.Provider>
  );
};

export const useProfilePicture = () => useContext(ProfilePictureContext);