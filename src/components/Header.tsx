import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Header.css';


interface HeaderProps {
  completedTasks: number;
  totalTasks: number;
}

const Header: React.FC<HeaderProps> = ({ completedTasks, totalTasks }) => {
  return (
    <div className="header">
      <div className="nav-bar">
        <Link className="exit" to={'/sign-in'}>
          Exit
        </Link>
      </div>
      <h1>TodoList</h1>
      <div className="task-progress">
        <span className="progress-text">
        </span>
        <div className="progress-circle">
          {completedTasks}/{totalTasks}
        </div>
      </div>
    </div>
  );
};

export default Header;