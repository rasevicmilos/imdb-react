import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRelated } from '../store/actions/MovieActions';

class RelatedMovies extends Component {
    componentDidMount(){
        this.props.getRelated(this.props.movie.id);
    }
    showMovie = (movieId) => {
        this.props.history.push('/movie/' + movieId);
    }
    render() {
        const relatedList = this.props.related && this.props.related.map(movie => 
            <div onClick={() => this.showMovie(movie.id) }
                className="card mt-1 p-1 myColor mostPopularMovie" 
                key={movie.id}>
                <div className="card-content">
                    {movie.title}
                </div>
            </div>
            ) 
        return (
            <div className="card mt-1 p-1 mr-3 myColor">
                <h6 className="card-title text-center">
                    Related movies:
                </h6>
                <div className="card-content">
                    {relatedList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        related: state.movie.relatedMovies
    }
}

const mapDispatchToProps = {
    getRelated
}

export default connect(mapStateToProps, mapDispatchToProps)(RelatedMovies)