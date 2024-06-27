import React, {useState} from "react";
import "./TodoForm.css"

interface TodoForm{
    onAddTarea: (texto:string)=> void;
}

const TodoForm:React.FC<TodoForm>=({onAddTarea})=>{
    const[tarea, setTarea]=useState('');

    const handleSubmit=(evento:React.FormEvent<HTMLFormElement>)=>{
        evento.preventDefault();
        if (tarea.length < 1 || tarea.length > 16) {
            alert("La tarea debe tener entre 1 y 16 caracteres");
            return;
        }
            onAddTarea(tarea);
            setTarea('');
    };

    return(
        <form onSubmit={handleSubmit} className="add-task-form">
            <input type="text" value={tarea}
            onChange={(evento)=>setTarea(evento.target.value)} />
            <button type="submit" className="button">Agregar Tarea</button>
            </form>
    );
};
export default TodoForm;