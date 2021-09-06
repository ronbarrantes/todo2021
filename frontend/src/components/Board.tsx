import React from 'react'
import Todo from './Todo'

const todos = ['item1', 'item 2', 'item 3']

const Board = () => (
    <ul>
        {todos.map((todo, i) => {
            const idx = i
            return <Todo key={idx} item={todo} />
        })}
    </ul>
)
export default Board