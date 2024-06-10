import { useState } from 'react'
import FormularioTareas from "./components/FormularioTareas";
import TodoList  from './components/TodoList';

const App: React.FC=()=>{
  const [tareas, setTareas] = useState<string[]>([]);

  const handleAddTarea=(tarea:string)=>{
    setTareas((prevTareas)=>[...prevTareas, tarea]);
  };

  return (
    <div>
      <FormularioTareas onAddTarea={handleAddTarea}/>
      <TodoList tareas={tareas} />
    </div>
  );
};

export default App;
