import React, {useRef, useEffect, useState} from 'react'
import Webcam from "react-webcam";
import HOLISTIC, { Holistic } from '@mediapipe/holistic'
import * as cam from '@mediapipe/camera_utils'
import { Form, Button, Card } from "react-bootstrap"
import * as draw from '@mediapipe/drawing_utils'
import * as tf from '@tensorflow/tfjs'

import './ASL.css'



//MEDIAPIPE HOLISTIC INSTEAD

function ASL() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const correctRef = useRef(null);
  const [loading, setLoading] = useState(false)
  let model;
  //const [canvasRefWidth,setWidth] = useState(1280)
  //const [canvasRefHeight, setHeight] = useState(720)
  //const { height, width } = useWindowDimensions();

  const connect = window.drawConnectors;
  let camera = null;
  let sequence = [];
  const actions =['blank','hello', 'i love you', 'goodbye', 'how are you', 'thank you'
  ,'my name is']
  let currentWord;
  let videoWidth;
  let videoHeight;
  let count = 0;
  let wrongCount = -1;
  let actionNum = parseInt(Math.random() * 6) + 1;
  currentWord = actions[actionNum]

  const videoRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: window.innerWidth, height: window.innerHeight-200} })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  
  
  function onResults(results) {
    if(results == null){
      setLoading(true)
    }
    else{
      setLoading(false)
    }
    videoWidth = window.innerWidth;
    videoHeight = window.innerHeight - 200;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = window.innerHeight-200;
    
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
  sequence = sequence.slice(-30)
  if(sequence.length == 30){
    let res = model.predict(tf.expandDims(sequence, 0)).dataSync()
    ifCorrectSign(videoHeight, videoWidth, true, actions[tf.argMax(res,0).arraySync()]);
  }
}
  function ifCorrectSign(videoHeight, videoWidth, resultBool, word){
    correctRef.current.width = window.innerWidth;
    correctRef.current.height = window.innerHeight
    const canvasElement = correctRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    
    if(word == currentWord){
      count++;
      if(wrongCount == -1){
        wrongCount++;
      }
      if(count == 10){
        canvasCtx.fillStyle = "#00FF00";
        canvasCtx.fillRect(canvasElement.width/2 - 75, 600, 150, canvasElement.height-100);  
        changeWord();
        count = 0;
      }
    }
    else if( count > 0 && wrongCount > -1){
      if(wrongCount > 1){
        count = 0;
        wrongCount = 0;
      }
      else{
        wrongCount++
      }
    }

    console.log(count, wrongCount)
      
      
    
    
    
      canvasCtx.font = "20px Helvetica";
      canvasCtx.textAlign = "center";
      canvasCtx.fillText("Your Guess: " + word, canvasElement.width/4, canvasElement.height-100);
      canvasCtx.fillText("Word to Sign: " + currentWord, 3*canvasElement.width/4, canvasElement.height-100);

    
  }
  function changeWord(){
      let actionNum = parseInt(Math.random() * 6) + 1;
      currentWord = actions[actionNum]; 
  }
  async function loadModel(){
    console.log("console loading")
    model = await tf.loadLayersModel('https://andlanpomodel.s3.us-east-2.amazonaws.com/layersModel/model.json')
    console.log("model loaded")
  }



    useEffect(() => {
    loadModel();
    const holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
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
      typeof videoRef.current !== "undefined" &&
      videoRef.current !== null
    ) {
      camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await holistic.send({ image: videoRef.current});
        },
        
        width: window.innerWidth,
        height: window.innerHeight - 200,
      });
      camera.start();
    }
      
  }, []);
   
  return (
    
    <div className="ASL">
        <header className="App-header">
        <video ref={videoRef} />

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
            width: window.innerWidth,
            height: window.innerHeight - 200,
          }}
        />

      <canvas
          ref={correctRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: window.innerWidth,
            height: window.innerHeight,
          }}
        />
      </header>
      <Button onClick = {changeWord} disabled = {loading}  style={{
            position: "absolute",
            marginLeft: window.innerWidth/2 - 63,
            textAlign: "center",
            zindex: 9,
          }}className="btn-btn purple" type="submit">
              SKIP WORD
            </Button>
    </div>
  )
}

export default ASL