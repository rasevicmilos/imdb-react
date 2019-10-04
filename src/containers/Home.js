import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import { getMovies, searchMovies } from '../store/actions/MovieActions';
import MovieCard from '../component/MovieCard';

import Pages from '../component/Pages';
import AddMovieDialog from '../component/AddMovieDialog';
import Search from '../component/Search';

class Home extends Component {
  componentDidMount() {
    this.props.getMovies(this.props.match.params.id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      if(this.isEmptyOrSpaces(this.props.queryString)) {
        this.props.getMovies(this.props.match.params.id);
      } else {
        this.props.searchMovies({ query: this.props.queryString, page:this.props.match.params.id });
      }
    }
  }

  renderMovies = () => {
    return this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie} history={this.props.history}/>);
  };

  isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  }

  render() {
    return (
      <div className="container">
          <div className="mb-4">
            <Search history={this.props.history}></Search>
            <AddMovieDialog></AddMovieDialog>
          </div>
          {this.renderMovies()}
          <Pages></Pages>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movie.all,
    queryString: state.movie.queryString
  };
};

const mapDispatchToProps = {
  getMovies,
  searchMovies
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
