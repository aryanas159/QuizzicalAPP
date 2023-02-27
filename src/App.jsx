import React from "react";
import "./App.css";
import Question from "./assets/Question";

function App() {
  const [data, setData] = React.useState([]);
  const [chosenOptions, setChosenOptions] = React.useState({});
  const [submitStatus, setSubmitStatus] = React.useState(false);
  const chosenValues = Object.values(chosenOptions);
  const correctValues = [];
  for (let i = 0; i < data.length; i++) {
    correctValues[i] = data[i]["correct_answer"];
  }
  const incorrectValues = [];
  for (let i = 0; i < correctValues.length; i++) {
    if (correctValues[i] !== chosenValues[i]) {
      incorrectValues.push(chosenValues[i]);
    }
  }
  const score = () => {
    let score = 0;
    for (let i = 0; i < chosenValues.length; i++) {
      if (chosenValues[i] === correctValues[i]) {
        score++;
      }
    }
    return score;
  }

  const handleChange = (e) => {
    let id = e.target.name;
    let value = e.target.value;
    setChosenOptions((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };
  const optionsArray = (incorrect, correct) => {
    let newArray = [].concat(incorrect);
    newArray.push(correct);
    let sortedArray = newArray.sort(() => {
      return Math.random() - 0.5;
    });
    return sortedArray;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(true);
  };

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data["results"]);
        setData((prev) => {
          return prev.map((obj) => {
            return {
              ...obj,
              choices: optionsArray(
                obj["incorrect_answers"],
                obj["correct_answer"]
              ),
            };
          });
        });
      });
  }, []);

  const questions = data.map((question, question_index) => {
    const options = question.choices;
    return (
      <Question
        question={question["question"]}
        options_array={options}
        correct_options_array={correctValues}
        question_index={question_index}
        submitStatus={submitStatus}
        chosenValues={chosenValues}
        handleChange={handleChange}
      />
    );
  });

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {questions}
        <button type="submit"> Submit </button>
      </form>
      {submitStatus ? <h3>Score: {score()}</h3> : <></>}
    </div>
  );
}

export default App;
