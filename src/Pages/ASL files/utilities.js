
  
  // Drawing function
  export const drawHand = (predictions, ctx) => {
    // Check if we have predictions
    if (predictions.length > 0) {
      // Loop through each prediction
      predictions.forEach((prediction) => {
        // Grab landmarks
        const landmarks = prediction.keypoints;
        console.log(prediction);
    
  
        // Loop through landmarks and draw em
        for (let i = 0; i < landmarks.length; i++) {
          // Get x point
          const x = landmarks[i].x;
        // Get y point
          const y = landmarks[i].y;
          ctx.beginPath();
          ctx.arc(x, y ,5, 0, 3 * Math.PI);
  
          // Set line color
          ctx.fillStyle = "blue";
          ctx.fill();
        }
      });
    }
  };
  export const drawMesh = (predictions, ctx) => {
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const keypoints = prediction.scaledMesh;
  
        // Draw Dots
        for (let i = 0; i < keypoints.length; i++) {
          const x = keypoints[i][0];
          const y = keypoints[i][1];
  
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, 3 * Math.PI);
          ctx.fillStyle = "aqua";
          ctx.fill();
        }
      });
    }
  };

  export const drawPose = (predictions, ctx) => {
      // Check if we have predictions
      if (predictions.length > 0) {
        // Loop through each prediction
        predictions.forEach((prediction) => {
          // Grab landmarks
          const landmarks = prediction.keypoints;
          console.log(landmarks)
    
          // Loop through landmarks and draw em
          for (let i = 0; i < landmarks.length; i++) {
            // Get x point
            const x = landmarks[i].x;
          // Get y point
            const y = landmarks[i].y;
            ctx.beginPath();
            ctx.arc(x, y ,5, 0, 3 * Math.PI);
    
            // Set line color
            ctx.fillStyle = "red";
            ctx.fill();
          }
        });
      }
    };

    // function ignore(){
    //   const runStart = async () => {
    //     faceDetector = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    //     console.log("Face Model Loaded")
    //     const handModel = handPoseDetection.SupportedModels.MediaPipeHands;
    //     const detectorConfig = {
    //       runtime: 'tfjs',
    //       modelType: 'full'
    //       }
    //       handDetector = await handPoseDetection.createDetector(handModel, detectorConfig);
    //       console.log("Hand Model loaded");
    //       const model = poseDetection.SupportedModels.MoveNet;
    //       bodyDetector = await poseDetection.createDetector(model);    
    //       console.log("Body Model Loaded")
    
          
    
          
    //       videoConstructor();
    //       collector();
    
    //   }
    //   function videoConstructor(){
    //     if (
    //       typeof webcamRef.current !== "undefined" &&
    //       webcamRef.current !== null &&
    //       webcamRef.current.video.readyState === 4
    //     ) {
    //       // Get Video Properties
    //       video = webcamRef.current.video;
    //       const videoWidth = webcamRef.current.video.videoWidth;
    //       const videoHeight = webcamRef.current.video.videoHeight;
    
    //       // Set video width
    //       webcamRef.current.video.width = videoWidth;
    //       webcamRef.current.video.height = videoHeight;
    
    //       // Set canvas height and width
    //       canvasRef.current.width = videoWidth;
    //       canvasRef.current.height = videoHeight;
    
    //       // Make Detections
    //       estimationConfig = {flipHorizontal: false};
    
    //   }
    //   }
    //   // run start works
    //   const runHandpose = async () => {
    //     const model = handPoseDetection.SupportedModels.MediaPipeHands;
    //     const detectorConfig = {
    //     runtime: 'tfjs',
    //     modelType: 'full'
    //     }
    //     const detector = await handPoseDetection.createDetector(model, detectorConfig);
    //     console.log("Model loaded");
    //     setInterval(() => {
    //     detectHands(detector);
    //   }, 10);
    //   }
    //   const runFacemesh = async () => {
    //     const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    //     setInterval(() => {
    //       detectFace(net);
    //     }, 10);
    //   };
    //   const runBodyPose = async () => {
    //     const model = poseDetection.SupportedModels.MoveNet;
    //     const detector = await poseDetection.createDetector(model);    
    //     setInterval(() => {
    //       detectBody(detector);
    //     }, 10);
    //   };
    //   const detectHands = async (net) => {
    //     // Check data is available
    //     if (
    //       typeof webcamRef.current !== "undefined" &&
    //       webcamRef.current !== null &&
    //       webcamRef.current.video.readyState === 4
    //     ) {
    //       // Get Video Properties
    //       const video = webcamRef.current.video;
    //       const videoWidth = webcamRef.current.video.videoWidth;
    //       const videoHeight = webcamRef.current.video.videoHeight;
    
    //       // Set video width
    //       webcamRef.current.video.width = videoWidth;
    //       webcamRef.current.video.height = videoHeight;
    
    //       // Set canvas height and width
    //       canvasRef.current.width = videoWidth;
    //       canvasRef.current.height = videoHeight;
    
    //       // Make Detections
    //       const estimationConfig = {flipHorizontal: false};
    //       const hand = await net.estimateHands(video, estimationConfig);
    //       //console.log(hand);
    
    //       // Draw dots
    //       const ctx = canvasRef.current.getContext("2d");
    //       drawHand(hand, ctx);
    //     }
    //   };
    //   const detectFace = async (net) => {
    //     // Check data is available
    //     if (
    //       typeof webcamRef.current !== "undefined" &&
    //       webcamRef.current !== null &&
    //       webcamRef.current.video.readyState === 4
    //     ) {
    //       // Get Video Properties
    //       const video = webcamRef.current.video;
    //       const videoWidth = webcamRef.current.video.videoWidth;
    //       const videoHeight = webcamRef.current.video.videoHeight;
    
    //       // Set video width
    //       webcamRef.current.video.width = videoWidth;
    //       webcamRef.current.video.height = videoHeight;
    
    //       // Set canvas height and width
    //       canvasRef.current.width = videoWidth;
    //       canvasRef.current.height = videoHeight;
    
    //       const estimationConfig = {flipHorizontal: false};
    //       const face = await net.estimateFaces({input:video}, estimationConfig);
    
    //       // Get canvas context
    //       const ctx = canvasRef.current.getContext("2d");
    //       requestAnimationFrame(()=>{drawMesh(face, ctx)});
    //     }
    //   };
    //   const detectBody = async (net) => {
    //     // Check data is available
    //     if (
    //       typeof webcamRef.current !== "undefined" &&
    //       webcamRef.current !== null &&
    //       webcamRef.current.video.readyState === 4
    //     ) {
    //       // Get Video Properties
    //       const video = webcamRef.current.video;
    //       const videoWidth = webcamRef.current.video.videoWidth;
    //       const videoHeight = webcamRef.current.video.videoHeight;
    
    //       // Set video width
    //       webcamRef.current.video.width = videoWidth;
    //       webcamRef.current.video.height = videoHeight;
    
    //       // Set canvas height and width
    //       canvasRef.current.width = videoWidth;
    //       canvasRef.current.height = videoHeight;
    
    //       // Make Detections
    //       const estimationConfig = {flipHorizontal: false};
    //       const poses = await net.estimatePoses(video, estimationConfig);
         
    
    //       // Draw dots
    //       const ctx = canvasRef.current.getContext("2d");
    //       drawPose(poses, ctx);
    //     }
    //   };
    
    
    //   const collector = async () => {
    //     let count = 0
    //     while(count < 10){
    //       let frame = []
    //       videoConstructor();
    //       //hand = await handDetector.estimateHands(video, estimationConfig);
    //       pose = await bodyDetector.estimatePoses(video, estimationConfig);
    //       face = await faceDetector.estimateFaces({input:video}, estimationConfig);
    //       if (pose.length > 0) {
    //         pose.forEach((prediction) => {
    //           const landmarks = prediction.keypoints;
        
    //           for (let i = 0; i < landmarks.length; i++) {
    //             const x = landmarks[i].x;
    //             const y = landmarks[i].y;
    //             frame.push(x,y)
    //           }
    //         });
    //       }
    //       if (face.length > 0) {
    //         face.forEach((prediction) => {
    //           const keypoints = prediction.scaledMesh;
        
    //           // Draw Dots
    //           for (let i = 0; i < keypoints.length; i++) {
    //             const x = keypoints[i][0];
    //             const y = keypoints[i][1];
        
    //             frame.push(x,y)
    //           }
    //         });
    //       }
    //       collection.push(frame)
    //       count++;
    //     }    
    //     console.log(collection)
    //   }
    
    //     runStart();
    
    // function comments(){
    // // you will have to use a neural network NOT KNN CLASSIFIER, try using LTSM, but check if its best to train
    //     // on this file or create a new app to train on.
    
    //     // Why can't you do this in python, follow tutorial and convert?
    //       // idk how to convert this specific model
    //       // so you will teach yourself based off tutorial, YES!
    //       // import brain.js??
    //       // import tensorboard
    //       // actually just knn screw it
    //       // https://github.com/tensorflow/tfjs-models/tree/master/knn-classifier read this
    //       // and this https://codelabs.developers.google.com/codelabs/tensorflowjs-audio-codelab/index.html#7
    
    //     //OVERVIEW
    
    //     //make some kind of collection function that creates an array of all keypoints in a 30 frame segment
    
    //     // use this collection data to train with tf.sequential();
    // }
    // }
