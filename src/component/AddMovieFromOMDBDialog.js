import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import { setOMDBOpen, getMovieFromApi, setMovieNotFound } from '../store/actions/OMDBActions';

class AddMovieFromOMDBDialog extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            year: '',
            titleError: false,
            yearError: false
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleClickOpen = () => {
        this.props.setOMDBOpen(true);
    }
    handleClose = () => {
        this.resetForm();
        this.resetErrors();
        this.props.setOMDBOpen(false);
        
    }
    resetErrors = () => {
        this.setState({
            titleError: false,
            yearError: false
        });
        this.props.setMovieNotFound(false);
    }
    resetForm = () => {
        this.setState({
            title: '',
            year: ''
        });
    }
    handleSubmit = () => {
        this.resetErrors();
        if(this.isEmptyOrSpaces(this.state.title)){
            this.setState({
                titleError: true
            });
        }
        else if(this.isEmptyOrSpaces(this.state.year)){
            this.props.getMovieFromApi({title: this.state.title});
        } else {
            if(this.isNumber(this.state.year)){
                this.props.getMovieFromApi({title: this.state.title, year: this.state.year});
            } else {
                this.setState({
                    yearError: true
                })
            }
        }
    }
    isEmptyOrSpaces = (str) => {
        return str === null || str.match(/^ *$/) !== null;
    }
    isNumber = (str) => {
        return str.match(/^[0-9]+$/) !== null;
    }
    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Add a movie from OMDB
                </Button>
                <Dialog maxWidth='xs' open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add from OMDB</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Enter movie title and year
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="*Title"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                        value={this.state.title}
                        fullWidth
                    />
                    {this.state.titleError && <FormLabel className="text-danger">Title can't be empty</FormLabel>}
                    <TextField
                        margin="dense"
                        id="year"
                        label="Year"
                        type="text"
                        name="year"
                        onChange={this.handleChange}
                        value={this.state.year}
                        fullWidth
                    />
                    {this.state.yearError && <FormLabel className="text-danger">Year is invalid</FormLabel>}
                    <FormLabel className="float-right">* - required</FormLabel>
                    </DialogContent>
                    {this.props.movieNotFound && <FormLabel className="text-danger text-center">Movie not found</FormLabel>}
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={this.handleSubmit} color="primary">
                        Add
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        open: state.omdb.omdbDialogOpen,
        movieNotFound: state.omdb.movieNotFound
    }
}

const mapDispatchToProps = {
    setOMDBOpen,
    getMovieFromApi,
    setMovieNotFound
}


export default connect(mapStateToProps, mapDispatchToProps)(AddMovieFromOMDBDialog)