import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWatchList } from '../store/actions/MovieActions';
import MovieCard from './MovieCard';

class WatchList extends Component {
    componentDidMount() {
        this.props.getWatchList();
    }
    renderWatchListMovies = () => {
        return this.props.moviesInWatchList.length > 0 ? (
            this.props.moviesInWatchList.map(movie => 
                <MovieCard movie={movie} key={movie.id} history={this.props.history} navigatable={true} homepage={false}></MovieCard>
            )
        ) 
        : (
            <div className="text-center mt-5">
                <h3>There are no movies in your watch list</h3>
            </div>
        );
    };
    render() {
        return (
            <div>
                <div className="text-center lightBlue">
                    <h2 className="p-3 text-light">My Watch List </h2>
                </div>
                {this.props.loading ? (
                    <div className="text-center">
                        <h1>Loading...</h1>
                    </div>
                ) : (
                    this.renderWatchListMovies()
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        moviesInWatchList: state.movie.moviesInWatchList,
        loading: state.movie.loading
    }
}

const mapDispatchToProps = {
    getWatchList
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchList)