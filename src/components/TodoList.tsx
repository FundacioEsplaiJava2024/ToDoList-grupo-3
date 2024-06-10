import React from "react";

interface TodoListProps{
    tareas:string[];
}

const TodoList:React.FC<TodoListProps>=({tareas})=>{
    return (
        <ul>
            {tareas.map((tarea,index)=>(
                <li key={index}>{tarea}</li>
            ))}
        </ul>
        );
    };

export default TodoList;