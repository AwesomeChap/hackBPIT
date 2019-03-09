import React, {Component} from 'react';

class Errors extends Component{
  constructor(props){
    super(props);
    this.state = {
      errors : []
    }
  }

  componentDidMount(){
    setInterval(()=>{
      let errors = localStorage.getItem("errors");
      errors = JSON.parse(errors) || [];
      this.setState({errors : errors});
    },1000);
  }

  render(){
    // let errors = document.getElementById('errors').innerHTML || '[]';
    let errors = this.state.errors.map((err)=>{
      return(
        <div className="err">{err} wrong positioned</div>
      );
    })
    return(
      <div className="errors-container">
        <div className="heading">Errors in Body Posture</div>
        {errors}
      </div>
    );
  }
}

export default Errors;