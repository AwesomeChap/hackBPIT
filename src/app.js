import React from 'react';

export default function(props){
  return (
    <div className="container">

      <div className="app">

        {/* <a href="#" id="start-camera" className="visible">Touch here to start the app.</a> */}
        <video muted id="camera-stream" width="500" height="500"></video>
        <canvas id="output"></canvas>
        {/* <p id="error-message"></p>

        <div className="controls">
          <a href="#" id="delete-photo" title="Delete Photo" className="disabled"><i className="material-icons">delete</i></a>
          <a href="#" id="take-photo" title="Take Photo"><i className="material-icons">camera_alt</i></a>
          <a href="#" id="download-photo" download="selfie.png" title="Save Photo" className="disabled"><i className="material-icons">file_download</i></a>  
        </div> */}

      </div>
    </div>
  );
}

