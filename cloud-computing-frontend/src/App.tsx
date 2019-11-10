import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Header, GroupInfo } from './Components';
import { Groups, Students } from "./Pages";
import './App.scss';

export default class App extends Component {

  public render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="container">
            <Route path="/">
              <Redirect to="/groups"/>
            </Route>
            <Route exact path="/groups" component={Groups} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/groups/:id" component={GroupInfo} />
          </div>
        </div>
      </Router>
    );
  }
}
