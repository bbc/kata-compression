
import React, { useRef, useEffect, useState } from 'react'

import p from './test-images/bird.pgm-321-481-16.txt';

const TestImagesList = ({selectionCallback}) => {

    const [canvasContext, setCanvasContext] = useState();
    const [images, setImages] = useState([]);
    console.log(p);
    useEffect(() => {
        setImages([
            { name: 'bird', content: p},
            { name: 'baboon-2', content: require('./test-images/baboon.pgm-512-512-2.lee').default},
            { name: 'baboon-16', content: require('./test-images/baboon.pgm-512-512-16.lee').default}
        ]);
    }, []);

    const renderImageList = () => {
        return images.map(image => {
            return <li className="noStyle"><a onClick={() => selectionCallback(image)}>{image.name}</a></li>
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