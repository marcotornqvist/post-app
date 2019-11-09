import React, { useState, useContext, useEffect } from "react";
import PostContext from "../../context/post/postContext";

const Publish = () => {
  const postContext = useContext(PostContext);

  const { addPost, updatePost, clearCurrent, current } = postContext;

  useEffect(() => {
    if (current !== null) {
      setPost(current);
    } else {
      setPost({
        title: "",
        text: ""
      });
    }
  }, [postContext, current]);

  const [post, setPost] = useState({
    title: "",
    text: ""
  });

  const { title, text } = post;

  const onChange = e => setPost({ ...post, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addPost(post);
    } else {
      updatePost(post);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <section className="publish">
      <form className="post-form" onSubmit={onSubmit}>
        <div className="row">
          <div className="col">
            <h2>{current ? "Update Post" : "Add Post"}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-10">
            <input
              className="form-control"
              type="text"
              placeholder="Title..."
              name="title"
              value={title}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-10">
            <textarea
              className="form-control"
              rows="10"
              type="text"
              placeholder="Text..."
              name="text"
              value={text}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="buttons">
          <button type="submit" className="btn btn-secondary">
            {current ? "Update Post" : "Add Post"}
          </button>
          {current && (
            <button className="btn btn-secondary" onClick={clearAll}>
              Clear
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Publish;
