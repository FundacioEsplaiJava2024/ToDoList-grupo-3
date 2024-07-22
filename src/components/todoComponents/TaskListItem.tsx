import { FunctionComponent, useState } from "react";
import { Task } from "../../model/task";
import { Dropdown } from "../utils/Dropdown";
import { Option } from "../../model/option";
import { FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import './TaskListItem.css'


interface Props {
  task: Task;
  onDelete: (task: Task) => void;
  onToggleCompleted: (task: Task) => void;
  onEditTask: (task: Task, newName: string) => void;
  onEditDescription:(task:Task, newDescription:string)=>void;
}

export const TaskListItem: FunctionComponent<Props> = ({ task, onDelete, onToggleCompleted, onEditTask, onEditDescription }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const [newDescription, setNewDescription]=useState(task.description);
  
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
    if(newDescription.length<1||newDescription.length>100){
      alert("La descripción debe tener entre 1 y 100 caracteres");
    }
    task.name=newName;
    task.description=newDescription;
    onEditTask(task, newName);
    onEditDescription(task, newDescription);
    setEditing(false);

  }

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
        <textarea 
        value={newDescription}
        onChange={(e)=> setNewDescription(e.target.value)}
        />

        <button className="button" onClick={handleSave}> Aceptar</button>
        </>
        ) : (
          <div>
          <h3 className="task-name"><span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.name}</span></h3>
          <p className="task-description">{task.description}</p>
          </div>
        )}
      </div>
      <Dropdown
        options={dropdownOptions}
      />
    </li>
  );
};