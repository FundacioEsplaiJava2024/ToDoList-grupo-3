import { useEffect, useState } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript"
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Task } from "./model/task";
import './App.css'
import Header from "./components/Header";

const App=()=> {



  const [todos, setTodos]=useState<Task[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  const tokenGrupo3 : string = "4132c59154e7de32883147e312b183e6ea6b2a40";
  const api = new TodoistApi(tokenGrupo3);

  useEffect(() => {
    api.getTasks().then((tasks) => {
      const todoistTasks = tasks.map((task) => ({
        id: task.id,
        name: task.content,
        completed: task.isCompleted,
      }));
      setTodos(todoistTasks.filter((task) => !task.completed));
      setCompletedTodos(todoistTasks.filter((task) => task.completed));
      setTotalTasks(todoistTasks.length);
    }).catch(e=> console.log(e));
  }, []);


  const handleAddTarea= (text:string)=>{
      api.addTask({ content: text, projectId: "2335230345" }).then((response) => {
        const responseId = response.id;
        const newTodo : Task = {
          id: responseId,
          name: text,
          completed: false,
        };
        setTodos([...todos,newTodo]);
        setTotalTasks(totalTasks + 1);
      }).catch(e=> console.log(e));

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
    
    if (task.completed) {
      api.reopenTask(task.id)
        .then((isSuccess) => console.log(isSuccess))
        .catch((error) => console.log(error))
      setCompletedTodos(completedTodos.filter((t) => t.id!== task.id));
      setTodos([...todos, {...task, completed: false }]);
    } else {
      api.closeTask(task.id)
        .then((isSuccess) => console.log(isSuccess))
        .catch((error) => console.log(error))
      setTodos(todos.filter((t) => t.id!== task.id));
      setCompletedTodos([...completedTodos, {...task, completed: true }]);
    }
    if (!task.completed) {
      setCompletedTasks(completedTasks + 1);
    } else {
      setCompletedTasks(completedTasks - 1);
    }
  };
  
  const handleDelete = (task: Task) => {
    if (task.completed) {
      setCompletedTodos(completedTodos.filter((t) => t.id !== task.id));
      setCompletedTasks(completedTasks - 1);
    } else {
      setTodos(todos.filter((t) => t.id !== task.id));
    }
      setTotalTasks (totalTasks - 1)
      api.deleteTask(task.id)
        .then((isSuccess) => console.log(isSuccess))
        .catch((error) => console.log(error))
    };

  const handleEditTask = (task: Task, newName: string) => {
    setTodos(
      todos.map((t) => {
        if (t.id === task.id) {
          api.updateTask(task.id, { content: newName })
            .then((isSuccess) => console.log(isSuccess))
            .catch((error) => console.log(error))
          return { ...t, name: newName };
        }
        return t;
      })
    );
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
          todos={todos.filter((t) => !t.completed)}
          onDeleteTask={handleDelete}
          onToggleCompleted={handleToggleCompleted}
          onEditTask={handleEditTask}
        />
      </div>
      <div className="column right-column">
        <h2>Tareas Completadas</h2>
        <TodoList
          todos={completedTodos}
          onDeleteTask={handleDelete}
          onToggleCompleted={handleToggleCompleted}
          onEditTask={handleEditTask}
        />
      </div>
    </div>
  </div>
  );
}

export default App;