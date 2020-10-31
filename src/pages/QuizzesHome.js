import React from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition, Loader } from "semantic-ui-react";

import QuizCard from "../components/QuizCard";
import { FETCH_QUIZZES_QUERY } from "../util/graphql";
import MovieQuizMovie from '../MovieQuizMovie.mov'
import learnmore from '../learnmore.png'


const QuizzesHome = () => {
  const { loading, data: { getQuizzes: quizzes } = {} } = useQuery(
    FETCH_QUIZZES_QUERY
  );

  return (
    <Grid columns="2">
      <Grid.Row className="page-title">
        <h1>Welcome to Movie Quiz!</h1>
        <p style={{ fontSize: "1.35rem" }}>
          {" "}
          You can create a quiz, or play any of the ones below!
        </p>
        <p style={{ fontSize: "1.35rem" }}>
          If you want to save, comment or like a quiz, you'll need to login.
        </p>
        <video
        src={MovieQuizMovie}
        autoPlay="false"
        poster={learnmore}
        style={{ display: "block", margin: "1rem auto 1rem auto", width: "80vw", maxWidth:"400px" }}
        controls="controls"
      />      </Grid.Row>
      <Grid.Row className="page-title">
        <h2>Recent Quizzes</h2>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <Loader active inline="centered" />
        ) : (
          <Transition.Group>
            {quizzes &&
              quizzes.map((quiz) => (
                <Grid.Column key={quiz.id} style={{ marginBottom: "20px" }}>
                  <QuizCard quiz={quiz} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default QuizzesHome;
