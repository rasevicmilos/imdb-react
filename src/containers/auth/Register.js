import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { register } from '../../store/actions/AuthActions';

class Register extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    passwordConfirmation: ''
  };

  handleInputChange = field => event => this.setState({ [field]: event.target.value });

  submit = event => {
    event.preventDefault();

    let registerData = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    };
    this.resetValidation();
    if(this.isEmptyOrSpaces(this.state.email) || 
      this.isEmptyOrSpaces(this.state.password) || 
      this.isEmptyOrSpaces(this.state.name) || 
       !this.passwordsMatch()){
      this.setState({
        emailEmpty: this.isEmptyOrSpaces(this.state.email),
        passwordEmpty: this.isEmptyOrSpaces(this.state.password),
        nameEmpty: this.isEmptyOrSpaces(this.state.name),
        passwordsDoNotMatch: !this.passwordsMatch()
      })
    } else {
      this.props.register(registerData);
      this.resetValidation();
    }
  };

  resetValidation = () => {
    this.setState({
      emailEmpty: false,
      passwordEmpty: false,
      nameEmpty: false,
      passwordsDoNotMatch: false
    });
  }

  passwordsMatch = () => {
    return this.state.password === this.state.passwordConfirmation;
  }

  isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="card mt-5 mx-5 pt-3 px-3 pb-3">
          <form onSubmit={this.submit}>
            <h2>Register</h2>
            <div className="form-group">
              <label 
                htmlFor="email"
              >
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                className="form-control"
                id="email"
                onChange={this.handleInputChange('email')}
              />
              {this.state.emailEmpty && <p className="text-danger">Email cannot be blank</p>}
              {this.props.registerError['email'] && <p className="text-danger">{this.props.registerError['email']}</p>}
            </div>
            <div className="form-group">
              <label 
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                id="password"
                className="form-control"
                value={this.state.password}
                onChange={this.handleInputChange('password')}
              />
              {this.state.passwordEmpty && <p className="text-danger">Password cannot be blank</p>}
              {this.props.registerError['password'] && <p className="text-danger">{this.props.registerError['password']}</p>}
            </div>
            <div className="form-group">
              <label 
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                id="confirmPassword"
                className="form-control"
                value={this.state.passwordConfirmation}
                onChange={this.handleInputChange('passwordConfirmation')}
              />
              {this.state.passwordsDoNotMatch && <p className="text-danger">Passwords do not match</p>}
            </div>
            <div className="form-group">
              <label 
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                id="name"
                className="form-control"
                value={this.state.name}
                onChange={this.handleInputChange('name')}
              />
              {this.state.nameEmpty && <p className="text-danger">Name cannot be blank</p>}
              {this.props.registerError['name'] && <p className="text-danger">{this.props.registerError['name']}</p>}
            </div>
            <input className="btn btn-primary" type="submit" value="Register" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registerError: state.error.registerError
  };
};

const mapDispatchToProps = {
  register
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
