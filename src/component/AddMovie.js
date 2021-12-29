import React, { Component } from "react";
import store, { addMovie } from "../store";
import { connect } from "react-redux";
import faker from "faker";

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState()
    this.handleSubmit = this.handleSubmit.bind(this);
  }

componentDidMount(){
  this.setState(store.getState())
}

  async handleSubmit(e) {
    e.preventDefault();
    const movie = await faker.name.title();
    this.props.addMovie({movieTitle: movie})
  }

  render() {
    return (
      <button type="submit" onClick={this.handleSubmit}>
        Genreate Random Movie
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      movies: state.movies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMovie: (movie) => dispatch(addMovie(movie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);