import React, {useRef, useEffect} from 'react'
import Webcam from "react-webcam";
import HOLISTIC, { Holistic } from '@mediapipe/holistic'
import * as cam from '@mediapipe/camera_utils'
import * as draw from '@mediapipe/drawing_utils'




//MEDIAPIPE HOLISTIC INSTEAD

function ASL() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const connect = window.drawConnectors;
  let camera = null;
  let sequence = [];

  
  function onResults(results) {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.globalCompositeOperation = 'source-over';
    draw.drawConnectors(canvasCtx, results.poseLandmarks, HOLISTIC.POSE_CONNECTIONS,
                   {color: '#C0C0C070', lineWidth: 4});
    draw.drawLandmarks(canvasCtx, results.poseLandmarks,
                  {color: '#FF0000', lineWidth: 2});
    draw.drawConnectors(canvasCtx, results.faceLandmarks, HOLISTIC.FACEMESH_TESSELATION,
                   {color: '#C0C0C070', lineWidth: 1});
    draw.drawConnectors(canvasCtx, results.leftHandLandmarks, HOLISTIC.HAND_CONNECTIONS,
                   {color: '#C0C0C070', lineWidth: 5});
    draw.drawLandmarks(canvasCtx, results.leftHandLandmarks,
                  {color: 'lavender', lineWidth: 2});
    draw.drawConnectors(canvasCtx, results.rightHandLandmarks, HOLISTIC.HAND_CONNECTIONS,
                   {color: '#C0C0C070', lineWidth: 5});
    draw.drawLandmarks(canvasCtx, results.rightHandLandmarks,
                  {color: 'teal', lineWidth: 2});
    canvasCtx.restore();
    extractKeypoints(results);

  }
  function extractKeypoints(results){
    let resArray = []
    if(results.poseLandmarks){
      results.poseLandmarks.forEach((coord) => {
        resArray.push(coord.x,coord.y, coord.z, coord.visibility)
    });
  }
  else {
    let poseCount = 0;
    while(poseCount < 33*4){
      resArray.push(0)
      poseCount++;
    }
  }
  if(results.faceLandmarks){
    for(let i = 0; i< results.faceLandmarks.length - 10; i++){
      let coord = results.faceLandmarks[i]
      resArray.push(coord.x, coord.y, coord.z)

    }
  }
  else {
    let faceCount = 0;
    while(faceCount < 468*3){
      resArray.push(0)
      faceCount++;
    }
  }
  if(results.rightHandLandmarks){
    results.rightHandLandmarks.forEach((coord) => {
      resArray.push(coord.x, coord.y, coord.z)
    });
  }
  else {
    let rightHandCount = 0;
    while(rightHandCount < 21*3){
      resArray.push(0)
      rightHandCount++;
    }
  }
  if(results.leftHandLandmarks){
    results.leftHandLandmarks.forEach((coord) => {
      resArray.push(coord.x, coord.y, coord.z)
    });
  }
  else {
    let leftHandCount = 0;
    while(leftHandCount < 21*3){
      resArray.push(0)
      leftHandCount++;
    }
  }

  sequence.push(resArray)
  sequence = sequence.slice(-29)
  console.log(sequence)


  }

  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;      },
    });

    holistic.setOptions({
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    refineFaceLandmarks: true,
    });
    holistic.onResults(onResults);
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await holistic.send({image: webcamRef.current.video});
        },
        width: 1280,
        height: 720
      });
      camera.start();
    }
  }, []);
  

 
    
  return (
    <div className="ASL">
        <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 1280,
            height: 720,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 1280,
            height: 720,
          }}
        />
      </header>
    </div>
  )
}

export default ASL