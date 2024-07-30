
import { useEffect, useState } from "react";
import './App.css';
import Header from "./components/Header";
import TodoForm from "./components/todoComponents/TodoForm";
import TodoList from "./components/todoComponents/TodoList";
import { apiTask, Task } from "./model/task";
import { StorageService } from "./services/StorageService";

import axios from 'axios';
import { Navigate } from "react-router-dom";

const App = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  const storageService = new StorageService();

  const token = storageService.getItem("jwt");

  if(token == undefined){
    return <Navigate to="/"/>
  }

  const connectionApi = axios.create({
    baseURL: 'http://localhost:8442',
    headers: {
      'Authorization':storageService.getItem("jwt")?storageService.getItem("jwt"):"",
      'Content-Type': 'application/json',
      'Access-Control-Allow_Methods': 'GET, POST, PUT, DELETE, PATCH'
    }
  });

  useEffect(() => {
    connectionApi.get("/todolist/tasks")
      .then((response) => {
        const tasks = response.data
        const newTodos: Task[] = [];
        const newCompletedTodos: Task[] = [];

        tasks.forEach((apiTask: apiTask) => {
          const convertedTask = convertTask(apiTask);

          if (convertedTask.completed) {
            newCompletedTodos.push(convertedTask);
          } else {
            newTodos.push(convertedTask);
          }
        });
        setCompletedTodos(newCompletedTodos);
        setTodos(newTodos);
        setCompletedTasks(newCompletedTodos.length)
        setTotalTasks(tasks.length);
      })
      .catch((error) => console.log(error));
  }, []);

  const convertTask = (apiTask: apiTask) => {
    let apiState = false;
    if (apiTask.state == "COMPLETE") {
      apiState = true;
    }
    const newTask: Task = {
      id: apiTask.id,
      name: apiTask.name,
      description: apiTask.description,
      completed: apiState
    }
    return newTask;
  };

  const handleAddTarea = (text: string) => {
    connectionApi.post("/todolist/task", { "name": text }).then((response) => {
      const task = response.data;
      const responseId = task.id;
      const newTodo: Task = {
        id: responseId,
        name: text,
        description:"{Añadir description}",
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTotalTasks(totalTasks + 1);
    }).catch(e => console.log(e));

  };

  const handleToggleCompleted = (task: Task) => {
    setTodos(
      todos.map((t) => {
        if (t.id === task.id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      })
    );

    if (task.completed) { //y volvemos a apretar.
      connectionApi.patch(`/todolist/task/${task.id}`);

      setCompletedTodos(completedTodos.filter((t) => t.id !== task.id));
      setTodos([...todos, { ...task, completed: false }]);
      setCompletedTasks(completedTasks - 1);
    } else {
      connectionApi.patch(`/todolist/task/${task.id}`);

      setTodos(todos.filter((t) => t.id !== task.id));
      setCompletedTodos([...completedTodos, { ...task, completed: true }]);
      setCompletedTasks(completedTasks + 1);
    }
  };

  const handleDelete = (task: Task) => {
    if (task.completed) {
      setCompletedTodos(completedTodos.filter((t) => t.id !== task.id));
      setCompletedTasks(completedTasks - 1);
    } else {
      setTodos(todos.filter((t) => t.id !== task.id));
    }
    setTotalTasks(totalTasks - 1)
    connectionApi.delete(`/todolist/task/${task.id}`);
  };

  const handleEditTask = (task: Task, newName: string) => {
    setTodos(
      todos.map((t) => {
        if (t.id === task.id) {
          connectionApi.put(`/todolist/task/${task.id}`, { "name": newName });
          return { ...t, name: newName };
        }
        return t;
      })
    );
    if(task.completed){
      setCompletedTodos(completedTodos.map((t)=>{
        if(t.id==task.id){
          connectionApi.put(`/todolist/task/${task.id}`, { "name": newName });
          return{...t, name:newName};
        }
        return t;
      }));
    }
  };

  const handleEditDescription=(task:Task, newDescription:string)=>{
    setTodos(
      todos.map((t) =>{
        if(t.id===task.id){
          connectionApi.put(`/todolist/task/${task.id}`,{"description":newDescription});
          return{...t, description:newDescription};
        }
        return t;
      })
    );
    if(task.completed){
      setCompletedTodos(completedTodos.map((t)=>{
        if(t.id==task.id){
          connectionApi.put(`/todolist/task/${task.id}`,{"description":newDescription});
          return{...t, description:newDescription};
        }
        return t;
      })
    );
    }
  };

  return (
    <div>
      <Header
        completedTasks={completedTasks}
        totalTasks={totalTasks}
      />
      <h2>Tareas a realizar:</h2>
      <TodoForm onAddTarea={handleAddTarea} />
      <div className="columns-container">
        <div className="column left-column">
          <h2>Tareas Pendientes</h2>
          <TodoList
            todos={todos}
            onDeleteTask={handleDelete}
            onToggleCompleted={handleToggleCompleted}
            onEditTask={handleEditTask}
            onEditDescription={handleEditDescription}
          />
        </div>
        <div className="column right-column">
          <h2>Tareas Completadas</h2>
          <TodoList
            todos={completedTodos}
            onDeleteTask={handleDelete}
            onToggleCompleted={handleToggleCompleted}
            onEditTask={handleEditTask}
            onEditDescription={handleEditDescription}
          />
        </div>
      </div>
    </div>
  );
}

export default App;