import React from "react";

interface TodoListProps{
    todos: {id: number; text: string}[];
}

const TodoList: React.FC<TodoListProps>=({todos})=>{
    return (
        <ul>
            {todos.map((todo)=>(<li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
        );
}
export default TodoList;

