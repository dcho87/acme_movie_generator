import React, {useEffect} from "react";
import { deleteMovie, upvoteMovie, downvoteMovie, fetchMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => [...state.movies]);
  useEffect(() => dispatch(fetchMovies()),[movies])
  return (
    <div>
      <ul>
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <button onClick={() => dispatch(deleteMovie(movie))}> X </button>
              {movie.movieTitle} ({movie.star})
              <button
                disabled={movie.star === 5}
                onClick={() => dispatch(upvoteMovie(movie))}
              >
                {" "}
                +{" "}
              </button>
              <button
                disabled={movie.star === 1}
                onClick={() => dispatch(downvoteMovie(movie))}
              >
                {" "}
                -{" "}
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default MovieList;

// class MovieList extends Component {
//   componentDidMount() {
//     this.props.load();
//   }

//   render() {
//     const { movies, deleteMovie, upvoteMovie, downvoteMovie } = this.props;
//     return (
//       <div>
//         <ul>
//           {movies.map((movie) => {
//             return (
//               <div key={movie.id}>
//                 <button onClick={() => deleteMovie(movie)}> X </button>
//                 {movie.movieTitle} ({movie.star})
//                 <button onClick={() => upvoteMovie(movie)}> + </button>
//                 <button onClick={() => downvoteMovie(movie)}> - </button>
//               </div>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({ movies }) => ({
//   movies,
// });

// const mapDispatchToProps = (dispatch) => ({
//   load: () => dispatch(fetchMovies()),
//   deleteMovie: (movie) => dispatch(deleteMovie(movie)),
//   upvoteMovie: (movie) => dispatch(upvoteMovie(movie)),
//   downvoteMovie: (movie) => dispatch(downvoteMovie(movie)),
// });
