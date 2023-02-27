import React from 'react'
import './App.css'


function App() {
  const [data, setData] = React.useState([])
  const [chosenOptions, setChosenOptions] = React.useState({})
  const [styleState, setStyleState] = React.useState({})
  const [submitStatus, setSubmitStatus] = React.useState(false)
  const chosenValues = Object.values(chosenOptions)
  const correctValues = []
  for (let i = 0; i < data.length; i++) {
    correctValues[i] = data[i]["correct_answer"]
  }
  const incorrectValues = []
  for (let i = 0; i < correctValues.length; i++) {
    if (correctValues[i] !== chosenValues[i]) {
      incorrectValues.push(chosenValues[i])
    }
  }
  const score = () => {
    let score = 0
    for (let i = 0; i < chosenValues.length; i++) {
      if (chosenValues[i] === correctValues[i]) {score++}
    }
    return score
  }
  const handleChange = (e) => {
    let id = e.target.name
    let value = e.target.value
    setChosenOptions((prev) => {
      return {
        ...prev,
        [id]: value
      }
    })
  }
  const optionsArray = (incorrect, correct) => {
    let newArray = [].concat(incorrect)
    newArray.push(correct)
    let sortedArray = newArray.sort(() => {
      return Math.random() - 0.5
    })
    return sortedArray
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitStatus(true)
  }
  
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple")
      .then(response => response.json())
      .then(data => {
        setData(data["results"])
        setData(prev => {
          return prev.map(obj => {
            return {
              ...obj,
              choices: optionsArray(obj["incorrect_answers"], obj["correct_answer"])
            }
          })
        })
      })
  }
  , [])

  const styles = {
    backgroundColor: "lightblue"
  }
  const styles_correct = {
    backgroundColor: "lightgreen"
  }
  const styles_incorrect = {
    backgroundColor: "red"
  }
  const questions = data.map((question, question_index) => {
    const options = question.choices
    return (
      <div>
        <h1>{question["question"]}</h1>
            <div className="options">
                    {
                      options.map((option, index) => {
                        return (
                          <div>
                          <label style={chosenValues.includes(option) ? styles : {}}>
                          <input 
                              type="radio"
                              id={index}
                              name={question_index}
                              value={option}
                              onChange={handleChange}
                              checked={chosenValues.includes(option)}
                              
                          />
                            {option}
                            </label>
                          </div>
                        )
                      })
                    }
                </div>
      </div>
    )
  })
  const questions1 = data.map((question, question_index) => {
    const options = question.choices
    return (
      <div>
        <h1>{question["question"]}</h1>
            <div className="options">
                    {
                      options.map((option, index) => {
                        return (
                          <div>
                          <label style={correctValues.includes(option) ? styles_correct : incorrectValues.includes(option) ? styles_incorrect : {}}>
                          <input 
                              type="radio"
                              id={index}
                              name={question_index}
                              value={option}
                              onChange={handleChange}
                              checked={chosenValues.includes(option)}
                              
                          />
                            {option}
                            </label>
                          </div>
                        )
                      })
                    }
                </div>
      </div>
    )
  })
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {submitStatus ? questions1 : questions}
        <button type='submit'> Submit </button>
      </form>
      {submitStatus ? <h3>Score: {score()}</h3> : <></>}
    </div>
  )
}

export default App



