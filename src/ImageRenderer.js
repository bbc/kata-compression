
import React, { useRef, useEffect, useState } from 'react'

const ImageRenderer = ({imageRepresentation, width=10, height=10, shades=2, callback}) => {

    const [canvasContext, setCanvasContext] = useState();

    const canvasRef = useRef(null)
  
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        const cwidth = canvas.clientWidth;
        const cheight = canvas.clientHeight;

        // If it's resolution does not match change it
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
        setCanvasContext(context);
    }, [imageRepresentation])
    
    useEffect(() => {
        if (canvasContext && imageRepresentation) {
            draw(imageRepresentation);
        }
    }, [canvasContext, imageRepresentation]);

    const draw = (image) => {
        canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        var pixelPos = 0;
        for (var y = 0 ; y < height ; y++) {
            for (var x = 0 ; x < width ; x++) {
                const colourForCell = deriveColourForCell(imageRepresentation[pixelPos++]);
                canvasContext.fillStyle = colourForCell;
                canvasContext.fillRect( x, y, 1, 1 );
            }
        }
        callback && callback();
    }

    const deriveColourForCell = (cellValue) => {
        if (!cellValue) cellValue = 0;
        
        const greyProportion = parseInt(cellValue, 16) / (shades-1);
        const greyHex = Math.floor(0xFF * greyProportion).toString(16);
        const colourForCell = `#${greyHex}${greyHex}${greyHex}`

        //return '#0000ff';
        return colourForCell;
    };

    const renderRow = (startPos) => {
        return Array(width).fill().map(w => {
            //return <div style={[cellStyle, { backgroundColor: deriveColourForCell(imageRepresentation[i++])}]}></div>
            const colourForCell = deriveColourForCell(imageRepresentation[startPos++]);
            return <div style={{ width: 2, height: 2, backgroundColor: colourForCell}}></div>
        })
    }
    const renderImage = () => {
        var i = 0;
        return Array(height).fill().map(h => {
            const row = (
                <div style={{flexDirection: 'row', display: 'flex'}}>
                    { renderRow(i) }
                </div>
            );
            i = i + width;
            return row;
        });
    }

    return (
        <div style={{width: width, height: height}}>
            <canvas ref={canvasRef}/>
            { false && renderImage() }
        </div>
    );
}

export default ImageRenderer;