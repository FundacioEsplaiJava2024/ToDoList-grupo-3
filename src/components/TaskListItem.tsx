import { FunctionComponent, useState } from "react";
import { Task } from "../model/task";

interface Props {
  task: Task;
  onDelete: (task: Task) => void;
  onToggleCompleted: (task: Task) => void;
  onEditTask: (task: Task, newName: string) => void;
}

export const TaskListItem: FunctionComponent<Props> = ({ task, onDelete, onToggleCompleted,onEditTask }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);
  
  const onClick = () => {
    onDelete(task);
  };

  const onToggle = () => {
    onToggleCompleted(task);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEditTask(task, newName);
    setEditing(false);
  };

  return (
    <li key={task.id}>
      <input type="checkbox" checked={task.completed} onChange={onToggle} />
      {editing ? (
        <>
        <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        onBlur={handleSave}
      />
      <button onClick={handleSave}> Aceptar</button>
      </>
      ) : (
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.name}</span>
      )}
      
      <button onClick={onClick}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </li>
  );
};