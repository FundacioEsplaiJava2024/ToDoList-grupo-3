import React, {useState} from "react";
import TodoForm from "./components/TodoForm";

const App=()=> {
  const[todos, setTodos]=useState<string[]>([]);

  const handleAddTodo=(text:string)=>{
    setTodos((prevTarea)=>[...prevTarea,text]);
  };
  return (
    <div>
      <h1>Aplicacion de Tareas</h1>
      <TodoForm onAddTarea={handleAddTodo} />
      <ul>
        {todos.map((todo,index)=>(<li key={index}>{todo}</li>))}
      </ul>
    </div>
  );
};

export default App;