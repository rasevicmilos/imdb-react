import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import { addNewMovie, setOpen, setClosed } from '../store/actions/MovieActions';
import { connect } from 'react-redux';
import { getGenres } from '../store/actions/GenreActions';
import FormLabel from '@material-ui/core/FormLabel';

class AddMovieDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            imageUrl: '',
            genre: 1,
            imageError: false,
            addDisabled: true
        }
    }

    reset = () => {
        this.setState({
            title: '',
            description: '',
            imageUrl: '',
            genre: 1,
            imageError: false,
            addDisabled: true
        })
    }

    handleClickOpen = () => {
        this.props.setOpen();
    }

    handleClose = () => {
        this.props.setClosed();
        this.reset();
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        setTimeout(
            function() {
                this.checkDisabled();
            }
            .bind(this),
            300
        );
    }

    checkDisabled = () => {
        if(!this.isEmptyOrSpaces(this.state.title) && !this.isEmptyOrSpaces(this.state.description)){
            this.setState({
                addDisabled: false
            });
        } else {
            this.setState({
                addDisabled: true
            });
        }
    }

    handleGenreChange = (e) => {
        const genre = parseInt(e.target.value, 10);
        this.setState({
            [e.target.name]: genre
        });
    }

    handleSubmit = () => {
        
        var newMovie = {
            title: this.state.title,
            description: this.state.description,
            genre_id: this.state.genre
        }

        if(!this.isEmptyOrSpaces(this.state.imageUrl)){
            newMovie = {...newMovie, image_url: this.state.imageUrl}
        }
        
        if(newMovie.image_url){
            if(this.isLinkValid(newMovie.image_url)){
                this.props.addNewMovie(newMovie);
                this.handleClose();
            } else {
                this.setState({
                    imageError: true
                })
            }
        } else {
            this.props.addNewMovie(newMovie);
            this.reset();
        }
    }

    isLinkValid = (link) => {
        var expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        return link.match(regex)
    }

    isEmptyOrSpaces = (str) => {
        return str === null || str.match(/^ *$/) !== null;
    }

    componentDidMount(){
        this.props.getGenres();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Add a new movie
                </Button>
                <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Enter new movie information
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
                    {this.props.addMovieError['title'] && <FormLabel className="text-danger">{this.props.addMovieError['title']}</FormLabel>}
                    <TextField
                        margin="dense"
                        id="description"
                        label="*Description"
                        type="text"
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                        fullWidth
                    />
                    {this.props.addMovieError['description'] && <FormLabel className="text-danger">{this.props.addMovieError['description']}</FormLabel>}
                    <TextField
                        margin="dense"
                        id="imageUrl"
                        label="Image URL"
                        type="text"
                        name="imageUrl"
                        onChange={this.handleChange}
                        value={this.state.imageUrl}
                        fullWidth
                    />
                    {this.state.imageError && <FormLabel className="text-danger">Please enter a valid link, or leave this field empty</FormLabel>}
                    <InputLabel className="mt-3" htmlFor="genre">*Genre</InputLabel>
                    <select name="genre" 
                        onChange={this.handleGenreChange} 
                        className="genre"
                        value={this.state.genre}
                        >
                            {this.props.genres.map(genre => 
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                                )}
                    </select>
                    <FormLabel className="float-right">* - required</FormLabel>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" disabled={this.state.addDisabled} onClick={this.handleSubmit} color="primary">
                        Add
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.genre.genres,
        addMovieError: state.error.addMovieError,
        open: state.movie.dialogOpen
    }
}

const mapDispatchToProps = {
    addNewMovie,
    getGenres,
    setOpen,
    setClosed
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMovieDialog)
