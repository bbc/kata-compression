import './App.css';
import React, { useState, useEffect, useMemo, useRef } from "react";
import ImageRenderer from './ImageRenderer';
import TestImagesList from './TestImagesList';
import {CompressLossy, CompressGreyScale, CompressMono, DecompressGreyscale, DecompressMono} from './Compress';

const App = () => {
  const [decompressedImageText, setDecompressedImageText] = useState('');
  const [compressedImageText, setCompressedImageText] = useState('');
  const [decompressedImageArray, setDecompressedImageArray] = useState([]);
  const [lossyCompressionAmount, setLossyCompressionAmount] = useState(3);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [shades, setShades] = useState(2);

  const generateImage = () => {
    const imageArray = decompressedImageText.replace(/\s+/g, '').split("");

    setDecompressedImageArray(imageArray);
  }

  const imageSelected = (image) => {
    setDecompressedImageText(image.content);
  }

  const compressImage = () => {
    if (shades === 2) {
      const incomingCompressedImageText = CompressMono(decompressedImageText);
      setCompressedImageText(incomingCompressedImageText);
    } else {
      const incomingCompressedImageText = CompressGreyScale(decompressedImageText);
      setCompressedImageText(incomingCompressedImageText);
    }
  }

  const compressLossy = () => {
    if (shades === 2) {
      alert('Cannot compress lossy on a 2 shade image')
    } else {
      const incomingCompressedImageText = CompressLossy(decompressedImageText, parseInt(lossyCompressionAmount));
      setCompressedImageText(incomingCompressedImageText);
    }
  }

  const decompressImage = () => {
    if (shades === 2) {
      const incomingDecompressedImageText = DecompressMono(compressedImageText);
      setDecompressedImageText(incomingDecompressedImageText);
    } else {
      const incomingDecompressedImageText = DecompressGreyscale(compressedImageText);
      setDecompressedImageText(incomingDecompressedImageText);
    }
  }

  return (
    <div className="App">
      <h1>HELLO</h1>
      <TestImagesList selectionCallback={imageSelected}/>
      <div className="form-group">
        <label htmlFor="width">Dimensions</label>
        <input
          type="text"
          className="form-control"
          id="width"
          name="width"
          value={width}
          onChange={event => setWidth(event.target.value)}
        />
        <input
          type="height"
          className="form-control"
          id="height"
          name="height"
          value={height}
          onChange={event => setHeight(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="shades">Shades</label>
        <input
          type="text"
          className="form-control"
          id="shades"
          name="shades"
          value={shades}
          onChange={event => setShades(event.target.value)}
        />
        <label htmlFor="shades">Lossy</label>
        <input
          type="text"
          className="form-control"
          id="lossy"
          name="lossy"
          value={lossyCompressionAmount}
          onChange={event => setLossyCompressionAmount(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="decompressedImageText">Decompressed Image</label>
        <textarea
            style={{height: 100}}
            type="text"
            className="form-control"
            id="decompressedImageText"
            name="decompressedImageText"
            value={decompressedImageText}
            onChange={event => setDecompressedImageText(event.target.value)}
          />
        <label htmlFor="notes" className="smallText">{decompressedImageText.length}</label>
      </div>
      <div className="form-group">
        <label htmlFor="compressedImageText">Compressed Image</label>
        <textarea
            style={{height: 100}}
            type="text"
            className="form-control"
            id="compressedImageText"
            name="compressedImageText"
            value={compressedImageText}
          />
          <label htmlFor="compressedImageText" className="smallText">{compressedImageText.length} ({(Math.ceil((compressedImageText.length/decompressedImageText.length)*100))}%)</label>
      </div>
      <button
        disabled={!decompressedImageText}
        className="btn btn-outline-secondary"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          generateImage();
        }}
      >
        <span>
          <div style={{fontSize: 22}}>
            <i className="fas fa-plus-circle action"></i>
          </div>
          <div style={{fontSize: 10}}>
            Generate Image
          </div>
        </span>
      </button>

      <button
        disabled={!decompressedImageText}
        className="btn btn-outline-secondary"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          compressImage();
        }}
      >
        <span>
          <div style={{fontSize: 22}}>
            <i className="fas fa-plus-circle action"></i>
          </div>
          <div style={{fontSize: 10}}>
            Compress Image
          </div>
        </span>
      </button>

      <button
        disabled={!decompressedImageText}
        className="btn btn-outline-secondary"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          compressLossy();
        }}
      >
        <span>
          <div style={{fontSize: 22}}>
            <i className="fas fa-plus-circle action"></i>
          </div>
          <div style={{fontSize: 10}}>
            Compress Lossy
          </div>
        </span>
      </button>

      <button
        disabled={!compressedImageText}
        className="btn btn-outline-secondary"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          decompressImage();
        }}
      >
        <span>
          <div style={{fontSize: 22}}>
            <i className="fas fa-plus-circle action"></i>
          </div>
          <div style={{fontSize: 10}}>
            Decompress Image
          </div>
        </span>
      </button>
      <ImageRenderer imageRepresentation={decompressedImageArray} width={parseInt(width)} height={parseInt(height)} shades={shades}/>
    </div>
  );
}

export default App;
