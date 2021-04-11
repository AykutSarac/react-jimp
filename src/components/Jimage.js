import React, { useEffect, useState } from 'react'
import JIMP from 'jimp'

const Jimage = (props) => {
    const options = props;

    const { src, alt, width, height } = options;

    const [image, setImage] = useState(src);
    const [loading, setLoading] = useState(true);
    const _imgDefault = {
        width: width || 'auto',
        height: height || 'auto',
        alt: alt || "image"
    };

    useEffect(() => {

        async function imgEffect() {
            const loadImage = await JIMP.read(src);

            for (const option in options) {

                if (typeof loadImage[option] !== 'function') continue;

                const IMG_PARAMS = options[option];

                if (typeof IMG_PARAMS === 'boolean') {
                    if (IMG_PARAMS === true) loadImage[option]()
                } else if (IMG_PARAMS.includes('true')) {
                    const BOOL_PARAMS = IMG_PARAMS.split(',').map(bool => (bool.includes('true')));
                    loadImage[option](...BOOL_PARAMS)
                } else {
                    // Take parameters and convert to int
                    const PARAMS_ARR = IMG_PARAMS.split(',');
                    const INT_PARAMS = PARAMS_ARR.map(opt => parseInt(opt));

                    // Perform method
                    loadImage[option](...INT_PARAMS);
                }
            }

            const mime = await loadImage.getBase64Async(JIMP.MIME_JPEG);
            setLoading(false);
            setImage(mime);
        }

        imgEffect();
        return () => setLoading(true);
    }, [src, options]);

    if (loading) return (<img alt={_imgDefault.alt} src={image} width={_imgDefault.width} height={_imgDefault.height} style={{ filter: 'blur(5px)' }} />)

    return (<img alt={_imgDefault.alt} src={image} width={_imgDefault.width} height={_imgDefault.height} />)

}

export default Jimage