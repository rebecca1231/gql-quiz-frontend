import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 8rem;
  font-size: 1.5rem;
  border: 3px solid #eee;
  width: 100%;
  cursor: pointer;
`;
const Flashcard = ({
  item,
  choice2,
  color,
  answer,
  updateScore,
  score,
  updateCount,
  count,
  respondToCorrect,
  wrong,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [correct, setCorrect] = useState(false);
  const handleCorrect = () => {
    if (wrong.length < 1) {
      return (
        setCorrect(true),
        respondToCorrect(item),
        setTimeout(() => {
          return (updateScore(score), setCorrect(false), updateCount(count));
        }, 1000)
      );
    } else {
      return (
        setCorrect(true),
        setTimeout(() => {
          return (setCorrect(false), updateCount(count));
        }, 1000)
      );
    }
  };

  const handleIncorrect = () => {
    return (
      wrong.push(item),
      setWrongAnswer(true),
      setTimeout(() => {
        setWrongAnswer(false);
      }, 500)
    );
  };
  return (
    <Card
      style={{ backgroundColor: `${color}` }}
      onClick={() => {
        return (
          setShowAnswer(true),
          setTimeout(() => {
            setShowAnswer(false);
          }, 1000),
          answer === choice2 ? handleCorrect() : handleIncorrect()
        );
      }}
    >
      {showAnswer && correct ? (
        <h1>GOOD!</h1>
      ) : showAnswer && wrongAnswer ? (
        <>
          {choice2}
          <h1>X</h1>
        </>
      ) : (
        choice2
      )}
    </Card>
  );
};

export default Flashcard;
