import React, { Component } from 'react';
import { logOut } from '../store/actions/AuthActions';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import { searchMovies, getMovies, setQuery } from '../store/actions/MovieActions';

class Navbar extends Component {
    constructor(props) {
        super(props);
     
        this.onChange = this.onChange.bind(this); 
        this.debouncedOnChange = _.debounce(this.debouncedOnChange.bind(this), 750); 
      }
    logOut = () => {
        this.props.logOut();
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
            <div className="myNavbar">
                <button className="btn btn-light float-right mt-3 mr-3" onClick={this.logOut}>Logout</button>
                <h1 className="text-light pt-4 ml-3">Pocket IMDB</h1>
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
                
            </div>
        )
    }
}

const mapDispatchToProps = {
    logOut,
    searchMovies,
    getMovies,
    setQuery
}

export default connect(null, mapDispatchToProps)(Navbar)