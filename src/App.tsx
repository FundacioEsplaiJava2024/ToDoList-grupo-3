import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Task } from "./model/task";

const App=()=> {
  const[todos, setTodos]=useState<Task[]>([]);

  const handleAddTarea=(text:string)=>{
    const newTodo : Task = {
      id: Date.now(),
      name: text,
    };
    setTodos([...todos,newTodo]);
  };  
  
  // const handleDelete = (task: Task) => {
  //   // No fa res, de moment
  // };

  return (
    <div>
      <h1>Aplicacion de Tareas</h1>
      <TodoForm onAddTarea={handleAddTarea} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;