import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { setOMDBConfirmOpen, addMovieFromOMDB } from '../store/actions/OMDBActions';

class ConfirmAddMovieDialog extends Component {
    handleCancel = () => {
        this.props.setOMDBConfirmOpen(false);
    }
    handleSubmit = () => {
        this.props.addMovieFromOMDB(this.props.movie);
    }
    render() {
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.handleCancel} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
                    <DialogContentText className="ml-4">
                        Are you sure you want to add this movie?
                    </DialogContentText>
                    <DialogContent>
                    <div className="row">
                        <div className="col-5">
                            <img className="image" src={this.props.movie.image_url} alt=""/>
                        </div>
                        <div className="col-7">
                            <h2>{this.props.movie.title}</h2>
                            <p>Genre: {this.props.movie.genre}</p>
                            <p>{this.props.movie.description}</p>
                        </div>
                    </div>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={this.handleSubmit} color="primary">
                        Confirm
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movie: state.omdb.activeMovie,
        open: state.omdb.omdbConfirmOpen
    }
}

const mapDispatchToProps = {
    setOMDBConfirmOpen,
    addMovieFromOMDB
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAddMovieDialog)