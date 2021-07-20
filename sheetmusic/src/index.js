import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Play from './containers/Play'

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/Play" component={Play} />
    </div>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();