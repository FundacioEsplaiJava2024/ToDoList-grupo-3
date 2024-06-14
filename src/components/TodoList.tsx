import React from "react";
import { Task } from "../model/task";

interface TodoListProps{
    todos: Task[];
}

const TodoList: React.FC<TodoListProps>=({todos} : TodoListProps)=>{
    return (
        <ul>
            {todos.map((todo)=>(<li key={todo.id}>{todo.name}</li>
            ))}
        </ul>
    );
}
export default TodoList;

