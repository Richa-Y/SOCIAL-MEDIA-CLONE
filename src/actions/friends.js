import { APIUrls } from "../helpers/url";
import { getAuthToken } from "../helpers/utils";
import { FETCH_FRIENDS_SUCCESS, ADD_FRIEND } from "./actionType";

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIUrls.userFriends(userId);
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        dispatch(fetchFriendsSucces(data.data.friends));
      });
  };
}

export function fetchFriendsSucces(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}
export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}
