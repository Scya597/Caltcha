import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './components/main_page';
import New from './components/new';
import Vote from './components/vote';

const routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/vote/:pjid/:userid/:superid" component={Vote} />
          <Route path="/new" component={New} />
          <Route path="/" component={MainPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default routes;
