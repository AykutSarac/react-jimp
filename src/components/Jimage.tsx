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

      /* for (const option in jimp_actions) {
        if (typeof loadImage[option] !== 'function') continue;
        const IMG_PARAMS = options[option];

        if (typeof IMG_PARAMS === 'boolean') {
          // Perform if boolean true
          if (IMG_PARAMS === true) loadImage[option]();
        } else if (IMG_PARAMS.includes('true')) {
          // Get parameters as boolean
          const GET_PARAMS = IMG_PARAMS.split(',');
          const BOOL_PARAMS = GET_PARAMS.map((bool: string) => bool.includes('true'));
          loadImage[option](...BOOL_PARAMS);
        } else if (option === ) {
          // Color manipulation
          loadImage.color(options[option]);
        } else {
          // Take parameters and convert to int
          const PARAMS_ARR = IMG_PARAMS.split(',');
          const FLOAT_PARAMS = PARAMS_ARR.map((opt: string) => parseFloat(opt));

          // Perform method
          loadImage[option](...FLOAT_PARAMS);
        }
      } */

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
