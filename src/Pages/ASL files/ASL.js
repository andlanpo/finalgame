import React, {useRef, useEffect, useState} from 'react'
import Webcam from "react-webcam";
import HOLISTIC, { Holistic } from '@mediapipe/holistic'
import * as cam from '@mediapipe/camera_utils'
import { Form, Button, Card } from "react-bootstrap"
import * as draw from '@mediapipe/drawing_utils'
import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';
import * as tf from '@tensorflow/tfjs'




//MEDIAPIPE HOLISTIC INSTEAD

function ASL() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const correctRef = useRef(null);
  const [loading, setLoading] = useState(false)
  let model;

  const connect = window.drawConnectors;
  let camera = null;
  let sequence = [];
  const actions =['blank','hello', 'i love you', 'goodbye', 'how are you', 'thank you'
  ,'my name is']
  let currentWord;
  let videoWidth;
  let videoHeight;

  let correctWord = false;
  let actionNum = parseInt(Math.random() * 7);
  currentWord = actions[actionNum]
  console.log(actionNum)
  console.log(currentWord)

  
  function onResults(results) {
    if(results == null){
      setLoading(true)
    }
    else{
      setLoading(false)
    }
    videoWidth = webcamRef.current.video.videoWidth;
    videoHeight = webcamRef.current.video.videoHeight;

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
  sequence = sequence.slice(-30)
  //console.log(sequence)
  if(sequence.length == 30){



    let res = model.predict(tf.expandDims(sequence, 0)).dataSync()
    ifCorrectSign(videoHeight, videoWidth, true, actions[tf.argMax(res,0).arraySync()]);


  }



  }

  


  function ifCorrectSign(videoHeight, videoWidth, resultBool, word){
    correctRef.current.width = videoWidth
    correctRef.current.height = videoHeight
    
    const canvasElement = correctRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    if(resultBool){
      canvasCtx.font = "30px Times New Roman";
      canvasCtx.textAlign = "center";
      canvasCtx.fillText(word, canvasElement.width/2, 100);


      canvasCtx.fillStyle = "#00FF00";
      canvasCtx.fillRect(0, 0, 150, 75);  
    }
    else{
      canvasCtx.fillStyle = "#FF0000";
      canvasCtx.fillRect(0, 0, 150, 75);  
    }
    
  }
  function changeWord(){
      let actionNum = parseInt(Math.random() * 33);
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
            width: 1280,
            height: 720,
          }}
        />
      </header>
      <Button onClick = {changeWord} disabled = {loading} className="btn-btn purple" type="submit">
              word changer
            </Button>
    </div>
  )
}

export default ASL