import React from "react";
import Posts from "../posts/Posts";
import PostFilter from "../posts/PostFilter";

const Home = () => {
  return (
    <div className="home">
      <h2>Posts</h2>
      <PostFilter />
      <Posts />
    </div>
  );
};

export default Home;
