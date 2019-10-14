import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMovie, addComment, getComments } from '../store/actions/MovieActions'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ReactTooltip from 'react-tooltip';
import MovieCard from './MovieCard';
import RelatedMovies from './RelatedMovies';

const ENTER_KEY = 13;

class MovieItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentText: '',
            snackbarOpen: false
        }
    }
    componentDidMount() {
        this.props.getMovie(this.props.match.params.id);
    }
    componentDidUpdate(prevProps) {
        ReactTooltip.rebuild();
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.getMovie(this.props.match.params.id);
        }
    }
    keyPress = (e) => {
        if(e.keyCode === ENTER_KEY && !this.isEmptyOrSpaces(this.state.commentText)){
            if(this.state.commentText.length > 500) {
                this.setState({
                    snackbarOpen: true
                })
            } else {
                this.props.addComment({text: this.state.commentText, movie_id: this.props.movie.id});
                this.setState({
                    commentText: ''
                })
            }
            document.getElementById("commentText").blur();
            // this.commentInput.blur()
        }
    }
    isEmptyOrSpaces = (str) => {
        return str === null || str.match(/^ *\n*$/) !== null;
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    closeSnackbar = () => {
        this.setState({
            snackbarOpen: false
        })
    }
    getComments = () => {
        this.props.getComments({movieId: this.props.match.params.id, page: (this.props.activePage - 1) })
    }
    render() {
        const comments =  this.props.activeMovieComments && this.props.activeMovieComments.map(comment => 
            <div className="card mt-1 mb-1 mx-2" key={comment.id}>
                <div className="card-content m-2">
                    <h6>{comment.username}</h6>
                    {comment.text}
                </div>
            </div>
        );
        
        return (
            <div>
                {!this.props.loading ? (
                    <div>
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
                                aria-describedby="client-snackbar"
                                message={
                                    <h6 className="mt-2">Comment is too long</h6>
                                }
                                action={[
                                    <button key="close" className="btn btn-secondary" onClick={this.closeSnackbar}>Close</button>
                                ]}
                            />
                        </Snackbar>
                        <div className="row">
                            <div className="col">
                                <MovieCard movie={this.props.movie} navigatable={false} homepage={false}></MovieCard>
                            </div>
                            <div className="col-2">
                                {this.props.movie.id && <RelatedMovies movie={this.props.movie} history={this.props.history}></RelatedMovies>}
                            </div>
                        </div>
                        <div className="card mt-3 mx-3 myColor">
                            <div className="card-content">
                                { !this.props.firstPageFetched && <div className="card mt-1 mb-1 mx-2">
                                    <div className="card-content m-2 text-center">
                                        <button onClick={this.getComments} className="btn btn-light">Show more comments</button>
                                    </div>
                                </div> }
                                {comments}
                                <div className="card card mt-1 mx-2 mb-1 px-2 py-2">
                                    <textarea
                                        cols="30" 
                                        rows="2"
                                        name="commentText"
                                        id="commentText"
                                        ref = {(ref) => {this.commentInput = ref;}}
                                        onChange={this.handleChange}
                                        onKeyDown={this.keyPress}
                                        value={this.state.commentText}
                                        className="form-control"
                                        placeholder="Write a comment..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <ReactTooltip effect="solid"/>
                    </div>
                ) : (
                    <div className="text-center">
                        <h1>Loading...</h1>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movie: state.movie.activeMovie,
        activeMovieComments: state.movie.activeMovieComments,
        firstPageFetched: state.movie.commentsFirstPageFetched,
        activePage: state.movie.commentsActivePage,
        loading: state.movie.loading
    }
}

const mapDispatchToProps = {
    getMovie,
    addComment,
    getComments
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem)