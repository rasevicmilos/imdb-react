import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import Home from '../containers/Home';
import { authUser } from '../store/actions/AuthActions';
import Navbar from './Navbar';
import MovieItem from './MovieItem';
import WatchList from './WatchList';

class AppLayout extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      if (this.props.user) {
        this.props.history.push('/home/1');
      } else {
        this.props.history.push('/login');
      }
    }
  }

  render() {
    return this.props.user ? (
      <div>
        <Navbar history={this.props.history}></Navbar>
        <Route exact path="/home/:id" component={Home} history={this.props.history}/>
        <Route exact path="/movie/:id" component={MovieItem} />
        <Route exact path="/watchlist" component={WatchList} history={this.props.history}/>
      </div>
    ) : (
      <div>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authUser
  };
};

const mapDispatchToProps = () => {
  return {
    authUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppLayout)
);
