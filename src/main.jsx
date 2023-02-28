import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import blob1 from "./assets/images/blobs.png"
import blob2 from "./assets/images/blobs_1.png"

ReactDOM.createRoot(document.getElementById('root')).render(
    <div className='main'>
        <App />
        <img src={blob1} className="blob1"/>
        <img src={blob2} className="blob2"/>
    </div>
)
