import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getMostPopular } from '../store/actions/MovieActions';

class MostPopular extends Component {
    componentDidMount() {
        this.props.getMostPopular();
    }
    showMovie = (movieId) => {
        this.props.history.push('/movie/' + movieId);
    }
    render() {
        const mostPopularList = this.props.mostPopular && this.props.mostPopular.map(movie => 
            <div onClick={() => this.showMovie(movie.id) }
                className="card mt-1 p-1 myColor mostPopularMovie" 
                key={movie.id}>
                <div className="card-content">
                    {movie.title}
                </div>
            </div>
            ) 
        return (
            <div className="card mt-5 p-1 myColor">
                <h6 className="card-title text-center">
                    Most popular:
                </h6>
                <div className="card-content">
                    {mostPopularList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        mostPopular: state.movie.mostPopular
    }
}

const mapDispatchToProps = {
    getMostPopular
}

export default connect(mapStateToProps, mapDispatchToProps)(MostPopular)