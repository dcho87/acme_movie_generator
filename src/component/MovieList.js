import React, { Component } from "react";
import store, { fetchMovies, deleteMovie, upvoteMovie, downvoteMovie } from "../store";
import { connect } from "react-redux";

class MovieList extends Component {
    constructor(){
        super()
        this.state = {
            movies: []
        }
    }

async componentDidMount(){
    await this.props.load()
    this.setState({movies: store.getState()})
}

  render() {
    const { movies, deleteMovie, upvoteMovie, downvoteMovie } = this.props
    return (
      <div key={movies}>
        <ul>
          {movies.map((movie) => {
            return (
              <li key={movie.id}>
                <button onClick={() => deleteMovie(movie.id)}> X </button>
                {movie.movieTitle} ({movie.star})
                <button onClick={()=> upvoteMovie(movie)}> + </button>
                <button onClick={()=> downvoteMovie(movie)}> - </button>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(fetchMovies()),
    deleteMovie: (id) => dispatch(deleteMovie(id * 1)),
    upvoteMovie: (movie) => dispatch(upvoteMovie(movie)),
    downvoteMovie: (movie) => dispatch(downvoteMovie(movie))
})

export default connect(
  (state) => state,
  mapDispatchToProps
)(MovieList);
