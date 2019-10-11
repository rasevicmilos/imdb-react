import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovie, likeMovie, dislikeMovie, removeDislike, removeLike, addToWatchList, removeFromWatchList, markAsWatched } from '../store/actions/MovieActions';
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import AddBox from '@material-ui/icons/AddBox';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import ReactTooltip from 'react-tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircle from '@material-ui/icons/CheckCircle';

class MovieCard extends Component {
    constructor(props){
      super(props);

      this.state = {
        snackbarOpen: false,
        snackBarMessage: ''
      }
    }
    componentDidUpdate() {
      ReactTooltip.rebuild();
    }
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
    addToWatchList = (movieId) => {
      this.props.addToWatchList(movieId);
      this.closeSnackbar();
      this.setState({
        snackBarMessage: 'Added to Watch List',
        snackbarOpen: true
      });
    }
    removeFromWatchList = (movieId) => {
      this.props.removeFromWatchList(movieId);
      this.closeSnackbar();
      this.setState({
        snackBarMessage: 'Removed from Watch List',
        snackbarOpen: true
      });
      ReactTooltip.hide();
    }
    closeSnackbar = () => {
      this.setState({
          snackbarOpen: false
      })
    }
    markAsWatched = (movieId) => {
      this.props.markAsWatched(movieId);
    }
    render() {
      return (
        <div className="card mt-2 p-3 myColor">
          <div className="container">
            <div className="row movieRow">
              <div className="col-sm-4 col-lg-3 m-auto">
                {this.props.navigatable ? (
                  <img 
                  onClick={() => this.showMovie(this.props.movie.id)} 
                  src={this.props.movie.image_url} 
                  className="image" 
                  alt=""
                  style={{cursor:'pointer'}}
                  />
                ) : (
                  <img  
                  src={this.props.movie.image_url} 
                  className="image" 
                  alt=""
                  />
                )
                }
              </div>
              <div className="col">
                <div className="container">
                    <div className="row">
                        <div className="col">
                          {this.props.navigatable ? (
                            <h4 className="card-title" 
                              style={{cursor:'pointer'}} 
                              onClick={() => this.showMovie(this.props.movie.id)}>
                                {this.props.movie.title}
                            </h4>
                          ) : (
                            <h4 className="card-title" 
                              >
                                {this.props.movie.title}
                            </h4>
                          )}
                            
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
                                onClick={() => this.likeMovie(this.props.movie.id)}
                                className="mr-1 mb-1 likeButton"></ThumbUp> 
                            )}
                            {this.props.movie.number_of_likes}
                            {this.props.movie.user_disliked ? (
                                <ThumbDown
                                style={{cursor:'pointer'}}
                                onClick={() => this.removeDislike(this.props.movie.id)}
                                className="ml-2 mr-1 text-danger"></ThumbDown>
                            ) : (
                                <ThumbDown 
                                onClick={() => this.dislikeMovie(this.props.movie.id)}
                                className="ml-2 mr-1 dislikeButton"></ThumbDown>
                            )}
                            {this.props.movie.number_of_dislikes}
                        </div>
                        <div>
                          {!this.props.movie.in_watchlist ? (
                            <AddBox 
                              onClick={() => this.addToWatchList(this.props.movie.id)} 
                              data-tip="Add to watchlist" 
                              className="addToWatchListButton">
                            </AddBox>
                          ) : (
                            <RemoveCircle 
                              onClick={() => this.removeFromWatchList(this.props.movie.id)} 
                              data-tip="Remove from watchlist" 
                              className="removeFromWatchListButton">
                            </RemoveCircle>
                          )}
                        </div>
                        <div className="col-sm-3">
                          {this.props.movie.number_of_views ? (
                              <p className="float-right">Views: {this.props.movie.number_of_views}</p>
                          ):(
                              <p className="float-right">No views</p>
                          )}
                        </div>
                    </div>
                    <div className="row">
                      <div className="col">
                          {this.props.movie.genre && <p>
                              {this.props.movie.genre.name}
                          </p> }
                      </div>
                      <div className="col-4">
                          {this.props.movie.watched ?( <p>
                              <CheckCircle className="text-success mr-1 mb-1"></CheckCircle> 
                              Watched
                          </p>) : (<p className="text-secondary">
                              <CheckCircle onClick={() => this.markAsWatched(this.props.movie.id)} data-tip="Mark as watched" className="mr-1 mb-1 markAsWatchedButton"></CheckCircle> 
                              Not watched
                          </p>)}
                      </div>
                    </div>
                </div>
                <div className="card-content">
                  <div className="card myColor">
                    <div className="card-content m-3">
                      { (this.props.homepage && this.props.movie.description.length > 150) ? (
                        this.props.movie.description.substring(0, 150) + '...'
                      ) : (
                        this.props.movie.description
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.snackbarOpen}
              autoHideDuration={5000}
              onClose={this.closeSnackbar}
          >
              <SnackbarContent
                  className="bg-primary"
                  aria-describedby="client-snackbar"
                  message={
                      <h6 className="mt-2">{this.state.snackBarMessage}</h6>
                  }
                  action={[
                      <button 
                        key="close" 
                        className="btn btn-outline-light" 
                        onClick={this.closeSnackbar}
                      >Close
                      </button>
                  ]}
              />
          </Snackbar>
          <ReactTooltip effect="solid"/>
        </div>
      );
    }
};

const mapDispatchToProps = {
  getMovie,
  likeMovie,
  dislikeMovie,
  removeDislike,
  removeLike,
  addToWatchList,
  removeFromWatchList,
  markAsWatched
}


export default connect(null, mapDispatchToProps)(MovieCard);
