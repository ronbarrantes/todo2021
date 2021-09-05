import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

const container = document.createElement('div')
container.className = 'root'
document.body.appendChild(container)

ReactDOM.render(<App />, container)
