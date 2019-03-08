
document.addEventListener('DOMContentLoaded', function () {

  // References to all the element we will need.
  var video = document.querySelector('#camera-stream'),
      image = document.querySelector('#snap'),
      start_camera = document.querySelector('#start-camera'),
      controls = document.querySelector('.controls'),
      take_photo_btn = document.querySelector('#take-photo'),
      delete_photo_btn = document.querySelector('#delete-photo'),
      download_photo_btn = document.querySelector('#download-photo'),
      error_message = document.querySelector('#error-message');

  let snapSrc;

  // The getUserMedia interface is used for handling camera input.
  // Some browsers need a prefix so here we're covering all the options
  navigator.getMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
  );


  if (!navigator.getMedia) {
      displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
  } else {
      // Request the camera.
      navigator.getMedia({
              video: true
          },
          // Success Callback
          function (stream) {

              // Create an object URL for the video stream and
              // set it as src of our HTLM video element.
              // video.src = window.URL.createObjectURL(stream);
              video.srcObject = stream;
              // Play the video element to start the stream.
              video.play();
              video.onplay = function () {
                  // showVideo();
                  var imageScaleFactor = 0.50;
                  var flipHorizontal = false;
                  var outputStride = 16;
                  var imageElement = video;
                  var s=0;
                  var rhwy,rhwx,lhwy,lhwx,nose = 0;

                  setTimeout(()=>{
                    posenet.load().then(function(net){
                      return net.estimateSinglePose(imageElement,imageScaleFactor,flipHorizontal,outputStride)}).then(function(pose){

                          console.log(pose.keypoints[9].part);
                          lhwx=pose.keypoints[9].position.x;
                          lhwy=pose.keypoints[9].position.y;
                          rhwx=pose.keypoints[10].position.x;
                          rhwy=pose.keypoints[10].position.y;
                          nose=pose.keypoints[0].position.y;
                          s=1;
                          console.log(rhwy);
                          console.log(lhwy);
                          console.log(lhwx);
                          console.log(rhwx);
                        //   console.log(s);


                   //function st(){
                    alert("running");

                 setInterval(()=>{
                     posenet.load().then(function(net){
                       return net.estimateSinglePose(imageElement,imageScaleFactor,flipHorizontal,outputStride)}).then(function(pose){
 
                           console.log(pose.keypoints[9].part);
 
                         //   if(pose.keypoints[9].score>.78){
 
                             if(pose.keypoints[9].position.x>lhwx+25||pose.keypoints[9].position.x<lhwx-25){
                                 alert("Left Wrist x axis prob");
 
                             }
                             if(pose.keypoints[9].position.y<nose){
                                if(pose.keypoints[9].position.y<lhwy-25){
                                    alert("Left Wrist y axis prob");
                                }
                             }
 
 
                         //   }
                         //   else{
                         //       alert("Camera not able detect left arm properly")
                         //   }
                         //  if(pose.keypoints[10].score>.78){
                             if(pose.keypoints[10].position.x>rhwx+25||pose.keypoints[10].position.x<rhwx-25){
                                 alert("Right Wrist x axis prob");
 
                             }
                             if(pose.keypoints[10].position.y<nose){
                                if(pose.keypoints[10].position.y<rhwy-25){
                                    alert("Right Wrist y axis prob");
                                }
                             }
                         //  }
                         //  else{
                         //     alert("Camera not able detect right arm properly")
                         // }
 
 
                           
 
                         //   axios.post('/data',{
                         //       data : pose
                         //   }).then(res => console.log(res)).catch(e => console.log(e));
                     
                     })
                   },1000);


               // }

                    
                    })
                  },3000);

              
                      
              };

          },
          // Error Callback
          function (err) {
              displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
          }
          
      );
  }



  // Mobile browsers cannot play video without user input,
  // so here we're using a button to start it manually.
  // start_camera.addEventListener("click", function (e) {

  //     e.preventDefault();

  //     // Start video playback manually.
  //     video.play();
  //     showVideo();

  // });


  // take_photo_btn.addEventListener("click", function (e) {

  //     e.preventDefault();

  //     snapSrc = takeSnapshot();

  //     $.post('/image', {
  //         snapSrc
  //     });

  //     // $.post('https://mighty-citadel-83696.herokuapp.com/img', {snapSrc});
  //     // $.post('http://localhost:8888/img', {snapSrc});

  //     // Show image. 
  //     //   image.setAttribute('src', snapSrc);
  //     image.classList.add("visible");

  //     // Enable delete and save buttons
  //     delete_photo_btn.classList.remove("disabled");
  //     download_photo_btn.classList.remove("disabled");

  //     // Set the href attribute of the download button to the snap url.
  //     download_photo_btn.href = snapSrc;

  //     // Pause video playback of stream.
  //     video.pause();

  // });


  // delete_photo_btn.addEventListener("click", function (e) {

  //     e.preventDefault();

  //     // Hide image.
  //     image.setAttribute('src', "");
  //     image.classList.remove("visible");

  //     // Disable delete and save buttons
  //     delete_photo_btn.classList.add("disabled");
  //     download_photo_btn.classList.add("disabled");

  //     // Resume playback of stream.
  //     video.play();

  // });



  // function takeSnapshot() {
  //     // Here we're using a trick that involves a hidden canvas element.  

  //     var hidden_canvas = document.querySelector('canvas'),
  //         context = hidden_canvas.getContext('2d');

  //     var width = video.videoWidth,
  //         height = video.videoHeight;

  //     if (width && height) {

  //         // Setup a canvas with the same dimensions as the video.
  //         hidden_canvas.width = width;
  //         hidden_canvas.height = height;

  //         // Make a copy of the current frame in the video on the canvas.
  //         context.drawImage(video, 0, 0, width, height);

  //         // Turn the canvas image into a dataURL that can be used as a src for our photo.
  //         return hidden_canvas.toDataURL('image/png');
  //     }
  // }


  // function showVideo() {
  //     // hideUI();
  //     video.classList.add("visible");
  //     controls.classList.add("visible");
  // }


  // function displayErrorMessage(error_msg, error) {
  //     error = error || "";
  //     if (error) {
  //         console.error(error);
  //     }

  //     error_message.innerText = error_msg;

  //     hideUI();
  //     error_message.classList.add("visible");
  // }


  // function hideUI() {
  //     // Helper function for clearing the app UI.

  //     controls.classList.remove("visible");
  //     start_camera.classList.remove("visible");
  //     video.classList.remove("visible");
  //     snap.classList.remove("visible");
  //     error_message.classList.remove("visible");
  // }

});