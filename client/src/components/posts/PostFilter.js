import React, { useContext, useRef, useEffect } from "react";
import PostContext from "../../context/post/postContext";

const PostFilter = () => {
  const postContext = useContext(PostContext);
  const text = useRef("");

  const { filterPosts, clearFilter, filtered } = postContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value !== "") {
      filterPosts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form className="filter">
      <div className="row">
        <div className="col-md-12 col-lg-10">
          <input
            className="form-control"
            ref={text}
            type="text"
            placeholder="Filter Posts..."
            onChange={onChange}
          />
        </div>
      </div>
    </form>
  );
};

export default PostFilter;
