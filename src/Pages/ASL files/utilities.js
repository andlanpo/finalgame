
  
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
