import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Front_page (props) {
    const handleChange = (e) => {
        console.log(e.target.value)
        console.log("yes")
    }
    return (
        <div className="main">
            <h2> Quizzical </h2>
            <DropdownButton id="dropdown-basic-button" title="Dropdown button"onChange={handleChange}>
            <Dropdown.Item value="option1">Action</Dropdown.Item>
            <Dropdown.Item value="option2">Another action</Dropdown.Item>
            <Dropdown.Item value="option3">Something else</Dropdown.Item>
            </DropdownButton>
            <button> Start Quiz </button>
        </div>
    )
}