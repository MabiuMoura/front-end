import React, { useCallback, useEffect, useState } from 'react';
import { users } from '../../services/endpoints';
import Cookies from 'js-cookie';
import { useProfilePicture } from '../../context/profilePictureContext';


interface ProfilePictureProps {
  userId?: string;
  name: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  userId,
  name,
  className,
  onClick,
  style
}) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { refreshTrigger } = useProfilePicture();

  const fetchProfilePicture = useCallback(async () => {
    if (!userId) return;
    
    try {
      const userCookie = Cookies.get('user');
      if (!userCookie) {
        setProfilePicture(null);
        return;
      }

      const userData = JSON.parse(userCookie);
      
      if (!userData?.avatar) {
        setProfilePicture(null);
        return;
      }

      const response = await users.profilePictureGet(userId);
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

      const imageUrl = `data:${response.headers['content-type']};base64,${base64}`;
      setProfilePicture(imageUrl);
    } catch (error) {
      console.error('Erro ao carregar foto de perfil:', error);
      setProfilePicture(null);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfilePicture();

    return () => {
      if (profilePicture) {
        URL.revokeObjectURL(profilePicture);
      }
    };
  }, [fetchProfilePicture, refreshTrigger]); 

  return profilePicture ? (
    <img
      src={profilePicture}
      alt={name}
      className={className}
      onClick={onClick}
      style={style}
    />
  ) : (
    <div 
      className={className}
      onClick={onClick}
      style={style}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};