import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Movie from 'pages/Movie';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/movie/:asin?">
            <Movie />
          </Route>

          <Route path="/movies/:asin?">
            <Movie />
          </Route>

          <Route path="/:asin?" exact>
            <Movie />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
