import React from 'react';
import Form from './Form';


class Main extends React.Component{
  
  render(){
    return(
      <div className="container">
        <h1>Analyze</h1>
        <div className="jumbotron">
          <Form />
        </div>
      </div>
    );
  }
};

export default Main;
