import React from "react";
import { Task } from "../model/task";
import { TaskListItem } from "./TaskListItem";

interface TodoListProps{
    todos: Task[];
    onToggleCompleted: (task: Task) => void;
}  

const TodoList: React.FC<TodoListProps>=({todos, onToggleCompleted } : TodoListProps)=>{
    return (
        <ul>
            {todos.map((todo)=>(
                <TaskListItem 
                task={todo} 
                onDelete={(task)=>{console.log("delete " + task.name)}}
                onToggleCompleted={onToggleCompleted}
                /> 
            ))}
        </ul>
    );
}
export default TodoList;

