import React, { Component } from "react";
import { addMovie } from "../store";
import { connect } from "react-redux";
import faker from "faker";

class AddMovie extends Component {
  constructor() {
    super();
    this.state = {
      movieTitle: "",
      star: 3,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

const mapDispatchToProps = (dispatch) => {
  return {
    addMovie: (movie) => dispatch(addMovie(movie)),
  };
};

export default connect(null, mapDispatchToProps)(AddMovie);
