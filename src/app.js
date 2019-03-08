import React, {Component} from 'react';

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
    let counter = 0;
    return (
      <div className="outer-container">
          {this.state.counter && (<div className="counter" >{this.state.counter}</div>)}    
          <div className="container">
          <div className="app">
            <video muted id="camera-stream" width="500" height="500"></video>
            <canvas id="output"></canvas>
          </div>
        </div>
      </div>
    )
  }
}

