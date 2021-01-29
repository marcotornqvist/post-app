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

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      }; 
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    case UPDATE_POST: {
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        )
      };
    }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_POSTS:
      return {
        ...state,
        filtered: state.posts.filter(post => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return post.title.match(regex) || post.text.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
