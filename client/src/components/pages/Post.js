import React from "react";

const Post = ({ match }) => {
  const id = match.params.id;

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default Post;
