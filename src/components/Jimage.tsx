import React from 'react';
import { read, MIME_JPEG } from 'jimp';
import JimpTypes from '../types';

type JimpActions = typeof JimpTypes;

interface Options {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
  loadBlur?: boolean;
  apply: JimpActions[];
}

export const Jimage: React.FC<Options> = ({
  src,
  style,
  width,
  height,
  alt,
  className,
  loadBlur,
  apply,
}) => {
  const jimp_actions = apply as unknown as string[];
  
  const [image, setImage] = React.useState(src);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function imgEffect() {
      const jimpImage = await read(src);

      jimpImage[jimp_actions[0]]();

      const mime = await jimpImage.getBase64Async(MIME_JPEG);
      setLoading(false);
      setImage(mime);
    }

    imgEffect();
    return () => setLoading(true);
  }, [src, jimp_actions]);

  return (
    <img
      className={className && className}
      alt={alt && alt}
      src={image}
      width={width && width}
      height={height && height}
      style={loading && loadBlur ? { filter: 'blur(3px)' } : style}
    />
  );
};
