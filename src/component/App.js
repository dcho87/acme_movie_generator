import React, { Component } from "react";
import { connect } from "react-redux";
import AddMovie from "./AddMovie";
import MovieList from "./MovieList";

class App extends Component {

  render() {
    return (
        <div>
            <h1> ACME Movie Generator </h1>
            <AddMovie />
            <MovieList />
      </div>
    );
  }
}

export default connect(
  (state) => state,
)(App);