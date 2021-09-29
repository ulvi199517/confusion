import './App.css';
import { Component } from 'react';
import Main from './components/main/main.component';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {

  render(){
    return(
      <BrowserRouter>
        <div>
          <Main/>
        </div>
      </BrowserRouter>

    )
  }
}
export default App;
