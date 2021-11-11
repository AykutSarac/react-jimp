import React from 'react';
import { read, MIME_JPEG } from 'jimp';
import JimpTypes from '../types';

interface Jimp {
  [key: string]: typeof JimpTypes;
}

interface Options {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
  loadBlur?: boolean;
  jimp: Jimp
}

export const Jimage: React.FC<Options> = ({ src, style, width, height, alt, className, loadBlur, jimp: apply }) => {
  const [image, setImage] = React.useState(src);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function imgEffect() {
      const jimpImage = await read(src);

      jimpImage[apply as unknown as string]();

      const mime = await jimpImage.getBase64Async(MIME_JPEG);
      setLoading(false);
      setImage(mime);
    }

    imgEffect();
    return () => setLoading(true);
  }, [src, apply as unknown as string]);

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
