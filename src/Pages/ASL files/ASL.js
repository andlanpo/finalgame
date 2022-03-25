import React, {useRef, useEffect} from 'react'
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import {drawHand} from "./utilities"


function ASL() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
  runtime: 'tfjs', // or 'tfjs',
  modelType: 'full'
}
  const detector = await handPoseDetection.createDetector(model, detectorConfig);
  console.log("Model loaded");
  setInterval(() => {
    detect(detector);
  }, 500);
  }
  

  

  // const runHandpose = async () => {
  //   const net = await handpose.load();
  //   console.log("Handpose model loaded.");
  //   setInterval(() => {
  //     detect(net);
  //   }, 10);
  // };
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const estimationConfig = {flipHorizontal: false};
      const hand = await net.estimateHands(video, estimationConfig);
      //console.log(hand);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  runHandpose();
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
            width: 640,
            height: 480,
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
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  )
}

export default ASL