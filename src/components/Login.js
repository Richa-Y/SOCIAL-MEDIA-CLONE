import React, { Component } from "react";
import { login, clearAuthState } from "../actions/auth";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Login extends React.Component {
  constructor() {
    super();
    // this.emailInputRef = React.createRef();
    // this.PasswordInputRef = React.createRef();
    this.state = {
      email: "",
      password: "",
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handleEmailChange = (e) => {
    console.log(e.target.value);
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    console.log(e.target.value);
    this.setState({
      password: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
    }
    // console.log(this.emailInputRef);
    // console.log(this.PasswordInputRef);
  };

  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (isLoggedin) {
      return <Redirect to={from} />;
    }
    return (
      <div className="login-form">
        <span className="login-signup-header">Log In</span>=
        {error && <div className="login-signup-header2"> ${error} </div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            // ref={this.emailInputRef}
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            required
            // ref={this.PasswordInputRef}
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleSubmit} disabled={inProgress}>
              {" "}
              Loggin In...
            </button>
          ) : (
            <button onClick={this.handleSubmit} disabled={inProgress}>
              {" "}
              Log In
            </button>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);

// export default Login;
