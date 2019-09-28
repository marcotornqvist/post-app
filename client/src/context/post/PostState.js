import React, { useReducer } from "react";
import axios from "axios";
import PostContext from "./postContext";
import postReducer from "./postReducer";
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_POST,
  FILTER_POSTS,
  CLEAR_POSTS,
  CLEAR_FILTER,
  POST_ERROR
} from "../types";

const PostState = props => {
  const initialState = {
    posts: [
      {
        _id: "5d87d09116346918247cffb1",
        title: "John's first post",
        text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aspernatur modi blanditiis nostrum eum incidunt qui totam deserunt provident, repudiandae nisi? Consequatur nemo facere quibusdam amet error deleniti quisquam nisi.",
        user: "5d80eea96f8fb10910ac6000",
        username: "john123",
        likes: [
          {
            _id: "5d87d2c60986f718cbb8832f",
            user: "5d75357e59dad72d240ac42d"
          }
        ],
        dislikes: [],
        comments: [
          {
            date: "2019-09-22T20:00:52.993Z",
            _id: "5d87d2f40986f718cbb88330",
            user: "5d75357e59dad72d240ac42d",
            text: "Thank you John, great post!",
            username: "jane123"
          },
          {
            date: "2019-09-22T20:00:51.993Z",
            _id: "5d87d2f40986f718cbb88331",
            user: "5d75357e59dad72d240ac42d",
            text: "Thank you John, great post 2!",
            username: "jane123"
          }
        ],
        date: "2019-09-22T19:50:41.259Z",
        __v: 7
      },
      {
        _id: "5d87d09116346918247cffb2",
        title: "John's second post",
        text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aspernatur modi blanditiis nostrum eum incidunt qui totam deserunt provident, repudiandae nisi? Consequatur nemo facere quibusdam amet error deleniti quisquam nisi.",
        user: "5d80eea96f8fb10910ac6000",
        username: "john123",
        likes: [
          {
            _id: "5d87d2c60986f718cbb8832f",
            user: "5d75357e59dad72d240ac42d"
          }
        ],
        dislikes: [],
        comments: [
          {
            date: "2019-09-22T20:00:52.993Z",
            _id: "5d87d2f40986f718cbb88333",
            user: "5d75357e59dad72d240ac42d",
            text: "Thank you John, great post3!",
            username: "jane123"
          },
          {
            date: "2019-09-22T20:00:51.993Z",
            _id: "5d87d2f40986f718cbb88334",
            user: "5d75357e59dad72d240ac42d",
            text: "Thank you John, great post 4!",
            username: "jane123"
          }
        ],
        date: "2019-09-22T19:50:41.259Z",
        __v: 7
      }
    ]
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  // Add Post

  // Delete Post

  // Set Current Post

  // Clear Current Post

  // Update Post

  // Filter Posts

  // Clear Filter

  return (
    <PostContext.Provider
      value={{
        posts: state.posts
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
