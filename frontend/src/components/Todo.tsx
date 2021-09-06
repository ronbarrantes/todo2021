import React from 'react'

interface ITodo{
    item: string;
}

const Todo = (props: ITodo) => (<div>{props.item}</div>)
export default Todo