import './App.css';
import { Component } from 'react';
import Main from './components/main/main.component';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/store';

const store= ConfigureStore();

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main/>
          </div>
        </BrowserRouter>
      </Provider>

    )
  }
}
export default App;
