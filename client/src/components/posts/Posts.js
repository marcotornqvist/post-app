import React, { useContext, useEffect } from "react";
import PostItem from "./PostItem";
import PostContext from "../../context/post/postContext";

const Posts = () => {
  const postContext = useContext(PostContext);

  const { posts, filtered, getPosts } = postContext;

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  if (posts !== null && posts.length === 0) {
    return <h4>Please add a Post</h4>;
  }

  return (
    <div className="posts">
      <div className="row">
        {filtered !== null
          ? filtered.map(post => <PostItem key={post._id} post={post} />)
          : posts.map(post => <PostItem key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Posts;
