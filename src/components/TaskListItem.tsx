import { FunctionComponent, useState } from "react";
import { Task } from "../model/task";
import '../components/TaskListItem.css'
import { Dropdown } from "./Dropdown";
import { Option } from "../model/option";
import { FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

interface Props {
  task: Task;
  onDelete: (task: Task) => void;
  onToggleCompleted: (task: Task) => void;
  onEditTask: (task: Task, newName: string) => void;
}

export const TaskListItem: FunctionComponent<Props> = ({ task, onDelete, onToggleCompleted, onEditTask }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);
  
  const onRemove = () => {
    onDelete(task);
  };

  const onToggle = () => {
    onToggleCompleted(task);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (newName.length < 1 || newName.length > 16) {
      alert("La tarea debe tener entre 1 y 16 caracteres");
      return;
  }
    onEditTask(task, newName);
    setEditing(false);
  };

  const dropdownOptions: Array<Option> = [
    {
      value: <GiCancel/>,
      onClick: onRemove ,
    },
    {
      value: <FaEdit/>,
      onClick: handleEdit,
    }
  ]

  return (
    <li key={task.id} className="task-list-item">
       <div className="task-done">
        <input type="checkbox" checked={task.completed} onChange={onToggle} className="checkbox"/>
        {editing ? (
          <>
          <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="input"
        />
        <button className="button" onClick={handleSave}> Aceptar</button>
        </>
        ) : (
          <h3 className="task-name"><span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.name}</span></h3>
        )}
      </div>
      <Dropdown
        options={dropdownOptions}
      />
    </li>
  );
};