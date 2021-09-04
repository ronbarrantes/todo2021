// import React from 'react'
// import ReactDOM from 'react-dom'

// const container = document.createElement('div')
// container.className = 'root'
// document.body.appendChild(container)

// const App = () => (<div>Hello</div>)

// ReactDOM.render(<App />, container)

function component() {
    const element = document.createElement('div')
    element.innerHTML = 'hello world :)'
    return element
}

document.body.appendChild(component())
