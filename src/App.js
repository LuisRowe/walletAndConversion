import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route exact path="/album/:id" component={ Album } /> */}
        {/* <Route path="*" component={ NotFound } /> */}
      </Switch>
    </div>
  );
}

export default App;
