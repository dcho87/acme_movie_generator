import React from "react";
import AddMovie from "./AddMovie";
import MovieList from "./MovieList";

function App(){

        return (
            <div>
              <h1> ACME Movie Generator </h1>
              <AddMovie />
              <MovieList />
            </div>
        );
      }

export default App;
