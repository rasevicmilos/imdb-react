import React, { Component } from 'react';
import { logOut } from '../store/actions/AuthActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    logOut = () => {
        this.props.logOut();
    }
    render() {
        return (  
            <div className="myNavbar">
                <button className="btn btn-light float-right mt-3 mr-3" onClick={this.logOut}>Logout</button>
                <Link className="btn btn-light float-right mt-3 mr-3" to="/watchlist">My Watch List</Link>
                <Link to="/home/1"><h1 className="text-light pt-4 ml-3">Pocket IMDB</h1></Link>
            </div>
        )
    }
}

const mapDispatchToProps = {
    logOut
}

export default connect(null, mapDispatchToProps)(Navbar)