import React,{Component} from 'react';
import {GlobalStyle} from './static/reset';
import Router from './router';
class App extends Component
{
  render(){
    return(
      <div>
        <GlobalStyle />
        <Router />
      </div>
    )
  }
}

export default App;
