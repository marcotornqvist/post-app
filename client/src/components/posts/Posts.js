import React, { useContext } from "react";
import PostItem from "./PostItem";
import PostContext from "../../context/post/postContext";

const Posts = () => {
  const postContext = useContext(PostContext);

  const { posts } = postContext;

  return (
    <div className="posts">
      <div className="row">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
