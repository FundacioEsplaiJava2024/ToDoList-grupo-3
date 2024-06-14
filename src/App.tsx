import React from 'react';
import { Task } from "./model/task";
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
  const handleDelete = (task: Task) => {
    // No fa res, de moment
  };

  return (
    <ul>
      <TaskListItem task={tasks[0]} onDelete={handleDelete}/>
      <TaskListItem task={tasks[1]} onDelete={handleDelete}/>
    </ul>
  );
}

export default App
