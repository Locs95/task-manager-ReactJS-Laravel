import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import TaskList from './TaskList/TaskList';
import TaskEdit from './TaskEdit/TaskEdit';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../store/reducers/index';

const store = createStore(rootReducer);

export default class App extends Component {
    render() {
        return (
          <div className="App">
            <Provider store={store}>
             <Router>
              <Switch>
               <Route exact path='/' component={TaskList} />
               <Route path='/items/:id' component={TaskEdit} />
              </Switch>
             </Router>
            </Provider>
          </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
