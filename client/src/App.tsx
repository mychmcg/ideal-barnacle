import ApolloClient from "apollo-boost";
import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import Sets from "./components/Sets";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://overload-server.herokuapp.com/graphql"
      : "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ApolloProvider client={client}>
            <nav>
              <a href="/exercises">
                <div className="parent-screen-link">
                  {"<- Back to Exercises"}
                </div>
              </a>
              <a href="/date-picker">
                <div className="exercise-page-workout-date">{"Feb 14"}</div>
              </a>
              <a href="/exercise-picker">
                <div className="exercise-page-name exercise-name">
                  Bench Press
                </div>
              </a>
              <div className="menu hidden">
                <ul className="li">
                  <a href="/">Home</a>
                </ul>
                <ul className="li">
                  <a href="/exercises">Exercises</a>
                </ul>
                <ul className="li">
                  <a href="/workouts">Workouts</a>
                </ul>
                <ul className="li">
                  <a href="/profile">Profile</a>
                </ul>
                <ul className="li">
                  <a href="/graphs">Graphs</a>
                </ul>
              </div>
            </nav>
            <Sets />
            {/* <CreateExerciseForm />
            <ExerciseList /> */}
          </ApolloProvider>
        </header>
      </div>
    );
  }
}

export default App;
