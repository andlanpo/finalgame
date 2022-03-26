import React, {useRef, useEffect} from 'react'
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs"
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import {drawHand, drawMesh, drawPose} from "./utilities"



function ASL() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  

  const runHandpose = async () => {
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
    runtime: 'tfjs',
    modelType: 'full'
    }
    const detector = await handPoseDetection.createDetector(model, detectorConfig);
    const faceDetect = await 
    console.log("Model loaded");
    setInterval(() => {
    detectHands(detector);
  }, 10);
  }
  const runFacemesh = async () => {
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detectFace(net);
    }, 10);
  };
  const runBodyPose = async () => {
    const model = poseDetection.SupportedModels.MoveNet;
    const detector = await poseDetection.createDetector(model);    
    setInterval(() => {
      detectBody(detector);
    }, 10);
  };
  const detectHands = async (net) => {
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

      // Draw dots
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };
  const detectFace = async (net) => {
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

      const estimationConfig = {flipHorizontal: false};
      const face = await net.estimateFaces({input:video}, estimationConfig);

      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(()=>{drawMesh(face, ctx)});
    }
  };
  const detectBody = async (net) => {
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
      const poses = await net.estimatePoses(video, estimationConfig);
     

      // Draw dots
      const ctx = canvasRef.current.getContext("2d");
      drawPose(poses, ctx);
    }
  };
    //runFacemesh();
    runHandpose();
    //runBodyPose();

    // you will have to use a neural network NOT KNN CLASSIFIER, try using LTSM, but check if its best to train
    // on this file or create a new app to train on.
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