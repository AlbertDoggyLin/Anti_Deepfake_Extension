async function deal(image){
  const color = {fakeColor: 'red', realColor: 'green'}
  const imageSize = 224;
  image.style.boxSizing = "border-box";
  const width = imageSize;
  const height = imageSize;
  image.style.border=`${color.realColor} 5px solid`;
  try{
    const imageLoader = await new ImageLoader(imageSize, imageSize);
    const imageData = await imageLoader.getImageData(image.src);
    // preprocess the image data to match input dimension requirement, which is 1*3*224*224
    const preprocessedData = preprocess(imageData.data, width, height);
    const inputTensor = new onnx.Tensor(preprocessedData, 'float32', [1, 3, width, height]);
    // Run model with Tensor inputs and get the result.
    const outputMap = await session.run({modelInput: inputTensor});
    const outputData = outputMap.modelOutput.data;
    image.setAttribute('a0', outputData[0]);
    image.setAttribute('a1', outputData[1]);
    if(outputData[0]<outputData[1] && Math.abs(outputData[0]-outputData[1])>100){
        image.style.border=`${color.fakeColor} 5px solid`;
    }
    else{
        image.style.border=`${color.realColor} 5px solid`;
    }
  }
  catch(e){
    console.log(e);
  }
}

async function main(){
    try{
        session = await ort.InferenceSession.create('chrome-extension:/gigikbccklapgjcpiochkkghponcoeee/AntiDeepfake_mobilenetv3_small.onnx');
        let images = document.getElementsByTagName('img');
        for(let i = 0; i < images.length; i++) {
          deal(images[i]);
        }
    }
    catch(e){
        console.log(e);
    }
}
/**
 * Preprocess raw image data to match SqueezeNet requirement.
 */
function preprocess(data, width, height) {
  const dataFromImage = ndarray(new Float32Array(data), [width, height, 4]);
  const dataProcessed = ndarray(new Float32Array(width * height * 3), [1, 3, height, width]);

  // Normalize 0-255 to (-1)-1
  ndarray.ops.subseq(dataFromImage.pick(2, null, null), 103.939);
  ndarray.ops.subseq(dataFromImage.pick(1, null, null), 116.779);
  ndarray.ops.subseq(dataFromImage.pick(0, null, null), 123.68);

  // Realign imageData from [224*224*4] to the correct dimension [1*3*224*224].
  ndarray.ops.assign(dataProcessed.pick(0, 0, null, null), dataFromImage.pick(null, null, 2));
  ndarray.ops.assign(dataProcessed.pick(0, 1, null, null), dataFromImage.pick(null, null, 1));
  ndarray.ops.assign(dataProcessed.pick(0, 2, null, null), dataFromImage.pick(null, null, 0));

  return dataProcessed.data;
}

main();
