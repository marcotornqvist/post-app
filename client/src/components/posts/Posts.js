import React, { useContext } from "react";
import PostItem from "./PostItem";
import PostContext from "../../context/post/postContext";

const Posts = () => {
  const postContext = useContext(PostContext);

  const { posts, filtered } = postContext;

  if (posts.length === 0) {
    return <h4>Please add a contact</h4>;
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
