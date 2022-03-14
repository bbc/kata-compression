import React, { useState, useEffect, useMemo, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageRenderer from '../../utils/ImageRenderer';
import TestImagesList from './TestImagesList';
import BusyScrim from '../../utils/BusyScrim';
import {CompressLossy, CompressGreyScale, CompressMono, DecompressGreyscale, DecompressMono} from '../../utils/Compress';

const KataMain = () => {
  const [decompressedImageText, setDecompressedImageText] = useState('');
  const [decompressedImageTextChanged, setDecompressedImageTextChanged] = useState(false);
  const [compressedImageText, setCompressedImageText] = useState('');
  const [compressionPercentage, setCompressionPercentage] = useState();
  const [decompressedImageArray, setDecompressedImageArray] = useState([]);
  const [lossyCompressionAmount, setLossyCompressionAmount] = useState(3);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [shades, setShades] = useState(2);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setDecompressedImageTextChanged(true);
    generateImage()
}, [decompressedImageText]);

useEffect(() => {
  const newCompressionPercentage = 100-Math.ceil((compressedImageText.length/decompressedImageText.length)*100);
  setCompressionPercentage(newCompressionPercentage);
}, [compressedImageText]);

  const generateImage = () => {
    const imageArray = decompressedImageText.replace(/\s+/g, '').split("");

    setDecompressedImageTextChanged(false);
    setDecompressedImageArray(imageArray);
  }

  const imageSelected = (image) => {
    setWidth(image.width);
    setHeight(image.height);
    setShades(image.shades);
    setDecompressedImageText(image.content);
    setCompressedImageText('');
  }

  const compressImage = async () => {
    setBusy(true);
    setCompressedImageText('');
    if (shades === 2) {
      const incomingCompressedImageText = await CompressMono(decompressedImageText);
      setCompressedImageText(incomingCompressedImageText);
    } else {
      const incomingCompressedImageText = await CompressGreyScale(decompressedImageText);
      setCompressedImageText(incomingCompressedImageText);
    }
    setBusy(false);
  }

  const compressLossy = async () => {
    setBusy(true);
    setCompressedImageText('');
    if (shades === 2) {
      alert('Cannot compress lossy on a 2 shade image')
    } else {
      const incomingCompressedImageText = await CompressLossy(decompressedImageText, parseInt(lossyCompressionAmount));
      setCompressedImageText(incomingCompressedImageText);
    }
    setBusy(false);
  }

  const decompressImage = async () => {
    setBusy(true);
    setDecompressedImageText('');
    if (shades === 2) {
      const incomingDecompressedImageText = await DecompressMono(compressedImageText);
      setDecompressedImageText(incomingDecompressedImageText);
    } else {
      const incomingDecompressedImageText = await DecompressGreyscale(compressedImageText);
      setDecompressedImageText(incomingDecompressedImageText);
    }
    setBusy(false);
  }

  return (
    <div>
        <p>This page contains some test functionality to help with the Compression Kata.</p>
        <p>Select an image from the list to load up the Decompressed content.  Select <b>-New-</b> to clear the fields and start from scratch.</p>
        <p>Pressing the <b>Compress</b> or <b>Compress Lossy</b> buttons will use the reference compression implementation.</p>
        <p>Pressing the <b>Decompress</b> button will decompress the contents of the <b>Compressed</b> text area into the <b>Decompressed</b> text area</p>
        <div className="form-group">
          
          <div style={{width: 400}}>
            <label htmlFor="width">Select Image</label>
            <TestImagesList selectionCallback={imageSelected}/>
          </div>
        </div>
        <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
          <div className="form-group" >
            <label htmlFor="width">Width</label>
            <input
              type="text"
              className="form-control"
              id="width"
              name="width"
              value={width}
              onChange={event => setWidth(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shades">Height</label>
            <input
              type="text"
              className="form-control"
              id="height"
              name="height"
              value={height}
              onChange={event => setHeight(event.target.value)}
            />
          </div>
        </div>
        <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
          <div className="form-group" >
            <label htmlFor="shades">Shades</label>
            <input
              type="text"
              className="form-control"
              id="shades"
              name="shades"
              value={shades}
              onChange={event => setShades(event.target.value)}
            />
          </div>
          <div className="form-group">
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
        </div>
        <div className="form-group">
          <label htmlFor="decompressedImageText">Decompressed <label htmlFor="notes" className="smallText">{decompressedImageText.length}</label></label>
          <textarea
              style={{height: 100}}
              type="text"
              className="form-control"
              id="decompressedImageText"
              name="decompressedImageText"
              value={decompressedImageText}
              onChange={event => setDecompressedImageText(event.target.value)}
            />
        </div>
        <div className="form-group">
          <label htmlFor="compressedImageText">Compressed <label htmlFor="compressedImageText" className="smallText">{`${compressedImageText.length}(${compressionPercentage}%)`}</label></label>
          <textarea
              style={{height: 100}}
              type="text"
              className="form-control"
              id="compressedImageText"
              name="compressedImageText"
              value={compressedImageText}
              onChange={event => setCompressedImageText(event.target.value)}
            />
        </div>
        <button
          disabled={!decompressedImageText}
          className="btn btn-primary"
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
          className="btn btn-primary"
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
              Compress
            </div>
          </span>
        </button>

        <button
          disabled={!decompressedImageText}
          className="btn btn-primary"
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
          className="btn btn-primary"
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
              Decompress
            </div>
          </span>
        </button>
        <div className="form-group">
          <label htmlFor="compressedImageText">Image</label>
          <ImageRenderer imageRepresentation={decompressedImageArray} width={parseInt(width)} height={parseInt(height)} shades={shades} callback={ () => console.log('done')}/>
        </div>
      </div>
  );
}

export default KataMain;
