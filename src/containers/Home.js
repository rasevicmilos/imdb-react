import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import { getMovies } from '../store/actions/MovieActions';
import MovieCard from '../component/MovieCard';

import Pages from '../component/Pages';
import AddMovieDialog from '../component/AddMovieDialog';

class Home extends Component {
  componentDidMount() {
    this.props.getMovies(this.props.match.params.id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getMovies(this.props.match.params.id);
    }
  }

  renderMovies = () => {
    return this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie} history={this.props.history}/>);
  };

  render() {
    return (
      <div className="container">
          <AddMovieDialog></AddMovieDialog>
          {this.renderMovies()}
          <Pages></Pages>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movie.all
  };
};

const mapDispatchToProps = {
  getMovies
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
