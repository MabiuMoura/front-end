import React, { useCallback, useEffect, useState } from "react";
import { insigniaIcons } from "../../../../../../services/endpoints";
import Cookies from "js-cookie";

interface IconFetchProps {
  iconId?: string;
  name: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const IconFetch: React.FC<IconFetchProps> = ({
  iconId,
  name,
  className,
  onClick,
  style,
}) => {
  const [iconFecth, setIconFetch] = useState<string | null>(null);

  const fetchIconFetch = useCallback(async () => {
    if (!iconId) return;

    try {
      const userCookie = Cookies.get("user");
      if (!userCookie) {
        setIconFetch(null);
        return;
      }

      const userData = JSON.parse(userCookie);

      if (userData?.insignias?.length === 0) {
        setIconFetch(null);
        return;
      }

      const response = await insigniaIcons.fetchIconStatic(iconId);
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      const imageUrl = `data:${response.headers["content-type"]};base64,${base64}`;
      setIconFetch(imageUrl);
    } catch (error) {
      console.error("Erro ao carregar ícone:", error);
      setIconFetch(null);
    }
  }, [iconId]);

  useEffect(() => {
    fetchIconFetch();

    return () => {
      if (iconFecth) {
        URL.revokeObjectURL(iconFecth);
      }
    };
  }, [fetchIconFetch]);

  return iconFecth ? (
    <img
      src={iconFecth}
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
