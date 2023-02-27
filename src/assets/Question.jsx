import React from "react";
export default function Question({
    question,
    options_array,
    correct_options_array,
    question_index,
    submitStatus,
    chosenValues,
    handleChange,
}) {
    const styles = {
        backgroundColor: "lightblue",
    };
    const styles_correct = {
        backgroundColor: "lightgreen",
    };
    const styles_incorrect = {
        backgroundColor: "red",
    };

    return (
        <div>
        <h1>{question}</h1>
        <div className="options">
            {options_array.map((option, index) => {
            return (
                <div>
                <label
                    style={
                    submitStatus
                        ? option === correct_options_array[question_index]
                        ? styles_correct
                        : chosenValues[question_index] === option
                        ? styles_incorrect
                        : {}
                        : chosenValues[question_index] === option
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
                    checked={chosenValues[question_index] === option}
                    />
                    {option}
                </label>
                </div>
            );
            })}
        </div>
        </div>
    );
}
