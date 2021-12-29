import React, { Component } from "react";
import store, { fetchMovies, deleteMovie, upvoteMovie, downvoteMovie } from "../store";
import { connect } from "react-redux";


class MovieList extends Component {
    constructor(){
        super()
        this.state = store.getState()
}

async componentDidMount(){
    await this.props.load()
    this.setState(store.getState())
}

  render() {
    const { movies, deleteMovie, upvoteMovie, downvoteMovie } = this.props
    return (
      <div>
        <ul>
          {movies.map((movie) => {
            return (
              <div key={movie.id}>
                <button onClick={() => deleteMovie(movie)}> X </button>
                {movie.movieTitle} ({movie.star})
                <button onClick={()=> upvoteMovie(movie)}> + </button>
                <button onClick={()=> downvoteMovie(movie)}> - </button>
              </div>
            )
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(fetchMovies()),
    deleteMovie: (movie) => dispatch(deleteMovie(movie)),
    upvoteMovie: (movie) => dispatch(upvoteMovie(movie)),
    downvoteMovie: (movie) => dispatch(downvoteMovie(movie))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);