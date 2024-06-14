import React, {useState} from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App=()=> {
  const[todos, setTodos]=useState<{id: number; text:string}[]>([]);

  const handleAddTarea=(text:string)=>{
    const newTodo={id:Date.now(),text};
    setTodos([...todos,newTodo]);
  };
  return (
    <div>
      <h1>Aplicacion de Tareas</h1>
      <TodoForm onAddTarea={handleAddTarea} />
      <TodoList todos={todos} />
          </div>
  );
};

export default App;