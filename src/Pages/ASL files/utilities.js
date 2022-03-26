// Points for fingers
const fingerJoints = {
    rightThumb: [0, 1, 2, 3, 4],
    rightIndexFinger: [0, 5, 6, 7, 8],
    rightMiddleFinger: [0, 9, 10, 11, 12],
    rightRingFinger: [0, 13, 14, 15, 16],
    rightPinky: [0, 17, 18, 19, 20],

  };
  
  const style = {
    0: { color: "blue", size: 6 },
    1: { color: "blue", size: 6 },
    2: { color: "blue", size: 6 },
    3: { color: "blue", size: 6 },
    4: { color: "blue", size: 6 },
    5: { color: "blue", size: 6 },
    6: { color: "blue", size: 6 },
    7: { color: "blue", size: 6 },
    8: { color: "blue", size: 6 },
    9: { color: "blue", size: 6 },
    10: { color: "blue", size: 6 },
    11: { color: "blue", size: 6 },
    12: { color: "blue", size: 6 },
    13: { color: "blue", size: 6 },
    14: { color: "blue", size: 6 },
    15: { color: "blue", size: 6 },
    16: { color: "blue", size: 6 },
    17: { color: "blue", size: 6 },
    18: { color: "blue", size: 6 },
    19: { color: "blue", size: 6 },
    20: { color: "blue", size: 6 },
  };
  
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
          ctx.arc(x, y, 1 /* radius */, 0, 3 * Math.PI);
          ctx.fillStyle = "aqua";
          ctx.fill();
        }
      });
    }
  };