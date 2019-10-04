import React, { Component } from 'react'
import { connect } from 'react-redux';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import { searchMovies, getMovies, setQuery } from '../store/actions/MovieActions';


class Search extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this); 
        this.debouncedOnChange = _.debounce(this.debouncedOnChange.bind(this), 750); 
    }
    onChange(event) {
        this.debouncedOnChange(event.target.value);
    } 
    debouncedOnChange(value) {
        this.search(value);
    }
    search(value) {
        if(this.isEmptyOrSpaces(value)){
            this.props.setQuery("");
            this.props.getMovies(1);
            this.props.history.push('/home/1');
        } else {
            this.props.searchMovies({query: value, page: 1});
        }
    }
    isEmptyOrSpaces = (str) => {
        return str === null || str.match(/^ *$/) !== null;
    }
    render() {
        return (
            <div className="container mt-4">
                <TextField
                    margin="dense"
                    id="search"
                    label="Search"
                    type="text"
                    name="search"
                    variant="outlined"
                    className="float-right"
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

const mapDispatchToProps = {
    searchMovies,
    getMovies,
    setQuery
}

export default connect(null, mapDispatchToProps)(Search)