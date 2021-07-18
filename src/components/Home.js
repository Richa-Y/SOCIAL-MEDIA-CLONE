import PostsList from "./PostsList.js";
import FriendsList from "./FriendsList.js";

import react from "react";
class Home extends react.Component {
  render() {
    const { posts, friends, isLoggedin } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />;
        {isLoggedin && <FriendsList friends={friends} />}
      </div>
    );
  }
}
export default Home;
