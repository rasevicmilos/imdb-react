import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (  
            <div className="myNavbar">
                <button className="btn btn-light float-right mt-3 mr-3">Logout</button>
                <h1 className="text-light pt-4 ml-3">Pocket IMDB</h1>
            </div>
        )
    }
}

export default Navbar