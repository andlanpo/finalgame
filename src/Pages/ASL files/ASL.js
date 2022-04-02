import React, {useRef, useEffect} from 'react'
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs"
import HOLISTIC, { Holistic } from '@mediapipe/holistic'
import * as cam from '@mediapipe/camera_utils'
import * as draw from '@mediapipe/drawing_utils'


let handDetector;
let bodyDetector;
let faceDetector;
let video;
let estimationConfig;
let hand;
let face;
let pose;
let collection = [];

//MEDIAPIPE HOLISTIC INSTEAD

function ASL() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const connect = window.drawConnectors;
  let camera = null;
  
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
                   {color: '#00FF00', lineWidth: 4});
    draw.drawLandmarks(canvasCtx, results.poseLandmarks,
                  {color: '#FF0000', lineWidth: 2});
    draw.drawConnectors(canvasCtx, results.faceLandmarks, HOLISTIC.FACEMESH_TESSELATION,
                   {color: '#C0C0C070', lineWidth: 1});
    draw.drawConnectors(canvasCtx, results.leftHandLandmarks, HOLISTIC.HAND_CONNECTIONS,
                   {color: '#CC0000', lineWidth: 5});
    draw.drawLandmarks(canvasCtx, results.leftHandLandmarks,
                  {color: '#00FF00', lineWidth: 2});
    draw.drawConnectors(canvasCtx, results.rightHandLandmarks, HOLISTIC.HAND_CONNECTIONS,
                   {color: '#00CC00', lineWidth: 5});
    draw.drawLandmarks(canvasCtx, results.rightHandLandmarks,
                  {color: '#FF0000', lineWidth: 2});
    canvasCtx.restore();



    //console.log(results.poseLandmarks)
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