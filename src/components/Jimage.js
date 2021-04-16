import React, { useEffect, useState } from 'react'
import JIMP from 'jimp'

const Jimage = (props) => {
    const options = props;

    const { src, alt, width, height, style, className, loadBlur } = options;

    const [image, setImage] = useState(src);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function imgEffect() {
            const loadImage = await JIMP.read(src);
            
            for (const option in options) {

                if (typeof loadImage[option] !== 'function') continue;
                const IMG_PARAMS = options[option];

                if (typeof IMG_PARAMS === 'boolean') {

                    // Perform if boolean true
                    if (IMG_PARAMS === true) loadImage[option]()

                } else if (IMG_PARAMS.includes('true')) {

                    // Get parameters as boolean
                    const GET_PARAMS = IMG_PARAMS.split(',')
                    const BOOL_PARAMS = GET_PARAMS.map(bool => (bool.includes('true')))
                    loadImage[option](...BOOL_PARAMS)

                } else if (option === 'color') {

                    // Color manipulation
                    loadImage.color(options[option])

                } else {

                    // Take parameters and convert to int
                    const PARAMS_ARR = IMG_PARAMS.split(',');
                    const FLOAT_PARAMS = PARAMS_ARR.map(opt => parseFloat(opt));
                    
                    // Perform method
                    loadImage[option](...FLOAT_PARAMS);
                }
            }

            const mime = await loadImage.getBase64Async(JIMP.MIME_JPEG);
            setLoading(false);
            setImage(mime);
        }

        imgEffect();
        return () => setLoading(true);
    }, [src, options]);


    return (<img
        className={className && className}
        alt={alt && alt}
        src={image} width={width && width}
        height={height && height}
        style={loading && loadBlur ? { filter: 'blur(3px)' } : style}
    />)

}

export default Jimage