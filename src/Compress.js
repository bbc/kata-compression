//assume 0 start
const CompressMono = (uncompressedImageText) => {
    return Compress(uncompressedImageText, false);
};

const DecompressMono = (compressedImageText) => {
    const uncompressedImage = [];

    const compressedImage = compressedImageText.split(',');
    const len = compressedImage.length;
    var currentColor = 0;
    for (var i = 0 ; i < len ; i++) {
        const encodedNumber = parseInt(compressedImage[i], 16)
        uncompressedImage.push(...(currentColor.toString().repeat(encodedNumber).split('')));
        currentColor = currentColor ? 0 : 1;
    }

    return uncompressedImage.join('');
}

const DecompressGreyscale = (compressedImageText) => {
    const uncompressedImage = [];

    const compressedImage = compressedImageText.split(',');
    const len = compressedImage.length;
    var currentColor = 0;
    for (var i = 0 ; i < len ; i++) {
        //pixel, then count
        currentColor = compressedImage[i].substring(0,1);
        const count = parseInt(compressedImage[i].substring(1), 16);
        uncompressedImage.push(...(currentColor.toString().repeat(count).split('')));
    }

    return uncompressedImage.join('');
}

const CompressLossy = (uncompressedImageText, tol) => {
    const includeColor = true;
    const compressedImage = [];

    const uncompressImageArray = uncompressedImageText.split('');
    
    //For non-colour encoded, we need to always start with color0 count
    if (uncompressedImageText[0] === "1" && !includeColor) {
        compressedImage.push(0);
    }

    var referencePixel = uncompressImageArray[0];
    var currentRun = 0;
    var currentTotal = 0;
    uncompressImageArray.forEach(currentPixel => {
        if (!pixelColoursApproximatelyEqual(currentPixel,referencePixel, tol)) {
            const averagePixel = referencePixel;//Math.floor(currentTotal/currentRun)
            compressedImage.push(generateCompressedField(includeColor, currentRun, averagePixel));
            currentRun = 0;
            currentTotal = 0;
            referencePixel = currentPixel;
        }
        currentTotal += parseInt(currentPixel, 16);
        currentRun++;
        console.log(`${currentPixel} ${currentTotal} ${currentRun}`);
    });
    //And the last one
    compressedImage.push(generateCompressedField(includeColor, currentRun, referencePixel));

    return compressedImage.join(',');
};

const pixelColoursApproximatelyEqual = (p1, p2, tol) => {
    const vvv = Math.abs(parseInt(p1, 16)-parseInt(p2, 16))
    return vvv < tol;
}

const CompressGreyScale = (uncompressedImageText) => {
    return Compress(uncompressedImageText, true);
}

const Compress = (uncompressedImageText, includeColor) => {
    const compressedImage = [];

    const uncompressImageArray = uncompressedImageText.split('');
    
    //For non-colour encoded, we need to always start with color0 count
    if (uncompressedImageText[0] === "1" && !includeColor) {
        compressedImage.push(0);
    }

    var lastPixel = uncompressedImageText[0];
    var currentRun = 0;
    uncompressImageArray.forEach(currentPixel => {
        if (currentPixel !== lastPixel) {
            compressedImage.push(generateCompressedField(includeColor, currentRun, lastPixel));
            currentRun = 0;
        }
        currentRun++;
        lastPixel = currentPixel;
    });
    //And the last one
    compressedImage.push(generateCompressedField(includeColor, currentRun, lastPixel));

    return compressedImage.join(',');
};

const generateCompressedField = (includeColour, count, pixel) => {
    if (includeColour) {
        return `${pixel}${count.toString(16)}`;
    } else {
        return `${count.toString(16)}`;
    }
}

export {
    CompressMono,
    DecompressMono,
    CompressGreyScale,
    DecompressGreyscale,
    CompressLossy,
};