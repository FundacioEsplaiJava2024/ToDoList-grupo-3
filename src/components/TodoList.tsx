import React from "react";
import { Task } from "../model/task";
import { TaskListItem } from "./TaskListItem";

interface TodoListProps{
    todos: Task[];
    onDeleteTask:(task:Task) => void;
    onToggleCompleted: (task: Task) => void;
    onEditTask: (task: Task, newName: string) => void;
}  

const TodoList: React.FC<TodoListProps>=({todos, onDeleteTask, onToggleCompleted
    , onEditTask 
 } : TodoListProps)=>{
    return (
        <ul>
            {todos.map((todo)=>(
                <TaskListItem 
                task={todo} 
                onDelete={onDeleteTask}
                onToggleCompleted={onToggleCompleted}
                onEditTask={onEditTask}
                /> 
            ))}
        </ul>
    );
}
export default TodoList;

