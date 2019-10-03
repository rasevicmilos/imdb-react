import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMovie } from '../store/actions/MovieActions'

class MovieItem extends Component {
    componentDidMount() {
        console.log(this.props.movie);
        this.props.getMovie(this.props.match.params.id);
    }
    render() {
        return (
            <div className="card mt-2 p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3 m-auto">
                            <img src={this.props.movie.image_url} className="image" alt=""/>
                        </div>
                        <div className="col">
                            <h4 className="card-title">
                                {this.props.movie.title}
                            </h4>
                            {this.props.movie.genre && <p>
                                {this.props.movie.genre.name}
                            </p> }
                        <div className="card-content">
                            <div className="card">
                                <div className="card-content m-3">
                                    {this.props.movie.description}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movie: state.movie.activeMovie
    }
}

const mapDispatchToProps = {
    getMovie
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem)