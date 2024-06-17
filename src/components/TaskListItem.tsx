import { FunctionComponent } from "react";
import { Task } from "../model/task";

interface Props {
  task: Task;
  onDelete: (task: Task) => void;
  onToggleCompleted: (task: Task) => void;
}

export const TaskListItem: FunctionComponent<Props> = ({ task, onDelete, onToggleCompleted }: Props) => {
  const onClick = () => {
    onDelete(task);
  };

  const onToggle = () => {
    onToggleCompleted(task);
  };

  return (
    <li key={task.id}>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.name}</span>
      <input type="checkbox" checked={task.completed} onChange={onToggle} />
      <button onClick={onClick}>Delete</button>
    </li>
  );
};