import posts from "../reducer/posts";
import { UPDATE_POSTS, ADD_POST } from "./actionType";
import { APIUrls } from "../helpers/url";
import { getAuthToken, getFormBody } from "../helpers/utils";
export function fetchPosts() {
  return (dispatch) => {
    //   const url = "http//codeial.com:8000/api/v2/posts?page=1&limit=5";
    const url = APIUrls.fetchPosts();
    // "http://codeial.codingninjas.com:8000/api/v2/posts?page=1&limit=5";
    fetch(url)
      .then((response) => {
        //   console.log("response", response);
        return response.json();
      })
      .then((data) => {
        console.log("dataaaaaaa", data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}
export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("dATA", data);

        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}
