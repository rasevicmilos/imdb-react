import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import { getMovies, searchMovies } from '../store/actions/MovieActions';
import MovieCard from '../component/MovieCard';

import Pages from '../component/Pages';
import AddMovieDialog from '../component/AddMovieDialog';
import Search from '../component/Search';
import MostPopular from '../component/MostPopular';
import AddMovieFromOMDBDialog from '../component/AddMovieFromOMDBDialog';
import ConfirmAddMovieDialog from '../component/ConfirmAddMovieDialog';

class Home extends Component {
  componentDidMount() {
    if(this.isEmptyOrSpaces(this.props.queryString) && this.props.genre === 0) {
      this.props.getMovies(this.props.match.params.id);
    } else {
      this.props.searchMovies({ query: this.props.queryString, page:this.props.match.params.id, genre: this.props.genre});
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      if(this.isEmptyOrSpaces(this.props.queryString) && this.props.genre === 0) {
        this.props.getMovies(this.props.match.params.id);
      } else {
        this.props.searchMovies({ query: this.props.queryString, page:this.props.match.params.id, genre: this.props.genre});
      }
    }
  }

  renderMovies = () => {
    return this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie} history={this.props.history} navigatable={true} homepage={true}/>);
  };

  isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="mb-4">
              <div className="row">
                <div className="col-3 mt-4">
                  <AddMovieDialog></AddMovieDialog>
                </div>
                <div className="col-4 mt-4">
                  <AddMovieFromOMDBDialog></AddMovieFromOMDBDialog>
                  <ConfirmAddMovieDialog></ConfirmAddMovieDialog>
                </div>
                <div className="col-5 mt-4">
                  <Search history={this.props.history}></Search>
                </div>
              </div>
            </div>
            {this.props.loading ? (
              <div className="text-center">
                <h1>Loading...</h1>
              </div>
            ) : (
              this.renderMovies()
            )}
            <Pages></Pages>
          </div>
          <div className="col-3">
            <MostPopular history={this.props.history}></MostPopular>
          </div>
        </div>   
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movie.all,
    queryString: state.movie.queryString,
    genre: state.movie.activeGenre,
    loading: state.movie.loading
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