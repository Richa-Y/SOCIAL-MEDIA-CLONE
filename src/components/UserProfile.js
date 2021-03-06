// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { fetchUserProfile } from "../actions/profile";

// class UserProfile extends Component {
//   componentDidMount() {
//     const { match } = this.props;

//     if (match.params.userId) {
//       // dispatch an action
//       this.props.dispatch(fetchUserProfile(match.params.userId));
//     }
//   }

//   render() {
//     const {
//       match: { params },
//       profile,
//     } = this.props;
//     console.log("this.props", params);
//     const user = profile.user;

//     // if (profile.inProgress) {
//     //   return <h1>Loading!</h1>;
//     // }

//     return (
//       <div className="settings">
//         <div className="img-container">
//           <img
//             src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
//             alt="user-dp"
//           />
//         </div>

//         <div className="field">
//           <div className="field-label">Name</div>
//           <div className="field-value">{user.name}</div>
//         </div>

//         <div className="field">
//           <div className="field-label">Email</div>
//           <div className="field-value">{user.email}</div>
//         </div>

//         <div className="btn-grp">
//           <button className="button save-btn">Add Friend</button>
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps({ profile }) {
//   return {
//     profile,
//   };
// }
// export default connect(mapStateToProps)(UserProfile);
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserProfile } from "../actions/profile";
import { APIUrls } from "../helpers/url";
import { getAuthToken } from "../helpers/utils";
import { addFriend } from "../actions/friends";
import { checkPropTypes } from "prop-types";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
    };
  }
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  checkIfUserIsAFriend = () => {
    console.log("this.props", this.props);
    const { match, friends } = this.props;
    const userId = match.params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  handleAddFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    const {
      match: { params },
      profile,
    } = this.props;
    console.log("thisiiii.props", profile);
    const user = profile.user;
    console.log("user", user);
    // if (profile.inProgress) {
    //   return <h1>Loading!</h1>;
    // }

    const isUserAFriend = this.checkIfUserIsAFriend();
    const { success, error } = this.state;
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {!isUserAFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button className="button save-btn">Remove Friend</button>
          )}

          {success && (
            <div className="alert success-dailog">
              Friend added successfully
            </div>
          )}
          {error && <div className="alert error-dailog">{error}</div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(mapStateToProps)(UserProfile);
