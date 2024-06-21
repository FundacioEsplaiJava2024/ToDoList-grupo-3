import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Task } from "./model/task";
import {v4 as uuidv4 } from 'uuid';
import './App.css'


const App=()=> {
  const[todos, setTodos]=useState<Task[]>([]);
  const[completedTodos, setCompletedTodos] = useState<Task[]>([]);

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
    
    if (task.completed) {
      setCompletedTodos(completedTodos.filter((t) => t.id!== task.id));
      setTodos([...todos, {...task, completed: false }]);
    } else {
      setTodos(todos.filter((t) => t.id!== task.id));
      setCompletedTodos([...completedTodos, {...task, completed: true }]);
    }
  };
  
   const handleDelete = (task: Task) => {
    if (task.completed) {
      setCompletedTodos(completedTodos.filter((t) => t.id !== task.id));
    } else {
      setTodos(todos.filter((t) => t.id !== task.id));
    }
    
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
    <div>
      <h1>Aplicacion de Tareas</h1>
      <TodoForm onAddTarea={handleAddTarea} />
      <div className="columns-container">
      <div className="column left-column">
        <h2>Tareas Pendientes</h2>
        <TodoList
          todos={todos.filter((t) => !t.completed)}
          onDeleteTask={handleDelete}
          onToggleCompleted={handleToggleCompleted}
          onEditTask={handleEditTask}
        />
      </div>
      <div className="column right-column">
        <h2>Tareas Completadas</h2>
        <TodoList
          todos={completedTodos}
          onDeleteTask={handleDelete}
          onToggleCompleted={handleToggleCompleted}
          onEditTask={handleEditTask}
        />
      </div>
    </div>
  </div>
  );
}

export default App;