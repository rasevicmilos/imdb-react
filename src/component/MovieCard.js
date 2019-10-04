import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovie } from '../store/actions/MovieActions';

class MovieCard extends Component {
    showMovie = (movieId) => {
      this.props.history.push('/movie/' + movieId);
    }
    render() {
      return (
        <div className="card mt-2 p-3" onClick={() => this.showMovie(this.props.movie.id)}>
          <div className="container">
          <div className="row">
            <div className="col-sm-3 m-auto">
              <img src={this.props.movie.image_url} className="image" alt=""/>
            </div>
            <div className="col">
              <div>
                    {this.props.movie.number_of_views ? (
                        <p className="float-right">Views: {this.props.movie.number_of_views}</p>
                    ):(
                        <p className="float-right">No views</p>

                    )}
                  <h4 className="card-title">
                      {this.props.movie.title}
                  </h4>
              </div>
              <div className="card-content">
                <div className="card">
                  <div className="card-content m-3">
                    {this.props.movie.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      );
    }
};

const mapDispatchToProps = {
  getMovie
}


export default connect(null, mapDispatchToProps)(MovieCard);
