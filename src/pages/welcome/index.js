import React, { useState, useEffect, useMemo, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageRenderer from '../../utils/ImageRenderer';

const testcardImage = require('../../test-images/testcard.pgm-240-180-16.lee').default;
const helloImage = require('../../test-images/hello.pgm-113-79-2.lee').default;
const pepperImage = require('../../test-images/pepper.pgm-256-256-16.lee').default;

const Welcome = () => {
  
  const renderChallenge1 = () => {
    return (
      <div>
        <h3>Challenge 1 - RLE Mono</h3>
        For a non-compressed monochrome image with pixels represented by 0 and 1 (use hello as test image):
        <div style={{width: 113, height: 79}}>
          <ImageRenderer imageRepresentation={helloImage} width={113} height={79} shades={2}/>
        </div>
        <ol>
          <li>Create a Compression function</li>
          <li>Create a Decompression function</li>
        </ol>
      </div>
    )
  };

  const renderChallenge2 = () => {
    return (
      <div>
        <h3>Challenge 2 - RLE Greyscale</h3>
        For a non-compressed greyscale image with pixels represented by 0-0xF (use testcard-16 as test image):
        <div style={{width: 240, height: 180}}>
          <ImageRenderer imageRepresentation={testcardImage} width={240} height={180} shades={16}/>
        </div>
        <ol>
          <li>Create a Greyscale RLE Compression function</li>
          <li>Create a Greyscale RLE Decompression function</li>
        </ol>
      </div>
    )
  };

  const renderChallenge3 = () => {
    return (
      <div>
        <h3>Challenge 3 - Lossy Greyscale with RLE</h3>
        
        <p>Lossy compression is where we sacrifice some (image) detail to enable a smaller compressed size.  There's a brief explanation <a href='https://www.csfieldguide.org.nz/en/chapters/coding-compression/lossy-vs-lossless/'>here (again at CSFieldGuide NZ)</a></p>
        <p>You may have noticed that sometimes, the output from RLE ends up being larger than the input!  This is often the case for complex images with a large amount of detail.</p>
        <p>Use a basic algorithm to determine if pixel <i>n</i> is roughly similar to pixel <i>n+1</i>.  If it is, then treat them as if they were exactly equal.  The function to determine if the pixels are roughly similar is up to you.</p>
        <p>My sample implementation (which has a number of shortfalls!) just does this:</p>
        <pre>{`Math.abs(parseInt(pixel1, 16)-parseInt(pixel2, 16)) < tol`}</pre> Where tol is the "compression level".
        <div style={{xwidth: 256, xheight: 256}}>
          <ImageRenderer imageRepresentation={pepperImage} width={256} height={256} shades={16}/>
        </div>
        <p>The Greyscale decompression function that you created in Challenge 2 should be capable of Decompressing this lossy output, so all you need to do here is:</p>
        <ol>
          <li>Create a Greyscale Lossy RLE Compression function</li>
        </ol>
      </div>
    )
  };

  const renderChallengeBonus = () => {
    return (
      <div>
        <h3>Bonus Challenge - Renderer</h3>
        
        <p>As you will have gathered, this Kata uses a custom image format, loosely based on pgm</p>
        <p>I created a <a href='https://github.com/bbc/kata-compression/blob/main/src/utils/ImageRenderer.js'>basic renderer using React</a></p>
        <p>As a Bonus Challenge, why not try creating a renderer using a different technology?</p>
        <p>Here's an extract of the one I created:</p>
        <pre>
          {`
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
}`}
        </pre>
      </div>
    )
  };

  return (
    <div className="App">
      <p>Hello!  Welcome to the Compression Kata</p>
      <h2>Introduction</h2>
      <p>This Kata focuses on basic compression techniques, using images.  The challenges increase in complexity, but should be accessible to all levels of Engineer.</p>
      <p>All of the challenges are based on a very simple form of compression called Run-Length Encoding.  There is a great video of this in action <a href='https://www.csfieldguide.org.nz/en/chapters/coding-compression/run-length-encoding/'>here (CSFieldGuide NZ)</a></p>
      <p>The [Test] Tab contains some sample images, and a means of Compressing, Decompressing, and rendering the images.</p>
      <p>The Test images are all single digit hex-encoded pixels, ranging from 1 bit (i.e. Mono) to 4 bit (i.e. 16 shades) - this approach was chosen for its simplicity.  The images are similar to .pbm or .pgm images, with some simplifications.  I wrote a <a href='https://github.com/bbc/kata-compression/blob/main/pgm-to-kata.c'>simple converter (in c)</a> to convert from .pgm to this bespoke kata file format - you can use this to generate your own test images if you like!</p>
      <p>You will see that I have chosen to comma separate my RLE-encoded text - you can use any means of separating as you see fit.  Comma separated results in a very verbose output (sometimes larger than the decompressed source!) but is readable and easy to parse.
        You just need to be able to Decompress your compressed output!
      </p>
      <h2>The Challenges</h2>
      {renderChallenge1()}
      {renderChallenge2()}
      {renderChallenge3()}
      {renderChallengeBonus()}
      <div>
      
      </div>
    </div>
  );
}

export default Welcome;
