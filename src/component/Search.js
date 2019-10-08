import React, { Component } from 'react'
import { connect } from 'react-redux';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import { searchMovies, getMovies, setQuery, setGenre } from '../store/actions/MovieActions';


class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterByGenre: false,
            genre: 0,
            query: ''
        }
    
        this.onChange = this.onChange.bind(this); 
        this.debouncedOnChange = _.debounce(this.debouncedOnChange.bind(this), 750); 
    }
    onChange(event) {
        this.setState({
            query: event.target.value
        })
        this.debouncedOnChange();
    } 
    debouncedOnChange() {
        this.search();
    }
    search() {
        // if(this.isEmptyOrSpaces(this.state.query)){
        //     this.props.setQuery("");
        //     this.props.getMovies(1);
        //     this.props.history.push('/home/1');
        // } else {
        this.props.searchMovies({query: this.state.query, page: 1, genre: this.state.genre});
        this.props.history.push('/home/1');
        // }
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
            <div className="container mt-4">
                 <div className="float-right ml-4">
                    <h6>Filter by genre:</h6>
                    <select onChange={this.setGenre}>
                        <option value={0}>All</option>
                        {this.props.genres.map(genre => 
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        )}
                    </select>
                </div>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.genre.genres
    }
}

const mapDispatchToProps = {
    searchMovies,
    getMovies,
    setQuery,
    setGenre
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)