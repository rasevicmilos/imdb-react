import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovie, likeMovie, dislikeMovie, removeDislike, removeLike } from '../store/actions/MovieActions';
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'

class MovieCard extends Component {
    showMovie = (movieId) => {
      this.props.history.push('/movie/' + movieId);
    }
    likeMovie = (movieId) => {
      this.props.likeMovie(movieId);
    }
    dislikeMovie = (movieId) => {
      this.props.dislikeMovie(movieId);
    }
    removeLike = (movieId) => {
      this.props.removeLike(movieId);
    }
    removeDislike = (movieId) => {
      this.props.removeDislike(movieId);
    }
    render() {
      return (
        <div className="card mt-2 p-3 myColor">
          <div className="container">
            <div className="row movieRow">
              <div className="col-sm-4 col-lg-3 m-auto">
                <img 
                  onClick={() => this.showMovie(this.props.movie.id)} 
                  src={this.props.movie.image_url} 
                  className="image" 
                  alt=""
                  style={{cursor:'pointer'}}
                  />
              </div>
              <div className="col">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4 className="card-title" 
                              style={{cursor:'pointer'}} 
                              onClick={() => this.showMovie(this.props.movie.id)}>
                                {this.props.movie.title}
                            </h4>
                        </div>
                        <div className="col-sm-3">
                            {this.props.movie.user_liked ? (
                                <ThumbUp 
                                style={{cursor:'pointer'}}  
                                onClick={() => this.removeLike(this.props.movie.id)}
                                className="mr-1 mb-1 text-success"
                                ></ThumbUp> 
                            ) : (
                                <ThumbUp
                                style={{cursor:'pointer'}}  
                                onClick={() => this.likeMovie(this.props.movie.id)}
                                className="mr-1 mb-1"></ThumbUp> 
                            )}
                            {this.props.movie.number_of_likes}
                            {this.props.movie.user_disliked ? (
                                <ThumbDown 
                                style={{cursor:'pointer'}}  
                                onClick={() => this.removeDislike(this.props.movie.id)}
                                className="ml-2 mr-1 text-danger"></ThumbDown>
                            ) : (
                                <ThumbDown
                                style={{cursor:'pointer'}}  
                                onClick={() => this.dislikeMovie(this.props.movie.id)}
                                className="ml-2 mr-1"></ThumbDown>
                            )}
                            {this.props.movie.number_of_dislikes}
                        </div>
                        <div className="col-sm-2">
                          {this.props.movie.number_of_views ? (
                              <p className="float-right">Views: {this.props.movie.number_of_views}</p>
                          ):(
                              <p className="float-right">No views</p>

                          )}
                        </div>
                    </div>
                </div>
                <div className="card-content">
                  <div className="card myColor">
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
  getMovie,
  likeMovie,
  dislikeMovie,
  removeDislike,
  removeLike
}


export default connect(null, mapDispatchToProps)(MovieCard);
