import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Pages extends Component {
    render() {
        var pages = [];
        const numberOfPages = this.props.pages;
        for (var i = 1; i <= numberOfPages; i++) {
            pages.push(<Link to={'/home/' + i} key={i}  className="list-group-item myColor">{i}</Link>)
        }
        return (
            <div className="d-flex mt-4 mb-4">
                <ul className="list-group mx-auto list-group-horizontal-sm">
                    {pages}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pages: state.movie.pages
    }
}

export default connect(mapStateToProps)(Pages)