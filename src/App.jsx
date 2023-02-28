import React from "react";
import "./App.css";
import Question from "./assets/Question";

function App() {
  const [data, setData] = React.useState([]);
  const [chosenOptions, setChosenOptions] = React.useState({});
  const [submitStatus, setSubmitStatus] = React.useState(false);
  const correctValues = [];
  for (let i = 0; i < data.length; i++) {
    correctValues[i] = data[i]["correct_answer"];
  }
  const score = () => {
    let score = 0;
    for (let i = 0; i < correctValues.length; i++) {
      if (chosenOptions[i] === correctValues[i]) {
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
    console.log("use_state")
    fetch(
      "https://opentdb.com/api.php?amount=5&category=31&difficulty=medium&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(() => {
          return data["results"].map((obj) => {
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
        chosenOptions={chosenOptions}
        handleChange={handleChange}
      />
    );
  });

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {questions}
        <div className="button-div">
          <div className="score-div">
          {submitStatus ? <h3>Your score is {score()} / 5</h3> : <></>}
          </div>
          {submitStatus ? <button className="submit-button" onClick={() => location.reload()}> Play again </button> : <button type="submit" className="submit-button"> Check answers </button>}
        </div>
      </form>
    </div>
  );
}

export default App;
