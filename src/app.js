import React, {Component} from 'react';
import errors from './camera';
import Errors from './errors';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      counter : 3
    }
  }

  componentDidMount(){
    setInterval(()=>{
      if(this.state.counter > 0){
        this.setState((prevState)=>{
          return {
            counter : prevState.counter - 1
          }
        })
      }
    },1000);
  }

  render(){

    // console.log(localStorage.getItem(hello));
    let counter = 0;
    return (
      <>
        <div className="outer-container">
              {this.state.counter ? (
              <div className="loading">
                Calibrating Input 
                <div className="loader" >
                  <div className="bar bar1"></div>
                  <div className="bar bar2"></div>
                  <div className="bar bar3"></div>
                </div> 
              </div>
              ):( <div className="loaded">Caliberated</div> )}
            <div className="app">
              <video muted id="camera-stream" width="500" height="500"></video>
              <div id="errors"></div>
              {/* <canvas id="output"></canvas> */}
          </div>
        </div>
        {/* <Errors/> */}
      </>
    )
  }
}

