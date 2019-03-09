document.addEventListener('DOMContentLoaded', function () {

    // localStorage.setItem(hello,'hello');

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
                var s = 0;
                var rhwy, rhwx, lhwy, lhwx, nose = 0;

                setTimeout(() => {
                    posenet.load().then(function (net) {
                        return net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride)
                    }).then(function (pose) {

                        console.log(pose.keypoints[9].part);
                        lhwx = pose.keypoints[9].position.x;
                        lhwy = pose.keypoints[9].position.y;
                        rhwx = pose.keypoints[10].position.x;
                        rhwy = pose.keypoints[10].position.y;
                        nose = pose.keypoints[0].position.y;
                        s = 1;
                        console.log(rhwy);
                        console.log(lhwy);
                        console.log(lhwx);
                        console.log(rhwx);
                        //   console.log(s);


                        //function st(){
                        // alert("running");

                        setInterval(() => {
                            let errors = [];

                            posenet.load().then(function (net) {
                                return net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride)
                            }).then(function (pose) {

                                console.log(pose.keypoints[9].part);

                                //   if(pose.keypoints[9].score>.78){

                                if (pose.keypoints[9].position.x > lhwx + 25 || pose.keypoints[9].position.x < lhwx - 25) {
                                    errors.push('left wrist horizontaly');
                                    // alert("Left Wrist x axis prob");
                                    document.getElementById('errors').innerHTML

                                }
                                if (pose.keypoints[9].position.y < nose) {
                                    if (pose.keypoints[9].position.y < lhwy - 25) {
                                        errors.push('left wrist verticaly')
                                        // alert("Left Wrist y axis prob");
                                    }
                                }


                                //   }
                                //   else{
                                //    alert("Camera not able detect left arm properly")
                                //   }
                                //  if(pose.keypoints[10].score>.78){
                                if (pose.keypoints[10].position.x > rhwx + 25 || pose.keypoints[10].position.x < rhwx - 25) {
                                    errors.push('right wrist horizontally')
                                    // alert("Right Wrist x axis prob");

                                }
                                if (pose.keypoints[10].position.y < nose) {
                                    if (pose.keypoints[10].position.y < rhwy - 25) {
                                        errors.push('right wrist vertcally');
                                        // alert("Right Wrist y axis prob");
                                    }
                                }
                                //  }
                                //  else{
                                //  alert("Camera not able detect right arm properly")
                                // }


                                // document.getElementById('errors').innerHTML = JSON.stringify(errors);
                                localStorage.setItem("errors",JSON.stringify(errors));


                                //   axios.post('/data',{
                                //       data : pose
                                //   }).then(res => console.log(res)).catch(e => console.log(e));

                            })
                        }, 1000);


                        // }


                    })
                }, 3000);



            };

        },
        // Error Callback
        function (err) {
            displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
        }

    );
}
});
