import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMovie, addComment } from '../store/actions/MovieActions'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ReactTooltip from 'react-tooltip';
import MovieCard from './MovieCard';

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
    componentDidUpdate() {
        ReactTooltip.rebuild();
    }
    keyPress = (e) => {
        if(e.keyCode === 13 && !this.isEmptyOrSpaces(this.state.commentText)){
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
    render() {
        const comments =  this.props.movie.comments && this.props.movie.comments.map(comment => 
            <div className="card mt-1 mb-1 mx-2" key={comment.id}>
                <div className="card-content m-2">
                    <h6>{comment.username}</h6>
                    {comment.text}
                </div>
            </div>
        );
        
        return (
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
                <MovieCard movie={this.props.movie}></MovieCard>
                <div className="card mt-3 mx-3 myColor">
                    <div className="card-content">
                        {comments}
                        <div className="card card mt-1 mx-2 mb-1 px-2 py-2">
                            <textarea
                                cols="30" 
                                rows="2"
                                name="commentText"
                                id="commentText"
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
        )
    }
}

const mapStateToProps = state => {
    return {
        movie: state.movie.activeMovie
    }
}

const mapDispatchToProps = {
    getMovie,
    addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem)