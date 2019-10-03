import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logIn } from '../../store/actions/AuthActions';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleInputChange = field => event => this.setState({ [field]: event.target.value });

  submit = event => {
    event.preventDefault();

    let logInData = {
      email: this.state.email,
      password: this.state.password
    };
    this.resetValidation();
    if (!this.emailValid()) {
      this.setState({
        emailError: true
      })
    } else {
      this.props.logIn(logInData);
      this.resetValidation();
    }
  };

  resetValidation = () => {
    this.setState({
      emailError: false
    })
  }

  emailValid = () => {
    if (this.state.email.length > 255) {
      return false
    }
    return this.state.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="card mt-5 mx-5 pt-3 px-3 pb-3">
          <form onSubmit={this.submit}>
            <h2>Log In</h2>
            <div className="form-group">
              <label 
                htmlFor="email"
              >
                Email address
              </label>
              <input
                type="text"
                placeholder="Email"
                id="email"
                className="form-control"
                value={this.state.email}
                onChange={this.handleInputChange('email')}
              />
            {this.state.emailError && <p className="text-danger">Please enter a valid email</p>}
            </div>
            <div className="form-group">
              <label 
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="form-control"
                value={this.state.password}
                onChange={this.handleInputChange('password')}
              />
            </div>
            {this.props.loginError && <p className="text-danger">Wrong username/password</p>}
            <input className="btn btn-primary" type="submit" value="Log in" />
          </form>
          <p className="pt-3">Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginError: state.error.loginError
  };
};

const mapDispatchToProps = {
  logIn
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
