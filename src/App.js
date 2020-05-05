import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Movies from 'pages/Movies';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/movies/:asin?">
            <Movies />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
