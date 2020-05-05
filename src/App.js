import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieSearch from 'pages/MovieSearch';
import Home from 'pages/Home';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/movies" exact>
            <MovieSearch />
          </Route>

          <Route path="/movies/:asin">
            
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
