import React, { useCallback, useEffect, useState } from "react";
import { users } from "../../services/endpoints";

interface ProfilePictureByIdProps {
  photoId?: string;
  name: string; 
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const ProfilePictureById: React.FC<ProfilePictureByIdProps> = ({
  photoId,
  name,
  className,
  onClick,
  style,
}) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const fetchProfilePicture = useCallback(async () => {
    if (!photoId) {
      setProfilePicture(null);
      return;
    }

    try {
      const response = await users.profilePictureGetIdImage(photoId);
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const imageUrl = `data:${response.headers["content-type"]};base64,${base64}`;
      setProfilePicture(imageUrl);
    } catch (error) {
      console.error("Erro ao carregar foto de perfil:", error);
      setProfilePicture(null);
    }
  }, [photoId]);

  useEffect(() => {
    fetchProfilePicture();

    return () => {
      if (profilePicture) {
        URL.revokeObjectURL(profilePicture);
      }
    };
  }, [fetchProfilePicture]);

  return profilePicture ? (
    <img
      src={profilePicture}
      alt={name}
      className={className}
      onClick={onClick}
      style={style}
    />
  ) : (
    <div className={className} onClick={onClick} style={style}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
};