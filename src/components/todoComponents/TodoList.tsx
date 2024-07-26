import React from "react";
import { Task } from "../../model/task";
import { TaskListItem } from "./TaskListItem";
import './TodoList.css'

interface TodoListProps{
    todos: Task[];
    onDeleteTask:(task:Task) => void;
    onToggleCompleted: (task: Task) => void;
    onEditTask: (task: Task, newName: string) => void;
    onEditDescription:(task:Task, newDescription:string)=>void;
}  

const TodoList: React.FC<TodoListProps>=({
    todos, onDeleteTask, onToggleCompleted, onEditTask, onEditDescription } : TodoListProps)=>{
    return (
        <ul className="task-list">
            {todos.map((todo)=>(
                <TaskListItem 
                task={todo} 
                onDelete={onDeleteTask}
                onToggleCompleted={onToggleCompleted}
                onEditTask={onEditTask}
                onEditDescription={onEditDescription}
                /> 
            ))}
        </ul>
    );
}
export default TodoList;

