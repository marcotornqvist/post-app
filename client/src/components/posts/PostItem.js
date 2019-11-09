import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import PostContext from "../../context/post/postContext";

const PostItem = ({ post }) => {
  const postContext = useContext(PostContext);

  const { deletePost, setCurrent, clearCurrent } = postContext;

  const { _id, title, text, username, likes, dislikes, comments, date } = post;

  const onDelete = () => {
    deletePost(_id);
    clearCurrent();
  };

  return (
    <div className="col-md-6">
      <div className="post">
        <Link to={"post/" + _id}>
          <h2 className="title">{title}</h2>
        </Link>
        <p className="text">{text}</p>
        <div className="icons">
          <div className="icon-wrapper">
            <i className="fas fa-thumbs-up"></i>
            <span>{likes.length}</span>
          </div>
          <div className="icon-wrapper">
            <i className="fas fa-thumbs-down"></i>
            <span>{dislikes.length}</span>
          </div>
          <div className="icon-wrapper">
            <i className="fas fa-comments"></i>
            <span>{comments.length}</span>
          </div>
        </div>
        <div className="info">
          <span className="date">{moment(date).format("YYYY.MM.DD")}</span>
          <Link to={"profile/" + username}>
            <span className="username">{username}</span>
          </Link>
        </div>
        <div className="buttons">
          <button className="btn btn-primary" onClick={() => setCurrent(post)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
