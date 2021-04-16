# React JIMP

> JIMP&#x27;s React implementation for image manipulation

[![NPM](https://img.shields.io/npm/v/react-jimp.svg)](https://www.npmjs.com/package/react-jimp) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```bash
npm install --save react-jimp
```

Example usage (width, height and alt are optional):

- Add loadBlur to display blurred image on load

```js
import { Jimage } from "react-jimp";
import testImage from "../assets/testimg.png";

function App() {
  return (
    <div className="App">
      // Pass the props as shown in the documentation
      <Jimage
        src={testImage}
        pixelate="5"
        mirror="true, false"
        greyscale
        color={[{ apply: "hue", params: [-90] }]}
        loadBlur
      />
    </div>
  );
}
```

## Methods

Import the component from package

```js
{
 /* Resize */
 contain: "w, h",  // scale the image to the given width and height, some parts of the image may be letter boxed
 cover: "w, h", // scale the image to the given width and height, some parts of the image may be clipped
 resize: "w, h", // resize the image. Jimp.AUTO can be passed as one of the values.
 scale: "f",  // scale the image by the factor f
 scaleToFit: "w, h",  // scale the image to the largest size that fits inside the given width and height
 // An optional resize mode can be passed with all resize methods.

 /* Crop */
 autocrop: "tolerance, frames", // automatically crop same-color borders from image (if any), frames must be a Boolean
 autocrop: "options",  // automatically crop same-color borders from image (if any), options may contain tolerance, cropOnlyFrames, cropSymmetric, leaveBorder
 crop: "x, y, w, h",  // crop to the given region

 /* Flip and rotate */
 flip: "horz, vert",  // flip the image horizontally or vertically
 mirror: "horz, vert",  // an alias for flip
 rotate: "deg",  // rotate the image clockwise by a number of degrees. Optionally, a resize mode can be passed. If `false` is passed as the second parameter, the image width and height will not be resized.

 /* Colour */

 brightness: "val",  // adjust the brighness by a value -1 to +1
 contrast: "val", // adjust the contrast by a value -1 to +1
 dither565: "bool" , // ordered dithering of the image and reduce color space to 16-bits (RGB565)
 greyscale: "bool",  // remove colour from the image
 invert: "bool",  // invert the image colours
 normalize: "bool",  // normalize the channels in an image

 /* Alpha channel */

 hasAlpha: "bool",  // determines if an image contains opaque pixels
 fade: "f",  // an alternative to opacity, fades the image by a factor 0 - 1. 0 will haven no effect. 1 will turn the image
 opacity: "f",  // multiply the alpha channel by each pixel by the factor f, 0 - 1
 opaque: "bool",  // set the alpha channel on every pixel to fully opaque
 background: "hex",  // set the default new pixel colour (e.g. 0xFFFFFFFF or 0x00000000) for by some operations (e.g. image.contain and

 /* Blurs */

 gaussian: "r",  // Gaussian blur the image by r pixels (VERY slow)
 blur: "r", // fast blur the image by r pixels

 /* Effects */

 posterize: "n",  // apply a posterization effect with n level
 sepia: "bool",  // apply a sepia wash to the image
 pixelate: "size"  // apply a pixelation effect to the image
}
```

## Colour manipulation

```js
<Jimage
 src="./img.jpg"
 color={[
  { apply: 'hue', params: [-90] },
  { apply: 'lighten', params: [50] },
  { apply: 'xor', params: ['#06D'] }
 ]}
>
```

The method supports the following modifiers:

| Modifier                | Description                                                                                                                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **lighten** {amount}    | Lighten the color a given amount, from 0 to 100. Providing 100 will always return white (works through [TinyColor](https://github.com/bgrins/TinyColor))                                                         |
| **brighten** {amount}   | Brighten the color a given amount, from 0 to 100 (works through [TinyColor](https://github.com/bgrins/TinyColor))                                                                                                |
| **darken** {amount}     | Darken the color a given amount, from 0 to 100. Providing 100 will always return black (works through [TinyColor](https://github.com/bgrins/TinyColor))                                                          |
| **desaturate** {amount} | Desaturate the color a given amount, from 0 to 100. Providing 100 will is the same as calling greyscale (works through [TinyColor](https://github.com/bgrins/TinyColor))                                         |
| **saturate** {amount}   | Saturate the color a given amount, from 0 to 100 (works through [TinyColor](https://github.com/bgrins/TinyColor))                                                                                                |
| **greyscale** {amount}  | Completely desaturates a color into greyscale (works through [TinyColor](https://github.com/bgrins/TinyColor))                                                                                                   |
| **spin** {degree}       | Spin the hue a given amount, from -360 to 360. Calling with 0, 360, or -360 will do nothing - since it sets the hue back to what it was before. (works through [TinyColor](https://github.com/bgrins/TinyColor)) |
| **hue** {degree}        | Alias for **spin**                                                                                                                                                                                               |
| **mix** {color, amount} | Mixes colors by their RGB component values. Amount is opacity of overlaying color                                                                                                                                |
| **tint** {amount}       | Same as applying **mix** with white color                                                                                                                                                                        |
| **shade** {amount}      | Same as applying **mix** with black color                                                                                                                                                                        |
| **xor** {color}         | Treats the two colors as bitfields and applies an XOR operation to the red, green, and blue components                                                                                                           |
| **red** {amount}        | Modify Red component by a given amount                                                                                                                                                                           |
| **green** {amount}      | Modify Green component by a given amount                                                                                                                                                                         |
| **blue** {amount}       | Modify Blue component by a given amount                                                                                                                                                                          |

## License

MIT © [AykutSarac](https://github.com/AykutSarac)# React Jimp
JavaScript Image Manipulation Program (JIMP) 's component based React implementation. JIMP is an image processing library for Node written entirely in JavaScript, with zero native dependencies.
