import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Form from './Form';
import Charts from './Charts';



class Main extends React.Component{
  render(){
    return(
      <div className='container'>
        <Switch>
          <Route path='/' exact render={({history})=> <Form history={history}/>} />
          <Route path='/charts' render={({match, history})=><Charts data={match.params.data} history={history}/>}/>
        </Switch>
      </div>
    );
  }
}

export default Main;
