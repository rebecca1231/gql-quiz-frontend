import React, { useState, useCallback, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import Flashcard from "./Flashcard";
import { CountContext } from "../context/countContext";
import { getRandomNumber } from "../util/quiz/getRandomNumber";
import { FETCH_MOVIE_LIST_QUERY } from "../util/quiz/graphqlFetchData";
import "./Quiz.css";

const Choices = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const correctAnswers = [];

const Review = () => {
  const { searchTerm } = useParams();
  const history = useHistory();
  const [, setUpdate] = useState();
  const forceUpdate = useCallback(() => setUpdate({}), []);
  const [finished, setFinished] = useState(false);
  const { count, score, updateCount, updateScore } = useContext(CountContext);
  let wrong = []

  const { data: { getMovieList: list } = {} } = useQuery(
    FETCH_MOVIE_LIST_QUERY,
    {
      variables: { searchTerm },
    }
  );

  if (list) {
    let dataSet = [...list.items];
    let currentSet = dataSet.filter((d) => !correctAnswers.includes(d));
    const dataLength = list.items.length + 1;
    let items = [];
    let answer = "";

    const chooseChoices = (numberOfChoices = 4) => {
      if (currentSet.length > 4) {
        let counter = 0;
        while (counter < numberOfChoices) {
          let item = currentSet[getRandomNumber(currentSet.length)];
          if (items.includes(item)) {
            item = currentSet[getRandomNumber(currentSet.length)];
          } else {
            items.push(item);
            counter++;
          }
        }
      } else {
        let counter = currentSet.length;
        items = [...currentSet];
        while (counter < 4) {
          let item = correctAnswers[getRandomNumber(correctAnswers.length)];
          if (items.includes(item)) {
            item = correctAnswers[getRandomNumber(correctAnswers.length)];
          } else {
            items.push(item);
            counter++;
          }
        }
      }
      console.log("Choices", items);
      return items;
    };

    const respondToCorrect = (item) => {
      if (correctAnswers.includes(item)) {
        return;
      } else correctAnswers.push(item);
      if (correctAnswers.length + 1 === dataLength) setFinished(true);
      return correctAnswers;
    };

    const renderChoices = () => {
      chooseChoices();
      answer = items[getRandomNumber(3)];
      const colors = ["#cffffe", "#f9f7d9", "#a3d2ca", "#ffe0f7"];
      return items.map((item) => {
        const itemIndex = items.indexOf(item);
        return (
          <Flashcard
            item={item}
            key={itemIndex}
            choice1={item["question"]}
            choice2={item["answer"]}
            color={colors[itemIndex]}
            answer={answer["answer"]}
            updateScore={updateScore}
            score={score}
            updateCount={updateCount}
            count={count}
            respondToCorrect={respondToCorrect}
            wrong={wrong}
          />
        );
      });
    };
    return (
      <>
        {finished ? (
          <div className="container">
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div style={{ textAlign: "center" }} className="finished">
              <h1>You have reviewed all the words in this set!</h1>
              <h3>Well Done!</h3>{" "}
              <div className="item">
                <div
                  onClick={() => history.push("/score")}
                  className="ui basic big button blue"
                >
                  Show my scores!
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1>Review </h1>
            <h4>Your score: {score}</h4>
            <h3>Question: {count}</h3>
            <Choices>{renderChoices()}</Choices>
            <div>
              <h3> Please find the correct answer: </h3>
              <h2 style={{ textAlign: "center" }}>{answer["question"]} </h2>
              <p>Words in this Set: {dataLength}</p>
            </div>
            <div className="ui secondary menu">
              <div className="menu right">
                <button
                  onClick={() => forceUpdate()}
                  className="ui basic button item"
                >
                  Skip!<i className="arrow right icon right floated"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  } else
    return (
      <div>
        <h1>Something's Missing</h1>
        <p>You have no quiz data</p>
        <p>Please select your quiz details.</p>
        <div
          onClick={() => history.push("/create")}
          className="ui basic teal button"
        >
          Get Your Data
        </div>
        <p>Or try refreshing the page.</p>
      </div>
    );
};

export default Review;
