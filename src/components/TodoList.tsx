import React from "react";
import { Task } from "../model/task";
import { TaskListItem } from "./TaskListItem";

interface TodoListProps{
    todos: Task[];
}  

const TodoList: React.FC<TodoListProps>=({todos} : TodoListProps)=>{
    return (
        <ul>
            {todos.map((todo)=>(<TaskListItem task={todo} onDelete={(task)=>{console.log("delete " + task.name)}}/> 
            ))}
        </ul>
    );
}
export default TodoList;

