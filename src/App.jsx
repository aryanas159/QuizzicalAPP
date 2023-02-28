import React from "react";
import "./App.css";
import Question from "./assets/Question";
import Front_page from "./Front_page";
function App() {
  const [data, setData] = React.useState([]);
  const [chosenOptions, setChosenOptions] = React.useState({});
  const [submitStatus, setSubmitStatus] = React.useState(false);
  const [startStatus, setStartStatus] = React.useState(false)
  const [category, setCategory] = React.useState("9")
  const [skipCount, setSkipCount] = React.useState(true);
  React.useEffect(() => {
    if (skipCount) setSkipCount(false);
    if (!skipCount) getData();
}, [startStatus])

  const getData = () => {
    fetch(
      `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=medium&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(() => {
          console.log(data)
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
  }
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
const handleStart = () => {
  setStartStatus(true)
}
const handleToggle = (e) => {
  setCategory(e.target.value)
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


  const questions = data.map((question, question_index) => {
    const options = question.choices;
    return (
      <Question
        key={question_index}
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
      {!startStatus ? (
        <Front_page handleStart={handleStart} handleToggle={handleToggle} />
      ) : (
        <form onSubmit={handleSubmit}>
        {questions}
        <div className="button-div">
          <div className="score-div">
          {submitStatus ? <h3>Your score is {score()} / 5</h3> : <></>}
          </div>
          {submitStatus ? <button className="submit-button" onClick={() => location.reload()}> Play again </button> : <button type="submit" className="submit-button"> Check answers </button>}
        </div>
      </form>
      )}
    </div>
  );
}
export default App;
