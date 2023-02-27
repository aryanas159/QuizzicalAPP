import React from "react"
export default function Question(props) {
    const [option, setOption] = React.useState("")
    const handleChange = (event) => {
        setOption(event.target.value)
    }
    const onSubmit = () => {
        alert("You have chosen ", option)
    }
    return (
        <div className="question">
            <form onSubmit={onSubmit}>
                <h1>{props.question}</h1>
                <div className="options">
                    <input 
                        type="radio"
                        id="option1"
                        name={props.options[0]}
                        value={props.options[0]}
                    
                    />
                    <label htmlFor="option1">{props.options[0]}</label>
                    <input 
                        type="radio"
                        id="option2"
                        name={props.options[1]}
                        value={props.options[1]}
                    
                    />
                    <label htmlFor="option2">{props.options[1]}</label>
                    <input 
                        type="radio"
                        id="option3"
                        name={props.options[2]}
                        value={props.options[2]}
                    
                    />
                    <label htmlFor="option3">{props.options[2]}</label>
                    <input 
                        type="radio"
                        id="option4"
                        name={props.options[3]}
                        value={props.options[3]}
                    
                    />
                    <label htmlFor="option4">{props.options[3]}</label>
                </div>
            </form>
            </div>
    )
}