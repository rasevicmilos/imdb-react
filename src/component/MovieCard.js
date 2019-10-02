import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="card mt-2 p-3">
      <div className="container">
      <div className="row">
        <div className="col-sm-3 m-auto">
          <img src={movie.image_url} className="image" alt=""/>
        </div>
        <div className="col">
          <h4 className="card-title">
            {movie.title}
          </h4>
          <div className="card-content">
            <div className="card">
              <div className="card-content m-3">
                {movie.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MovieCard;
