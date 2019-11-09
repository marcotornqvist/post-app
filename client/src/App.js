import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Alerts from "./components/layout/Alerts";
import User from "./components/pages/Profile";
import Post from "./components/pages/Post";
import Publish from "./components/pages/Publish";
import PrivateRoute from "./components/routing/PrivateRoute";

import PostState from "./context/post/PostState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";
import "./App.scss";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <PostState>
        <AlertState>
          <Router>
            <Navbar />
            <div className="container">
              <Alerts />
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/publish" component={Publish} />
                <Route exact path="/post/:id" component={Post} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile/:username" component={User} />
              </Switch>
            </div>
          </Router>
        </AlertState>
      </PostState>
    </AuthState>
  );
};

export default App;
