import React, {Component} from 'react';

class Errors extends Component{
  constructor(props){
    super(props);
    this.state = {
      errors : []
    }
  }

  render(){
    // let errors = document.getElementById('errors').innerHTML || '[]';
    let errors = localStorage.getItem("errors");
    errors = JSON.parse(errors) || [];
    errors = errors.map((err)=>{
      return(
        <div className="err">{err}</div>
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