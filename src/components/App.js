import reactDom from "react-dom";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/posts";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PostsList from "./PostsList.js";
import PropTypes from "prop-types";
import Navbar from "./Navbar.js";
import Home from "./Home.js";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import UserProfile from "./UserProfile.js";
import Settings from "./Settings.js";
import react from "react";
import { getAuthToken } from "../helpers/utils.js";
import * as jwtDecode from "jwt-decode";
import { fetchUserFriends } from "../actions/friends";

import { authenticateUser } from "../actions/auth";
import Page404 from "./Page404.js";

// const Settings = () => <div> Settings</div>;
const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};
class App extends react.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = getAuthToken();
    // console.log("token ", token);
    if (token) {
      const user = jwtDecode(token);

      console.log("userrrrrrr", user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
      this.props.dispatch(fetchUserFriends());
    }
  }
  render() {
    console.log("props", this.props);
    const { posts, auth, friends } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          {/* <PostsList posts={posts} /> */}
          {/* <ul>
            <li>
              {" "}
              <Link to="/"> Home</Link>
            </li>
            <li>
              {" "}
              <Link to="/login">Login </Link>
            </li>
            <li>
              {" "}
              <Link to="/signup">SignUp</Link>
            </li>
          </ul> */}
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedin={auth.isLoggedin}
                  />
                );
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedin={auth.isLoggedin}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}
App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
