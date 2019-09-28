import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import User from "./components/pages/Profile";
import Post from "./components/pages/Post";

import PostState from "./context/post/PostState";
import "./App.scss";

const App = () => {
  return (
    <PostState>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/post/:id" component={Post} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile/:username" component={User} />
          </Switch>
        </div>
      </Router>
    </PostState>
  );
};

export default App;
