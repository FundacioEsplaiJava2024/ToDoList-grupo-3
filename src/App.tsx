import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Task } from "./model/task";
import {v4 as uuidv4 } from 'uuid';

const App=()=> {
  const[todos, setTodos]=useState<Task[]>([]);

  const handleAddTarea=(text:string)=>{
    const newTodo : Task = {
      id: uuidv4(),
      name: text,
      completed: false,
    };
    setTodos([...todos,newTodo]);
  };  

  const handleToggleCompleted = (task: Task) => {
    setTodos(
      todos.map((t) => {
        if (t.id === task.id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      })
    );
  };
  
   const handleDelete = (task: Task) => {
    setTodos(todos.filter((t)=>t.id != task.id))
   };

   const handleEditTask = (task: Task, newName: string) => {
    setTodos(
      todos.map((t) => {
        if (t.id === task.id) {
          return { ...t, name: newName };
        }
        return t;
      })
    );
  };

  return (
    <div className="container">
      <h1>Aplicacion de Tareas</h1>
      <TodoForm onAddTarea={handleAddTarea} />
      <TodoList todos={todos} 
        onDeleteTask= {handleDelete} 
        onToggleCompleted={handleToggleCompleted}
        onEditTask={handleEditTask}/>
    </div>
  );
}

export default App;