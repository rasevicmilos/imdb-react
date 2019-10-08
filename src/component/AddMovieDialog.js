import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import { addNewMovie } from '../store/actions/MovieActions';
import { connect } from 'react-redux';
import { getGenres } from '../store/actions/GenreActions';

class AddMovieDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            title: '',
            description: '',
            imageUrl: '',
            genre: 1,
        }
    }

    handleClickOpen = () => {
        this.setOpen(true);
    }

    setOpen = (open) => {
        this.setState({
            open
        })
    }
    handleClose = () => {
        this.setOpen(false);
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
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
        
        console.log(newMovie.image_url);

        if(newMovie.image_url){
            if(this.isLinkValid(newMovie.image_url)){
                this.props.addNewMovie(newMovie);
                this.handleClose();
            } else {
                alert('Please enter a valid link!');
            }
        } else {
            this.props.addNewMovie(newMovie);
            this.handleClose();
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
        console.log(this.props.genres);
    }

    render() {
        return (
            <div className="my-2">
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Add a new movie
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Enter new movie information
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                        value={this.state.title}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                        fullWidth
                    />
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
                    <InputLabel className="mt-3" htmlFor="genre">Genre</InputLabel>
                    <select name="genre" 
                        onChange={this.handleGenreChange} 
                        className="genre"
                        value={this.state.genre}
                        >
                            {this.props.genres.map(genre => 
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                                )}
                    </select>
                    </DialogContent>
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

const mapStateToProps = (state) => {
    return {
        genres: state.genre.genres
    }
}

const mapDispatchToProps = {
    addNewMovie,
    getGenres
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMovieDialog)
