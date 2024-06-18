import React from "react";
import { Task } from "../model/task";
import { TaskListItem } from "./TaskListItem";

interface TodoListProps{
    todos: Task[];
    onDeleteTask:(task:Task) => void;
    onToggleCompleted: (task: Task) => void;
}  

const TodoList: React.FC<TodoListProps>=({todos, onDeleteTask, onToggleCompleted } : TodoListProps)=>{
    return (
        <ul>
            {todos.map((todo)=>(
                <TaskListItem 
                task={todo} 
                onDelete={onDeleteTask}
                onToggleCompleted={onToggleCompleted}
                /> 
            ))}
        </ul>
    );
}
export default TodoList;

