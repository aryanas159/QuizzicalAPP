import React from "react";
export default function Question({
    question,
    options_array,
    correct_options_array,
    question_index,
    submitStatus,
    chosenOptions,
    handleChange,
}) {
    const styles = {
        backgroundColor: "#D6DBF5",
        borderColor: "#D6DBF5",
    };
    const styles_correct = {
        backgroundColor: "#94D7A2",
        borderColor: "#94D7A2"
    };
    const styles_incorrect = {
        backgroundColor: "#F8BCBC",
        borderColor: "#F8BCBC"
    };

    return (
        <div className="question-div">
        <h2>{question}</h2>
        <div className="options">
            {options_array.map((option, index) => {
            return (
                <div>
                <label
                    style={
                    submitStatus
                        ? option === correct_options_array[question_index]
                        ? styles_correct
                        : chosenOptions[question_index] === option
                        ? styles_incorrect
                        : {}
                        : chosenOptions[question_index] === option
                        ? styles
                        : {}
                    }
                >
                    <input
                    type="radio"
                    id={index}
                    name={question_index}
                    value={option}
                    onChange={handleChange}
                    checked={chosenOptions[question_index] === option}
                    />
                    {option}
                </label>
                </div>
            );
            })}
        </div>
        <div className="line-div"></div>
        </div>
    );
}
