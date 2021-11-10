import React, { useEffect, useState } from 'react';
import Jimp from 'jimp';
import JimpTypes from '../types';

interface Options {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
  loadBlur?: boolean;
  apply: typeof JimpTypes[];
}

const Jimage: React.FC<Options> = (props) => {
  const jimp_actions = props.apply as unknown as string[];
  const { src, style, width, height, alt, className, loadBlur } = props;

  const [image, setImage] = useState<any>(src);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function imgEffect() {
      const jimpImage = await Jimp.read(src);

      for (let i = 0; i < jimp_actions.length; i++) {
        const Effect = jimp_actions[i];
        jimpImage[Effect]();
      }

      const mime = await jimpImage.getBase64Async(Jimp.MIME_JPEG);
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

export default Jimage;
