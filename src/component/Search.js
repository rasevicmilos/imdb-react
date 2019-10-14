import React, { Component } from 'react'
import { connect } from 'react-redux';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import { searchMovies, setGenre } from '../store/actions/MovieActions';


class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterByGenre: false,
            genre: 0,
            query: ''
        }
     
        this.debouncedOnChange = _.debounce(this.debounce, 750); 
    }
    onChange = (event) => {
        this.setState({
            query: event.target.value
        })
        this.debouncedOnChange();
    } 
    debounce = () => {
        this.search();
    }
    search() {
        this.props.searchMovies({query: this.state.query, page: 1, genre: this.state.genre});
        this.props.history.push('/home/1');
    }
    isEmptyOrSpaces = (str) => {
        return str === null || str.match(/^ *$/) !== null;
    }

    setGenre = (e) => {
      if(e.target.value === "0") {
        this.setState({
          genre: 0,
          filterByGenre: false
        })
      } else {
        this.setState({
          filterByGenre: true,
          genre: e.target.value
        })
      }
      var genreInt = parseInt(e.target.value, 10);
      this.props.setGenre(genreInt);
      this.debouncedOnChange();
    }

    render() {
        return (
            <div className="row">
                <div className="col-7">
                    <TextField
                        margin="dense"
                        id="search"
                        label="Search"
                        type="text"
                        name="search"
                        variant="outlined"
                        className="float-right bg-white"
                        onChange={this.onChange}
                    />
                </div>
                 <div className="col-5">
                    <h6>Filter by genre:</h6>
                    <select value={parseInt(this.props.activeGenre, 10)} onChange={this.setGenre}>
                        {/* <option value={parseInt(this.props.activeGenre, 10)}>All</option> */}
                        <option value={0}>All</option>
                        {this.props.genres.map(genre => 
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        )}
                    </select>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.genre.genres,
        activeGenre: state.movie.activeGenre
    }
}

const mapDispatchToProps = {
    searchMovies,
    setGenre
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)