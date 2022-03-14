
import React, { useRef, useEffect, useState } from 'react'

const TestImagesList = ({selectionCallback}) => {

    const [canvasContext, setCanvasContext] = useState();
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        setImages([
            { name: '-New-', width: 100, height: 50, shades: 2, content: Array(100*50).fill().map(() => Math.round(Math.random())).join('')},
            { name: 'hello', width: 113, height: 79, shades: 2, content: require('../../test-images/hello.pgm-113-79-2.lee').default},
            { name: 'bird', width: 321, height: 481, shades: 16, content: require('../../test-images/bird.pgm-321-481-16.lee').default},
            { name: 'baboon-2', width: 512, height: 512, shades: 2, content: require('../../test-images/baboon.pgm-512-512-2.lee').default},
            { name: 'baboon-16', width: 512, height: 512, shades: 16, content: require('../../test-images/baboon.pgm-512-512-16.lee').default},
            { name: 'buffalo-16', width: 481, height: 321, shades: 16, content: require('../../test-images/buffalo.pgm-481-321-16.lee').default},
            { name: 'buffalo-8', width: 481, height: 321, shades: 8, content: require('../../test-images/buffalo.pgm-481-321-8.lee').default},
            { name: 'casablanca', width: 460, height: 360, shades: 16, content: require('../../test-images/casablanca.pgm-460-360-16.lee').default},
            { name: 'ladyzhen-2', width: 633, height: 621, shades: 2, content: require('../../test-images/ladyzhenskaya.pgm-633-621-2.lee').default},
            { name: 'ladyzhen-16', width: 633, height: 621, shades: 16, content: require('../../test-images/ladyzhenskaya.pgm-633-621-16.lee').default},
            { name: 'pepper-16', width: 256, height: 256, shades: 16, content: require('../../test-images/pepper.pgm-256-256-16.lee').default},
            { name: 'pepper-2', width: 256, height: 256, shades: 2, content: require('../../test-images/pepper.pgm-256-256-2.lee').default},
            { name: 'surf-16', width: 640, height: 480, shades: 16, content: require('../../test-images/surf.pgm-640-480-16.lee').default},
            { name: 'surf-4', width: 640, height: 480, shades: 4, content: require('../../test-images/surf.pgm-640-480-4.lee').default},
            { name: 'testcard-16', width: 240, height: 180, shades: 16, content: require('../../test-images/testcard.pgm-240-180-16.lee').default},
        ]);
    }, []);

    const renderImageList = () => {
        return images.map(image => {
            return <li className="noStyle" onClick={() => selectionCallback(image)}><b>{image.name}</b>   ({image.width}x{image.height} {image.shades} Shades)</li>
        });
    };

    return (
        <div>
            <ul className="noStyle">
                { renderImageList()}
            </ul>
        </div>
    );
}

export default TestImagesList;