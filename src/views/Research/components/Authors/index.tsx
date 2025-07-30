import { useEffect, useState, useMemo } from "react";
import { ResearchProfile } from "../../../../shared/constants/interfaces";
import * as S from "./styles";

import Cookies from "js-cookie";
import { users } from "../../../../services/endpoints";

interface AuthorsProps {
  authors: ResearchProfile[] | undefined;
}

const Authors: React.FC<AuthorsProps> = ({ authors }) => {
  const [images, setImages] = useState<Record<string, string | null>>({});

  const userData = useMemo(() => { // Para ler os cookies apenas uma vez
    const cookie = Cookies.get("user");
    return cookie ? JSON.parse(cookie) : null;
  }, []);

  const fetchProfilePicture = async (userId: string): Promise<string | null> => {
    try {
      
      const response = await users.profilePictureGet(userId);
      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "image/jpeg",
      });

      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result as string;
          sessionStorage.setItem(`avatar-${userId}`, imageUrl);
          resolve(imageUrl);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(`Erro ao carregar imagem de perfil do usuário ${userId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    if (!authors) return;
  
    const fetchImages = async () => {
      const firstThreeAuthors = authors.slice(0, 3);
      const imagesPromises = firstThreeAuthors.map(async (author) => {
        const img = await fetchProfilePicture(author.user.id);
        return { id: author.user.id, img };
      });
  
      const imagesArray = await Promise.all(imagesPromises);
      const imagesMap: Record<string, string | null> = {};
      imagesArray.forEach(({ id, img }) => {
        imagesMap[id] = img;
      });
  
      setImages(imagesMap);
    };
  
    fetchImages();
  }, [authors]);

  if (!authors || authors.length === 0) {
    return <p>Sem autores</p>;
  }

  return (
    <S.AuthorsContainer> 
      {authors.slice(0, 3).map((author, index) => {
        if (!author.user) return null; 
        return (
          <S.AuthorItem key={index} $index={index}>
            <img
              src={images[author.user.id] || ""}
              title={author.user.name}
            />
          </S.AuthorItem>
        );
      })}
    </S.AuthorsContainer>
  );
}
export default Authors;
