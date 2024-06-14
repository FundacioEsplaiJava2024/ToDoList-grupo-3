import React from 'react';
import { Task } from "./model/task";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TaskListItem } from './components/TaskListItem';

const tasks: Task[] = [
  {
    id: 1,
    name: 'passejar el gos',
  },
  {
    id: 2,
    name: 'natejar la casa',
  },
];

function App() {
    const[todos, setTodos]=useState<{id: number; text:string}[]>([]);

    const handleAddTarea=(text:string)=>{
      const newTodo={id:Date.now(),text};
      setTodos([...todos,newTodo]);
    };
      const handleDelete = (task: Task) => {
      // No fa res, de moment
    };
  return (
    <div>
      <h1>Aplicacion de Tareas</h1>
      <TodoForm onAddTarea={handleAddTarea} />
      <TodoList todos={todos} />
      
      <ul>
      <TaskListItem task={tasks[0]} onDelete={handleDelete}/>
      <TaskListItem task={tasks[1]} onDelete={handleDelete}/>
    </ul>
          </div>
    
  );
}
  export default App;