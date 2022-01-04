import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import axios from 'axios'
import faker from 'faker'

const SET_MOVIE = "SET_MOVIE"
const ADD_MOVIE = "ADD_MOVIE";
const DELETE_MOVIE = 'DELETE_MOVIE'
const UPVOTE = 'UPVOTE'
const DOWNVOTE = 'DOWNVOTE'


const moviesReducer = (state = [], action) => {
    if(action.type === SET_MOVIE){
        return [...action.movies.sort((a,b) => b.star - a.star)]
    }
    if(action.type === ADD_MOVIE){
        return [...state, action.movie]
    }
    if(action.type === DELETE_MOVIE){
        return state.filter((movie) => movie.id !== action.movie.id);
    }
    if(action.type === UPVOTE){
       return [...state].map((movie) => {
        if(movie.id === action.movie.id){
            movie.star++
        } return movie
        }
      )
    }
    if(action.type === DOWNVOTE){
        return [...state].map((movie) => {
         if(movie.id === action.movie.id){
            movie.star--
          } return movie
         }
       )
     }
    return state;
}

const _addMovie = (movie) => {
    return {
        type: ADD_MOVIE,
        movie
    }
}

const _upvoteMovie = (movie) => {
    return {
      type: UPVOTE,
      movie,
    };
  };

  const _downMovie = (movie) => {
    return {
      type: DOWNVOTE,
      movie,
    };
  };

const _deleteMovie = (movie) => {
    return {
        type: DELETE_MOVIE,
        movie
    }
}

const setMovies = (movies) => {
    return {
        type: SET_MOVIE,
        movies
    }
}

//thunk

const addMovie = () => {
    return async(dispatch) =>{
        const movie = await faker.name.title()
        const data = (await axios.post('/api/movies', {movieTitle: movie})).data
        dispatch(_addMovie((data)))
        dispatch(fetchMovies())
    }
}

const deleteMovie = (movie) => {
    return async(dispatch) => {
      await axios.delete(`/api/${movie.id}`)
      dispatch(_deleteMovie(movie))
      dispatch(fetchMovies())
    }
  }

const upvoteMovie = (movie)=> {
    return async(dispatch) => {
        dispatch(_upvoteMovie(movie))
        await axios.put(`/api/${movie.id}`, movie)
        dispatch(fetchMovies())
    }
}

const downvoteMovie = (movie)=> {
    return async(dispatch) => {
        dispatch(_downMovie(movie))
        await axios.put(`/api/${movie.id}`, movie)
        dispatch(fetchMovies())
    }
}

const fetchMovies = () => {
    return async(dispatch)=> {
        const movies = (await axios.get('/api/movies')).data
        console.log('fetched')
        dispatch(setMovies(movies))
    }
}

const reducer = combineReducers({
    movies: moviesReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store;
export { addMovie, deleteMovie, upvoteMovie, downvoteMovie, fetchMovies }